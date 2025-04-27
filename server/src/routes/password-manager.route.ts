import express from "express";
import {PasswordManagerController} from "../controller/password-manager.controller";
import {authMiddleware} from "../middleware/auth.middleware";

const router = express.Router();
const passwordManagerController = new PasswordManagerController();

router.get(
    "/",
    authMiddleware,
    passwordManagerController.getAllPassword.bind(passwordManagerController)
);

router.get(
    "/:id",
    authMiddleware,
    passwordManagerController.getPasswordById.bind(passwordManagerController)
);

router.post(
    "/",
    authMiddleware,
    passwordManagerController.createPassword.bind(passwordManagerController)
);

router.put(
    "/:id",
    authMiddleware,
    passwordManagerController.updatePassword.bind(passwordManagerController)
);

router.delete(
    "/:id",
    authMiddleware,
    passwordManagerController.deletePassword.bind(passwordManagerController)
);

router.get(
    "/user/:userId",
    authMiddleware,
    passwordManagerController.getPasswordsByUserId.bind(passwordManagerController)
);

export {router as passwordManagerRouter};