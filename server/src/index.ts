require('dotenv').config()

import express from "express";
import {Express} from "express";
import AppDataSource from "./config/data.source";
import logger from "./config/logger";
import errorHandler from "./middleware/error.middleware";
import bodyParser from "body-parser";
import cors from "cors";
import {userRouter} from "./routes/user.route";

const app: Express = express();

const PORT: number = Number(process.env._PORT) || 3000;

console.log(PORT);

AppDataSource.initialize().then(
    () => {
        logger.info("Initializing database...");
    },
    (err) => {
        logger.error(err.message);
    }
)

app.use(cors())
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use(errorHandler);

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
