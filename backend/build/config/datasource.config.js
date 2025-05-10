"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const secrets_utils_1 = require("../utils/secrets.utils");
const datasource = new typeorm_1.DataSource({
    type: "postgres",
    host: secrets_utils_1.DB_HOST,
    port: secrets_utils_1.DB_PORT,
    username: secrets_utils_1.DB_USERNAME,
    password: secrets_utils_1.DB_PASSWORD,
    database: secrets_utils_1.DB_NAME,
    synchronize: false,
    logging: true,
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
    entities: [__dirname + '/../entity/*.{ts,js}'],
    subscribers: [],
});
datasource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}, (err) => {
    console.error("Error during Data Source initialization", err);
});
exports.default = datasource;
