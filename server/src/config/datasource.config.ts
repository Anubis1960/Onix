import {DataSource} from "typeorm";
import {DB_NAME, DB_PORT, DB_HOST, DB_PASSWORD, DB_USERNAME} from "../utils/secrets.utils";

const datasource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
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