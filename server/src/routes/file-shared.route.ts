import express from "express";
import {FileSharedController} from "../controller/file-shared.controller";
import {authorizationMiddleware} from "../middleware/authorization.middleware";

const router = express.Router();
const fileSharedController = new FileSharedController();

router.get(
    "/",
    authorizationMiddleware,
    fileSharedController.getAllFiles.bind(fileSharedController)
);

router.get(
    "/:id",
    authorizationMiddleware,
    fileSharedController.getFileById.bind(fileSharedController)
);

router.post(
    "/",
    authorizationMiddleware,
    fileSharedController.createFile.bind(fileSharedController)
);

router.put(
    "/:id",
    authorizationMiddleware,
    fileSharedController.updateFile.bind(fileSharedController)
);

router.delete(
    "/:id",
    authorizationMiddleware,
    fileSharedController.deleteFile.bind(fileSharedController)
);

export {router as fileSharedRouter};
