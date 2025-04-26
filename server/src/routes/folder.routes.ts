import express from "express";
import {FolderController} from "../controller/folder.controller";
import {authMiddleware} from "../middleware/auth.middleware";

const router = express.Router();
const folderController = new FolderController();

router.get(
    "/",
    authMiddleware,
    folderController.getAllFolders.bind(folderController)
);

router.get(
    "/:id",
    authMiddleware,
    folderController.getFolderById.bind(folderController)
);

router.post(
    "/",
    authMiddleware,
    folderController.createFolder.bind(folderController)
);

router.put(
    "/:id",
    authMiddleware,
    folderController.updateFolder.bind(folderController)
);

router.delete(
    "/:id",
    authMiddleware,
    folderController.deleteFolder.bind(folderController)
);

router.get(
    "/user/:userId",
    authMiddleware,
    folderController.getFolderByUserId.bind(folderController)
);

export {router as folderRouter};