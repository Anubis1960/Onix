import express from "express";
import {Express} from "express";

const app: Express = express();

const PORT: string | 3000 = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
