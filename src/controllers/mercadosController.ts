import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Mercados } from '../models/Mercados.entity';

export default {
  async mercadosComProdutos(req: Request, res: Response) {

    try {
      const { produtos } = req.body;

      const mercadosComConjuntoEspecifico = await AppDataSource
        .getRepository(Mercados)
        .createQueryBuilder('mercado')
        .leftJoin('mercado.precos', 'precos')
        .leftJoin('precos.produto', 'produto')
        .select([
          'mercado.id_mercado',
          'mercado.nome_mercado',
          'produto.nome_produto',
          'precos.preco',
          'mercado.localizacao',
          'produto.id_produto',
          'produto.img_produto'
        ])
        .where('precos.produtoIdProduto IN (:...produtos)', { produtos })
        .getMany();

        const mercadoProdutosFormatado = mercadosComConjuntoEspecifico.map((mercado) => {
          const { id_mercado, nome_mercado, localizacao, precos } = mercado;
          const produtos = precos.map((preco) => ({
            id_produto: preco.produto.id_produto,
            nome_produto: preco.produto.nome_produto,
            preco: preco.preco,
            img_produto: preco.produto.img_produto
          }));
        
          return {
            id_mercado,
            nome_mercado,
            localizacao,
            produtos,
          };
        });
        
        res.status(200).json(mercadoProdutosFormatado);        
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar mercados com conjunto específico de produtos.' });
    }
  }
}
