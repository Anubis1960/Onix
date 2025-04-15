import {UserService} from "../service/user.service";
import {Request, Response} from "express";
import logger from "../config/logger.config";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAllUsers(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        res.status(200).json(users);
    };

    async getUserById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const user = await this.userService.getUserById(userId);
        if ("status" in user) {
            res.status(user.status).json({message: user.message});
            return;
        }
        res.status(200).json(user);
    }

    async createUser(req: Request, res: Response) {
        const userData = req.body;
        if (!userData.email || !userData.password) {
            res.status(400).json({message: "Email and password are required"});
            return;
        }
        const newUser = await this.userService.createUser(userData);
        if ("status" in newUser) {
            res.status(newUser.status).json({message: newUser.message});
            return;
        }
        res.status(201).json(newUser);
    }

    async updateUser(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const updatedData = req.body;
        if (!updatedData.email && !updatedData.password) {
            res.status(400).json({message: "Email or password is required"});
            return;
        }
        const updateFields: { email?: string; password?: string } = {};
        if (updatedData.email) {
            updateFields.email = updatedData.email;
        }
        if (updatedData.password) {
            updateFields.password = updatedData.password;
        }
        const updatedUser = await this.userService.updateUser(userId, updateFields);
        if ("status" in updatedUser) {
            res.status(updatedUser.status).json({message: updatedUser.message});
            return;
        }
        res.status(200).json(updatedUser);
    }

    async deleteUser(req: Request, res: Response) {
        const userId = Number(req.params.id);
        if (!userId) {
            res.status(400).json({message: "User ID is required"});
            return;
        }
        const deletedUser = await this.userService.deleteUser(userId);
        if ("status" in deletedUser) {
            res.status(deletedUser.status).json({message: deletedUser.message});
            return;
        }
        res.status(200).json(deletedUser);
    }
}