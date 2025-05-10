"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderRouter = void 0;
const express_1 = __importDefault(require("express"));
const folder_controller_1 = require("../controller/folder.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
exports.folderRouter = router;
const folderController = new folder_controller_1.FolderController();
router.get("/", auth_middleware_1.authMiddleware, folderController.getAllFolders.bind(folderController));
router.get("/:id", auth_middleware_1.authMiddleware, folderController.getFolderById.bind(folderController));
router.post("/", auth_middleware_1.authMiddleware, folderController.createFolder.bind(folderController));
router.put("/:id", auth_middleware_1.authMiddleware, folderController.updateFolder.bind(folderController));
router.delete("/:id", auth_middleware_1.authMiddleware, folderController.deleteFolder.bind(folderController));
router.get("/user/:userId", auth_middleware_1.authMiddleware, folderController.getFoldersByUserId.bind(folderController));
router.get("/children/:parentId", auth_middleware_1.authMiddleware, folderController.getChildrenByParentId.bind(folderController));
