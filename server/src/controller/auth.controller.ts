import {Request, Response} from 'express';
import logger from '../config/logger.config';
import {UserService} from '../service/user.service';
import {generateAccessToken, generateRefreshToken} from "../utils/jwt.utils";
import {FolderService} from "../service/folder.service";

/**
 * AuthController handles authentication-related requests.
 * @class AuthController
 * @constructor
 * @param {UserService} userService - Instance of UserService for user-related operations.
 * @method login - Handles user login.
 * @method register - Handles user registration.
 * @method googleCallback - Handles Google OAuth callback.
 */
export class AuthController {
    private userService: UserService;
    private folderService: FolderService;

    constructor() {
        this.userService = new UserService();
        this.folderService = new FolderService();
    }

    async login(req: Request, res: Response) {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({message: "Email and password are required"});
        }
        const user = await this.userService.findByEmailAndPassword(email, password);

        if (!user) {
            res.status(401).json({message: "Invalid credentials"});
        }
        const accessToken = generateAccessToken();
        const refreshToken = generateRefreshToken();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            accessToken,
            user: user,
        });
    }

    async register(req: Request, res: Response) {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({message: "Email and password are required"});
        }
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            res.status(409).json({message: "User already exists"});
        }
        const newUser = await this.userService.createUser({
            email,
            password
        });
        if ("status" in newUser) {
            res.status(newUser.status).json({message: newUser.message});
            return;
        }
        const folder = await this.folderService.createFolder({
            name: "/",
            parentId: undefined,
            userId: newUser.id
        });
        if ("status" in folder) {
            res.status(folder.status).json({message: folder.message});
            return;
        }
        res.status(201).json(newUser);
    }

    async googleCallback(accessToken: string, refreshToken: string, profile: any, done: Function) {
        const user = await this.userService.findByEmail(profile.emails[0].value);
        if (!user) {
            const newUser = await this.userService.createUser({
                email: profile.emails[0].value,
                password: null
            });
            if ("status" in newUser) {
                done(newUser.status, null);
                return;
            }
            const folder = await this.folderService.createFolder({
                name: "/",
                parentId: undefined,
                userId: newUser.id
            });
            if ("status" in folder) {
                done(folder.status, null);
                return;
            }
            done(null, {
                id: newUser.id,
                googleId: profile.id,
            }, {
                message: "User created successfully",
                accessToken,
                refreshToken,
            });
        } else {
            done(null, {
                id: user.id,
                googleId: profile.id,
            }, {
                message: "User logged in successfully",
                accessToken,
                refreshToken,
            });
        }
    }
}