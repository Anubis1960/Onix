import {Request, Response} from 'express';
import logger from '../config/logger.config';
import {UserService} from '../service/user.service';

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

    constructor() {
        this.userService = new UserService();
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
        res.status(200).json(user);
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
            done(null, newUser);
        } else {
            done(null, user);
        }
    }
}