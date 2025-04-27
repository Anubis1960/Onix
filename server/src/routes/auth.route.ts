import express from "express";
import {AuthController} from "../controller/auth.controller";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import passport from "passport";
import {GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "../utils/secrets.utils";

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
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
}, authController.googleCallback.bind(authController)));

router.get(
    "/authorize",
    passport.authenticate("google", {scope: ["profile", "email"]}),
    (req, res) => {
        // Successful authentication, redirect home.
        console.log(req.user);
        res.redirect(GOOGLE_CALLBACK_URL);
    }
);

router.get(
    "/login",
    passport.authenticate("google", {scope: ["profile", "email"]})
);

export {router as authRouter};