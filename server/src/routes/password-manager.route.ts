import express from "express";
import {PasswordManagerController} from "../controller/password-manager.controller";
import {authorizationMiddleware} from "../middleware/authorization.middleware";

const router = express.Router();
const passwordManagerController = new PasswordManagerController();

router.get(
    "/",
    authorizationMiddleware,
    passwordManagerController.getAllPassword
);

router.get(
    "/:id",
    authorizationMiddleware,
    passwordManagerController.getPasswordById.bind(passwordManagerController)
);

router.post(
    "/",
    authorizationMiddleware,
    passwordManagerController.createPassword.bind(passwordManagerController)
);

router.put(
    "/:id",
    authorizationMiddleware,
    passwordManagerController.updatePassword.bind(passwordManagerController)
);

router.delete(
    "/:id",
    authorizationMiddleware,
    passwordManagerController.deletePassword.bind(passwordManagerController)
);

router.get(
    "/user/:userId",
    authorizationMiddleware,
    passwordManagerController.getPasswordByUserId.bind(passwordManagerController)
);

export {router as passwordManagerRouter};