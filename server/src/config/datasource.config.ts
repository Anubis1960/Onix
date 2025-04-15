import dotenv from 'dotenv';
import {DataSource} from "typeorm";

dotenv.config();

const datasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: String(process.env.DB_PASSWORD) || "",
    database: process.env.DB_NAME || "postgres",
    synchronize: false,
    logging: true,
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
    entities: [__dirname + '/../entity/*.{ts,js}'],
    subscribers: [],
})

datasource.initialize().then(
    () => {
        console.log("Data Source has been initialized!")
    },
    (err) => {
        console.error("Error during Data Source initialization", err)
    }
)

export default datasource;