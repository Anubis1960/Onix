"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordManagerRouter = void 0;
const express_1 = __importDefault(require("express"));
const password_manager_controller_1 = require("../controller/password-manager.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
exports.passwordManagerRouter = router;
const passwordManagerController = new password_manager_controller_1.PasswordManagerController();
router.get("/", auth_middleware_1.authMiddleware, passwordManagerController.getAllPassword.bind(passwordManagerController));
router.get("/:id", auth_middleware_1.authMiddleware, passwordManagerController.getPasswordById.bind(passwordManagerController));
router.post("/", auth_middleware_1.authMiddleware, passwordManagerController.createPassword.bind(passwordManagerController));
router.put("/:id", auth_middleware_1.authMiddleware, passwordManagerController.updatePassword.bind(passwordManagerController));
router.delete("/:id", auth_middleware_1.authMiddleware, passwordManagerController.deletePassword.bind(passwordManagerController));
router.get("/user/:userId", auth_middleware_1.authMiddleware, passwordManagerController.getPasswordsByUserId.bind(passwordManagerController));
