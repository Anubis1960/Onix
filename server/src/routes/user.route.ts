import express from "express";
import {UserController} from "../controller/user.controller";

const router = express.Router();
const userController = new UserController();

router.get(
    "/",
    userController.getAllUsers.bind(userController)
);

router.get(
    "/:id",
    userController.getUserById.bind(userController)
);

router.post(
    "/",
    userController.createUser.bind(userController)
);

router.put(
    "/:id",
    userController.updateUser.bind(userController)
);

router.delete(
    "/:id",
    userController.deleteUser.bind(userController)
);

export {router as userRouter};