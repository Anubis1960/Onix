import express from "express";
import {Express} from "express";
import logger from "./config/logger.config";
import {errorHandler} from "./middleware/error.middleware";
import bodyParser from "body-parser";
import cors from "cors";
import {userRouter} from "./routes/user.route";
import {fileRouter} from "./routes/file.route";
import {fileSharedRouter} from "./routes/shared-file.route";
import {folderRouter} from "./routes/folder.routes";
import {authRouter} from "./routes/auth.route";
import {passwordManagerRouter} from "./routes/password-manager.route";
import passport from "passport";
import cookieParser from "cookie-parser";
import {SERVER_PORT} from "./utils/secrets.utils";

const app: Express = express();

app.use(cors(
    {
        origin: 'http://localhost:5173', // Adjust this to your frontend URL
        credentials: true, // Allow cookies to be sent with requests
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', userRouter);
app.use('/api/file', fileRouter);
app.use('/api/file-shared', fileSharedRouter);
app.use('/api/password-manager', passwordManagerRouter);
app.use('/api/folder', folderRouter);
app.use('/auth', authRouter);
app.use(errorHandler);


app.listen(SERVER_PORT, () => logger.info(`Server is running on port ${SERVER_PORT}`));
