import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Produtos } from '../models/Produtos.entity'

export default {
    async getAllProdutos(req: Request, res: Response) {
        const produtos = await AppDataSource
        .getRepository(Produtos)
        .manager
        .find(Produtos)

        console.log(produtos)
        res.send(produtos)
    }
}