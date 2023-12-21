import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv";

dotenv.config()
const { DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "poupa-feira.database.windows.net",
    port: 1433,
    username: "poupa_feira",
    password: "jonathas2890@",
    database: "Poupa_Feira-Database",
    synchronize: true,
    logging: false,
    
    entities: [
        "src/models/*.ts"
    ],
    migrations: [],
    subscribers: [],
})
