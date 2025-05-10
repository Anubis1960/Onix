"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
exports.userRouter = router;
const userController = new user_controller_1.UserController();
router.get("/", auth_middleware_1.authMiddleware, userController.getAllUsers.bind(userController));
router.get("/:id", auth_middleware_1.authMiddleware, userController.getUserById.bind(userController));
router.post("/", auth_middleware_1.authMiddleware, userController.createUser.bind(userController));
router.put("/:id", auth_middleware_1.authMiddleware, userController.updateUser.bind(userController));
router.delete("/:id", auth_middleware_1.authMiddleware, userController.deleteUser.bind(userController));
