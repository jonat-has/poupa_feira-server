import { AppDataSource } from "./data-source"
import express from "express"
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors"

dotenv.config()
const app = express();
const port = 8080;
app.use(express.json())

app.use(cors())
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




