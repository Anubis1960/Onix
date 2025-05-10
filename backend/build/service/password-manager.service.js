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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordManagerService = void 0;
const logger_config_1 = __importDefault(require("../config/logger.config"));
const password_manager_repository_1 = require("../repository/password-manager.repository");
const password_manager_dto_1 = require("../dto/password-manager.dto");
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
class PasswordManagerService {
    getAllPasswords() {
        return __awaiter(this, void 0, void 0, function* () {
            let passwords = yield password_manager_repository_1.PasswordManagerRepository.findAll();
            if (!passwords) {
                logger_config_1.default.info("No passwords found");
                return [];
            }
            return passwords.map(password => {
                return new password_manager_dto_1.PasswordManagerDto(password.domain, password.username, password.password);
            });
        });
    }
    getPasswordById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield password_manager_repository_1.PasswordManagerRepository.findById(id);
            if (!password) {
                logger_config_1.default.info("Password not found for ID:", id);
                return null;
            }
            return new password_manager_dto_1.PasswordManagerDto(password.domain, password.username, password.password);
        });
    }
    createPassword(passwordData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { domain, username, password, userId } = passwordData;
            const newPassword = yield password_manager_repository_1.PasswordManagerRepository.createPasswordManager(domain, username, password, userId);
            if (!newPassword) {
                return { status: 409, message: "Password already exists" };
            }
            return new password_manager_dto_1.PasswordManagerDto(newPassword.domain, newPassword.username, newPassword.password);
        });
    }
    updatePassword(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield password_manager_repository_1.PasswordManagerRepository.findById(id);
            if (!password) {
                return { status: 404, message: "Password not found" };
            }
            let partialPassword = {
                domain: updatedData.domain,
                username: updatedData.username,
                password: updatedData.password
            };
            yield password_manager_repository_1.PasswordManagerRepository.updatePasswordManager(id, partialPassword);
            return new password_manager_dto_1.PasswordManagerDto(partialPassword.domain || password.domain, partialPassword.username || password.username, partialPassword.password || password.password);
        });
    }
    deletePassword(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield password_manager_repository_1.PasswordManagerRepository.findById(id);
            if (!password) {
                return { status: 404, message: "Password not found" };
            }
            const deletedPassword = yield password_manager_repository_1.PasswordManagerRepository.deletePasswordManager(id);
            logger_config_1.default.info("Password deleted:", deletedPassword);
            if (!deletedPassword) {
                return { status: 500, message: "Failed to delete password" };
            }
            return deletedPassword;
        });
    }
    getPasswordsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwords = yield password_manager_repository_1.PasswordManagerRepository.findByUserId(userId);
            if (!passwords) {
                logger_config_1.default.info("No passwords found for user ID:", userId);
                return [];
            }
            return passwords.map(password => {
                return new password_manager_dto_1.PasswordManagerDto(password.domain, password.username, password.password);
            });
        });
    }
}
exports.PasswordManagerService = PasswordManagerService;
