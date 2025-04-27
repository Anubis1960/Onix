import express from "express";
import {SharedFileController} from "../controller/shared-file.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import upload from "../config/multer.config";

const router = express.Router();
const sharedFileController = new SharedFileController();

router.get(
    "/",
    authMiddleware,
    sharedFileController.getAllFiles.bind(sharedFileController)
);

router.get(
    "/:id",
    authMiddleware,
    sharedFileController.getFileById.bind(sharedFileController)
);

router.post(
    "/",
    authMiddleware,
    upload.single('file'),
    sharedFileController.createFile.bind(sharedFileController)
);

router.put(
    "/:id",
    authMiddleware,
    sharedFileController.updateFile.bind(sharedFileController)
);

router.delete(
    "/:id",
    authMiddleware,
    sharedFileController.deleteFile.bind(sharedFileController)
);

router.get(
    "/download/:id",
    authMiddleware,
    sharedFileController.downloadFile.bind(sharedFileController)
);

export {router as fileSharedRouter};
