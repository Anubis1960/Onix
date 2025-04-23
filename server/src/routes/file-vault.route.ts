import express from "express";
import {FileVaultController} from "../controller/file-vault.controller";
import {authorizationMiddleware} from "../middleware/authorization.middleware";

const router = express.Router();
const fileVaultController = new FileVaultController();

router.get(
    "/",
    authorizationMiddleware,
    fileVaultController.getAllFiles.bind(fileVaultController)
);

router.get(
    "/:id",
    authorizationMiddleware,
    fileVaultController.getFileById.bind(fileVaultController)
);

router.post(
    "/",
    authorizationMiddleware,
    fileVaultController.createFile.bind(fileVaultController)
);

router.put(
    "/:id",
    authorizationMiddleware,
    fileVaultController.updateFile.bind(fileVaultController)
);

router.delete(
    "/:id",
    authorizationMiddleware,
    fileVaultController.deleteFile.bind(fileVaultController)
);

router.get(
    "/user/:userId",
    authorizationMiddleware,
    fileVaultController.getFileByUserId.bind(fileVaultController)
);

export {router as fileVaultRouter};
