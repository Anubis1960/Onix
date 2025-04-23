import {PasswordManagerService} from "../service/password-manager.route";
import logger from "../config/logger.config";
import {Request, Response} from "express";

export class PasswordManagerController {
    private passwordManagerService: PasswordManagerService

    constructor() {
        this.passwordManagerService = new PasswordManagerService();
    }

    async getAllPassword(req: Request, res: Response) {
        const passwords = await this.passwordManagerService.getAllPasswords();
        res.status(200).json(passwords);
    };

    async getPasswordById(req: Request, res: Response) {
        const passwordId = req.params.id;
        const password = await this.passwordManagerService.getPasswordById(passwordId);
        if ("status" in password) {
            res.status(password.status).json({message: password.message});
            return;
        }
        res.status(200).json(password);
    }

    async createPassword(req: Request, res: Response) {
        const passwordData = req.body;
        if (!passwordData.title || !passwordData.password) {
            res.status(400).json({message: "Name and password are required"});
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
        if (!updatedData.name && !updatedData.password) {
            res.status(400).json({message: "Name or password is required"});
            return;
        }
        const updateFields: { name?: string; password?: string } = {};
        if (updatedData.name) {
            updateFields.name = updatedData.name;
        }
        if (updatedData.password) {
            updateFields.password = updatedData.password;
        }
        const updatedPassword = await this.passwordManagerService.updatePassword(passwordId, updateFields);
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

    async getPasswordByUserId(req: Request, res: Response) {
        const userId = req.params.userId;
        const passwords = await this.passwordManagerService.getPasswordByUserId(userId);
        if ("status" in passwords) {
            res.status(passwords.status).json({message: passwords.message});
            return;
        }
        res.status(200).json(passwords);
    }
}