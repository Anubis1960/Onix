"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSharedRouter = void 0;
const express_1 = __importDefault(require("express"));
const shared_file_controller_1 = require("../controller/shared-file.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const router = express_1.default.Router();
exports.fileSharedRouter = router;
const sharedFileController = new shared_file_controller_1.SharedFileController();
router.get("/", auth_middleware_1.authMiddleware, sharedFileController.getAllFiles.bind(sharedFileController));
router.get("/:id", auth_middleware_1.authMiddleware, sharedFileController.getFileById.bind(sharedFileController));
router.post("/", auth_middleware_1.authMiddleware, multer_config_1.default.single('file'), sharedFileController.createFile.bind(sharedFileController));
router.delete("/:id", auth_middleware_1.authMiddleware, sharedFileController.deleteFile.bind(sharedFileController));
router.get("/room/:roomId", auth_middleware_1.authMiddleware, sharedFileController.getFilesByRoomId.bind(sharedFileController));
router.get("/download/:id", auth_middleware_1.authMiddleware, sharedFileController.downloadFile.bind(sharedFileController));
