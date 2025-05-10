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
exports.PasswordManagerController = void 0;
const password_manager_service_1 = require("../service/password-manager.service");
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
class PasswordManagerController {
    constructor() {
        this.passwordManagerService = new password_manager_service_1.PasswordManagerService();
    }
    getAllPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwords = yield this.passwordManagerService.getAllPasswords();
            res.status(200).json(passwords);
        });
    }
    getPasswordById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordId = req.params.id;
            const password = yield this.passwordManagerService.getPasswordById(passwordId);
            if (password === null) {
                res.status(404).json({ message: "Password not found" });
                return;
            }
            res.status(200).json(password);
        });
    }
    createPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordData = req.body;
            if (!passwordData.domain || !passwordData.username || !passwordData.password) {
                res.status(400).json({ message: "Name and password are required" });
                return;
            }
            if (!passwordData.userId) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }
            const newPassword = yield this.passwordManagerService.createPassword(passwordData);
            if ("status" in newPassword) {
                res.status(newPassword.status).json({ message: newPassword.message });
                return;
            }
            res.status(201).json(newPassword);
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordId = req.params.id;
            const updatedData = req.body;
            if (!updatedData.domain && !updatedData.password && !updatedData.username) {
                res.status(400).json({ message: "Name or password is required" });
                return;
            }
            const updatedPassword = yield this.passwordManagerService.updatePassword(passwordId, updatedData);
            if ("status" in updatedPassword) {
                res.status(updatedPassword.status).json({ message: updatedPassword.message });
                return;
            }
            res.status(200).json(updatedPassword);
        });
    }
    deletePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordId = req.params.id;
            const deletedPassword = yield this.passwordManagerService.deletePassword(passwordId);
            if ("status" in deletedPassword) {
                res.status(deletedPassword.status).json({ message: deletedPassword.message });
                return;
            }
            res.status(200).json(deletedPassword);
        });
    }
    getPasswordsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const passwords = yield this.passwordManagerService.getPasswordsByUserId(userId);
            res.status(200).json(passwords);
        });
    }
}
exports.PasswordManagerController = PasswordManagerController;
