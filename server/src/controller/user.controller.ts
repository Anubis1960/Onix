import {UserService} from "../service/user.service";
import {Request, Response} from "express";
import logger from "../config/logger.config";
import {FolderService} from "../service/folder.service";

/**
 * UserController handles user-related requests.
 * @class UserController
 * @param {UserService} userService - Instance of UserService for user-related operations.
 * @constructor
 * @method getAllUsers - Retrieves all users.
 * @method getUserById - Retrieves a user by their ID.
 * @method createUser - Creates a new user instance.
 * @method updateUser - Updates an existing user.
 * @method deleteUser - Deletes a user.
 */
export class UserController {
    private userService: UserService;
    private folderService: FolderService;

    constructor() {
        this.userService = new UserService();
        this.folderService = new FolderService();
    }

    async getAllUsers(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        res.status(200).json(users);
    };

    async getUserById(req: Request, res: Response) {
        const userId = req.params.id;
        const user = await this.userService.getUserById(userId);
        if (user === null) {
            res.status(404).json({message: "User not found"});
            return;
        }
        res.status(200).json(user);
    }

    async createUser(req: Request, res: Response) {
        const userData = req.body;
        logger.info(userData);
        if (!userData.email || !userData.password) {
            res.status(400).json({message: "Email and password are required"});
            return;
        }
        const newUser = await this.userService.createUser(userData);
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

    async updateUser(req: Request, res: Response) {
        const userId = req.params.id;
        const updatedData = req.body;
        if (!updatedData.email && !updatedData.password) {
            res.status(400).json({message: "Email or password is required"});
            return;
        }
        const updatedUser = await this.userService.updateUser(userId, updatedData);
        if ("status" in updatedUser) {
            res.status(updatedUser.status).json({message: updatedUser.message});
            return;
        }
        res.status(200).json(updatedUser);
    }

    async deleteUser(req: Request, res: Response) {
        const userId = req.params.id;
        if (!userId) {
            res.status(400).json({message: "User ID is required"});
            return;
        }
        const deletedUser = await this.userService.deleteUser(userId);
        if ("status" in deletedUser) {
            res.status(deletedUser.status).json({message: deletedUser.message});
            return;
        }
        // TODO: Delete all folders and files associated with the user
        res.status(200).json(deletedUser);
    }
}