import {PasswordManagerService} from "../service/password-manager.service";
import logger from "../config/logger.config";
import {Request, Response} from "express";

/**
 * PasswordManagerController handles password management-related requests.
 * @class PasswordManagerController
 * @param {PasswordManagerService} passwordManagerService - Instance of PasswordManagerService for password management operations.
 * @constructor
 * @method getAllPassword - Retrieves all passwords.
 * @method getPasswordById - Retrieves a password by its ID.
 * @method createPassword - Creates a new password instance.
 * @method updatePassword - Updates an existing password.
 * @method deletePassword - Deletes a password.
 * @method getPasswordsByUserId - Retrieves passwords by user ID.
 */
export class PasswordManagerController {
    private passwordManagerService: PasswordManagerService

    constructor() {
        this.passwordManagerService = new PasswordManagerService();
    }

    async getAllPassword(req: Request, res: Response) {
        const passwords = await this.passwordManagerService.getAllPasswords();
        res.status(200).json(passwords);
    }

    async getPasswordById(req: Request, res: Response) {
        const passwordId = req.params.id;
        const password = await this.passwordManagerService.getPasswordById(passwordId);
        if (password === null) {
            res.status(404).json({message: "Password not found"});
            return;
        }
        res.status(200).json(password);
    }

    async createPassword(req: Request, res: Response) {
        const passwordData = req.body;
        if (!passwordData.domain || !passwordData.username || !passwordData.password) {
            res.status(400).json({message: "Name and password are required"});
            return;
        }
        if (!passwordData.userId) {
            res.status(400).json({message: "User ID is required"});
            return;
        }
        const newPassword = await this.passwordManagerService.createPassword(passwordData);
        if ("status" in newPassword) {
            res.status(newPassword.status).json({message: newPassword.message});
            return;
        }
        res.status(201).json(newPassword);
    }

    async updatePassword(req: Request, res: Response) {
        const passwordId = req.params.id;
        const updatedData = req.body;
        if (!updatedData.domain && !updatedData.password && !updatedData.username) {
            res.status(400).json({message: "Name or password is required"});
            return;
        }
        const updatedPassword = await this.passwordManagerService.updatePassword(passwordId, updatedData);
        if ("status" in updatedPassword) {
            res.status(updatedPassword.status).json({message: updatedPassword.message});
            return;
        }
        res.status(200).json(updatedPassword);
    }

    async deletePassword(req: Request, res: Response) {
        const passwordId = req.params.id;
        const deletedPassword = await this.passwordManagerService.deletePassword(passwordId);
        if ("status" in deletedPassword) {
            res.status(deletedPassword.status).json({message: deletedPassword.message});
            return;
        }
        res.status(200).json(deletedPassword);
    }

    async getPasswordsByUserId(req: Request, res: Response) {
        const userId = req.params.userId;
        const passwords = await this.passwordManagerService.getPasswordsByUserId(userId);
        res.status(200).json(passwords);
    }
}