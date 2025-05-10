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
exports.UserService = void 0;
const user_repository_1 = require("../repository/user.repository");
const logger_config_1 = __importDefault(require("../config/logger.config"));
const user_dto_1 = require("../dto/user.dto");
const crypt_utils_1 = require("../utils/crypt.utils");
/**
 * @class UserService
 * @description UserService handles user-related operations such as fetching, creating, updating, and deleting users.
 * @constructor
 * @method getAllUsers - Retrieves all users.
 * @method getUserById - Retrieves a user by their ID.
 * @method createUser - Creates a new user.
 * @method updateUser - Updates an existing user.
 * @method deleteUser - Deletes a user.
 * @method findByEmail - Finds a user by their email.
 * @method findByEmailAndPassword - Finds a user by their email and password.
 */
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield user_repository_1.UserRepository.findAll();
            if (!users) {
                logger_config_1.default.info("No users found");
                return [];
            }
            return users.map(user => {
                return new user_dto_1.UserDto(user.id);
            });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.UserRepository.findById(id);
            if (!user) {
                logger_config_1.default.info("User not found for ID:", id);
                return null;
            }
            logger_config_1.default.info(user.toString());
            return new user_dto_1.UserDto(user.id);
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userData;
            const existingUser = yield user_repository_1.UserRepository.findByEmail(email);
            if (existingUser) {
                return { status: 409, message: "User already exists" };
            }
            let hash = (0, crypt_utils_1.hashPassword)(password);
            const newUser = yield user_repository_1.UserRepository.createUser(email, hash);
            return new user_dto_1.UserDto(newUser.id);
        });
    }
    updateUser(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.UserRepository.findById(id);
            if (!user) {
                return { status: 404, message: "User not found" };
            }
            let partialUser = {
                email: updatedData.email,
                password: updatedData.password ? (0, crypt_utils_1.hashPassword)(updatedData.password) : undefined
            };
            yield user_repository_1.UserRepository.updateUser(id, partialUser);
            return new user_dto_1.UserDto(user.id);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.UserRepository.findById(id);
            if (!user) {
                return { status: 404, message: "User not found" };
            }
            yield user_repository_1.UserRepository.deleteUser(id);
            return new user_dto_1.UserDto(user.id);
        });
    }
    findByEmail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.UserRepository.findByEmail(id);
            if (!user) {
                return null;
            }
            return new user_dto_1.UserDto(user.id);
        });
    }
    findByEmailAndPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.UserRepository.findByEmail(email);
            if (!user) {
                return null;
            }
            if (!(0, crypt_utils_1.comparePassword)(password, user.password)) {
                return null;
            }
            return new user_dto_1.UserDto(user.id);
        });
    }
}
exports.UserService = UserService;
