import logger from "../config/logger.config";
import {PasswordManagerRepository} from "../repository/password-manager.repository";
import {PasswordManagerDto} from "../dto/password-manager.dto";

/**
 * PasswordManagerService handles password management-related operations.
 * @class PasswordManagerService
 * @method getAllPasswords - Retrieves all passwords.
 * @method getPasswordById - Retrieves a password by its ID.
 * @method createPassword - Creates a new password instance.
 * @method updatePassword - Updates an existing password.
 * @method deletePassword - Deletes a password.
 * @method getPasswordsByUserId - Retrieves passwords by user ID.
 */
export class PasswordManagerService {
    async getAllPasswords() {
        let passwords = await PasswordManagerRepository.findAll();
        if (!passwords) {
            logger.info("No passwords found");
            return [];
        }

        return passwords.map(password => {
            return new PasswordManagerDto(password.name, password.password);
        });
    }

    async getPasswordById(id: string) {
        const password = await PasswordManagerRepository.findById(id);
        if (!password) {
            logger.info("Password not found for ID:", id)
            return null
        }
        return new PasswordManagerDto(password.name, password.password);
    }

    async createPassword(passwordData: any) {
        const {name, password, userId} = passwordData;
        const existingPassword = await PasswordManagerRepository.findByUserId(userId);
        if (existingPassword) {
            return {status: 409, message: "Password already exists"};
        }
        const newPassword = await PasswordManagerRepository.createPasswordManager(name, password, userId);
        return new PasswordManagerDto(newPassword.name, newPassword.password);
    }

    async updatePassword(id: string, updatedData: { name?: string; password?: string }) {
        const password = await PasswordManagerRepository.findById(id);
        if (!password) {
            return {status: 404, message: "Password not found"};
        }
        let partialPassword: Partial<PasswordManagerDto> = {
            name: updatedData.name,
            password: updatedData.password
        };
        await PasswordManagerRepository.updatePasswordManager(id, partialPassword);
        return new PasswordManagerDto(
            partialPassword.name || password.name,
            partialPassword.password || password.password
        );
    }

    async deletePassword(id: string) {
        const deletedPassword = await PasswordManagerRepository.deletePasswordManager(id);
        logger.info("Password deleted:", deletedPassword);
        if (!deletedPassword) {
            return {status: 500, message: "Failed to delete password"};
        }
        return deletedPassword;
    }

    async getPasswordsByUserId(userId: string) {
        const passwords = await PasswordManagerRepository.findByUserId(userId);
        if (!passwords) {
            logger.info("No passwords found for user ID:", userId)
            return []
        }
        return passwords.map(password => {
            return new PasswordManagerDto(password.name, password.password);
        });
    }
}