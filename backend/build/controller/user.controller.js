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
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
const logger_config_1 = __importDefault(require("../config/logger.config"));
const folder_service_1 = require("../service/folder.service");
const file_service_1 = require("../service/file.service");
const supabase_service_1 = require("../service/supabase.service");
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
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.folderService = new folder_service_1.FolderService();
        this.fileService = new file_service_1.FileService();
        this.supabaseStorage = new supabase_service_1.SupabaseService();
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getAllUsers();
            res.status(200).json(users);
        });
    }
    ;
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield this.userService.getUserById(userId);
            if (user === null) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            logger_config_1.default.info(userData);
            if (!userData.email || !userData.password) {
                res.status(400).json({ message: "Email and password are required" });
                return;
            }
            const newUser = yield this.userService.createUser(userData);
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
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const updatedData = req.body;
            if (!updatedData.email && !updatedData.password) {
                res.status(400).json({ message: "Email or password is required" });
                return;
            }
            const updatedUser = yield this.userService.updateUser(userId, updatedData);
            if ("status" in updatedUser) {
                res.status(updatedUser.status).json({ message: updatedUser.message });
                return;
            }
            res.status(200).json(updatedUser);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            if (!userId) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }
            const deletedUser = yield this.userService.deleteUser(userId);
            const dirPath = `${userId}/*`;
            yield this.supabaseStorage.deleteFile("vault", dirPath);
            if ("status" in deletedUser) {
                res.status(deletedUser.status).json({ message: deletedUser.message });
                return;
            }
            res.status(200).json(deletedUser);
        });
    }
}
exports.UserController = UserController;
