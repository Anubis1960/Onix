import express from "express";
import {UserController} from "../controller/user.controller";
import {authorizationMiddleware} from "../middleware/authorization.middleware";

const router = express.Router();
const userController = new UserController();

router.get(
    "/",
    authorizationMiddleware,
    userController.getAllUsers.bind(userController)
);

router.get(
    "/:id",
    authorizationMiddleware,
    userController.getUserById.bind(userController)
);

router.post(
    "/",
    authorizationMiddleware,
    userController.createUser.bind(userController)
);

router.put(
    "/:id",
    authorizationMiddleware,
    userController.updateUser.bind(userController)
);

router.delete(
    "/:id",
    authorizationMiddleware,
    userController.deleteUser.bind(userController)
);

export {router as userRouter};