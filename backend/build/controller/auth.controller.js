"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_service_1 = require("../service/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const folder_service_1 = require("../service/folder.service");
/**
 * AuthController handles authentication-related requests.
 * @class AuthController
 * @constructor
 * @param {UserService} userService - Instance of UserService for user-related operations.
 * @method login - Handles user login.
 * @method register - Handles user registration.
 * @method googleCallback - Handles Google OAuth callback.
 */
class AuthController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.folderService = new folder_service_1.FolderService();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: "Email and password are required" });
            }
            const user = yield this.userService.findByEmailAndPassword(email, password);
            if (!user) {
                res.status(401).json({ message: "Invalid credentials" });
            }
            const accessToken = (0, jwt_utils_1.generateAccessToken)();
            const refreshToken = (0, jwt_utils_1.generateRefreshToken)();
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            });
            res.status(200).json({
                accessToken,
                user: user,
            });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: "Email and password are required" });
            }
            const existingUser = yield this.userService.findByEmail(email);
            if (existingUser) {
                res.status(409).json({ message: "User already exists" });
            }
            const newUser = yield this.userService.createUser({
                email,
                password
            });
            if ("status" in newUser) {
                res.status(newUser.status).json({ message: newUser.message });
                return;
            }
            const folder = yield this.folderService.createFolder({
                name: "/",
                parentId: undefined,
                userId: newUser.id
            });
            if ("status" in folder) {
                res.status(folder.status).json({ message: folder.message });
                return;
            }
            res.status(201).json(newUser);
        });
    }
    googleCallback(accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByEmail(profile.emails[0].value);
            if (!user) {
                const newUser = yield this.userService.createUser({
                    email: profile.emails[0].value,
                    password: null
                });
                if ("status" in newUser) {
                    done(newUser.status, null);
                    return;
                }
                const folder = yield this.folderService.createFolder({
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
            }
            else {
                done(null, {
                    id: user.id,
                    googleId: profile.id,
                }, {
                    message: "User logged in successfully",
                    accessToken,
                    refreshToken,
                });
            }
        });
    }
}
exports.AuthController = AuthController;
