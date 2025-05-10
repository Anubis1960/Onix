import express from "express";
import {FileController} from "../controller/file.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import upload from "../config/multer.config";

const router = express.Router();
const fileController = new FileController();

router.get(
    "/",
    authMiddleware,
    fileController.getAllFiles.bind(fileController)
);

router.get(
    "/:id",
    authMiddleware,
    fileController.getFileById.bind(fileController)
);

router.post(
    "/",
    authMiddleware,
    upload.single('file'),
    fileController.createFile.bind(fileController)
);

router.put(
    "/:id",
    authMiddleware,
    fileController.updateFile.bind(fileController)
);

router.delete(
    "/:id",
    authMiddleware,
    fileController.deleteFile.bind(fileController)
);

router.get(
    "/folder/:folderId",
    authMiddleware,
    fileController.getFilesByFolderId.bind(fileController)
);

router.get(
    "/download/:id",
    authMiddleware,
    fileController.downloadFile.bind(fileController)
);

export {router as fileRouter};
