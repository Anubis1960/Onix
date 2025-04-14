import {UserService} from "../service/user.service";
import {Request, Response} from "express";
import logger from "../config/logger";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            logger.error(error);
            res.status(500).json({message: "Error fetching users"});
        }
    };

    async getUserById(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({message: "User not found"});
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            logger.error(error);
            res.status(500).json({message: "Error fetching user"});
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const userData = req.body;
            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            logger.error(error);
            res.status(500).json({message: "Error creating user"});
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const updatedData = req.body;
            const updatedUser = await this.userService.updateUser(userId, updatedData);
            if (!updatedUser) {
                res.status(404).json({message: "User not found"});
                return;
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            logger.error(error);
            res.status(500).json({message: "Error updating user"});
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const deletedUser = await this.userService.deleteUser(userId);
            if (!deletedUser) {
                res.status(404).json({message: "User not found"});
                return;
            }
            res.status(200).json({message: "User deleted successfully"});
        } catch (error) {
            logger.error(error);
            res.status(500).json({message: "Error deleting user"});
        }
    }
}