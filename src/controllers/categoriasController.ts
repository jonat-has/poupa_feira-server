import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Categorias } from '../models/Categorias.entity'

export default {
    async getAllCategorias(req: Request, res: Response) {
        const categorias = await AppDataSource
        .getRepository(Categorias)
        .manager
        .find(Categorias)

        console.log(categorias)
        res.send(categorias)
    }
}