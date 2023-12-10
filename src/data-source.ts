import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv";

dotenv.config()
const { DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: 3306,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        "src/models/*.ts"
    ],
    migrations: [],
    subscribers: [],
})