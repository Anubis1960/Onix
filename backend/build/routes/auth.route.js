"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const secrets_utils_1 = require("../utils/secrets.utils");
const router = express_1.default.Router();
exports.authRouter = router;
const authController = new auth_controller_1.AuthController();
router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: secrets_utils_1.GOOGLE_CLIENT_ID,
    clientSecret: secrets_utils_1.GOOGLE_CLIENT_SECRET,
    callbackURL: secrets_utils_1.GOOGLE_CALLBACK_URL
}, authController.googleCallback.bind(authController)));
router.get("/authorize", passport_1.default.authenticate("google", { scope: ["profile", "email"] }), (req, res) => {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect(secrets_utils_1.GOOGLE_CALLBACK_URL);
});
router.get("/login", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
