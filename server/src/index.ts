import dotenv from 'dotenv';

dotenv.config();
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

const app: Express = express();

const PORT: number = Number(process.env._PORT) || 3000;

console.log(PORT);

app.use(cors())
app.use(passport.initialize());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/file', fileRouter);
app.use('/api/file-shared', fileSharedRouter);
app.use('/api/password-manager', passwordManagerRouter);
app.use('/api/folder', folderRouter);
app.use('/auth', authRouter);
app.use(errorHandler);


app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
