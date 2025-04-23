import dotenv from 'dotenv';

dotenv.config();
import express from "express";
import {Express} from "express";
import datasource from "./config/datasource.config";
import logger from "./config/logger.config";
import {errorHandler} from "./middleware/error.middleware";
import bodyParser from "body-parser";
import cors from "cors";
import {userRouter} from "./routes/user.route";
import {fileVaultRouter} from "./routes/file-vault.route";
import {fileSharedRouter} from "./routes/file-shared.route";
import {passwordManagerRouter} from "./routes/password-manager.route";

const app: Express = express();

const PORT: number = Number(process.env._PORT) || 3000;

console.log(PORT);

app.use(cors())
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/file-vault', fileVaultRouter);
app.use('/api/file-shared', fileSharedRouter);
app.use('/api/password-manager', passwordManagerRouter);
app.use(errorHandler);


app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
