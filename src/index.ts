import { AppDataSource } from "./data-source"
import express from 'express'
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config()
const app = express();
const port = process.env.EX_PORT;
app.use(express.json())

app.use(routes)

AppDataSource
    .initialize()
    .then(() => {
        console.log("Banco de dados inicializado!")

        app.get('/', (req, res) => {
          res.send('Conexão estabelecida')
        })

        app.listen(port, () => {
          console.log(`server rodando na porta:${port}`)
      })
    })
    .catch((err) => {
        console.error("Error ao iniciar o banco de dados:", err)
    })




