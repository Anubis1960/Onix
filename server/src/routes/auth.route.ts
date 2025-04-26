import express from "express";
import {AuthController} from "../controller/auth.controller";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import passport from "passport";

const router = express.Router();
const authController = new AuthController();

router.post(
    "/login",
    authController.login.bind(authController)
);

router.post(
    "/register",
    authController.register.bind(authController)
);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: process.env.GOOGLE_CALLBACK_URL || ""
}, authController.googleCallback.bind(authController)));

router.get(
    "/authorize",
    passport.authenticate("google", {scope: ["profile", "email"]}),
    (req, res) => {
        // Successful authentication, redirect home.
        console.log(req.user);
        res.redirect(process.env.GOOGLE_CALLBACK_URL || "");
    }
);

router.get(
    "/login",
    passport.authenticate("google", {scope: ["profile", "email"]})
);

export {router as authRouter};