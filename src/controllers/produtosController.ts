import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Produtos } from '../models/Produtos.entity'

export default {
    async getAllProdutos(req: Request, res: Response) {
        const produtos = await AppDataSource
        .getRepository(Produtos)
        .createQueryBuilder('produto')
        .leftJoinAndSelect('produto.categoria', 'categoria')
        .select([
        'produto.id_produto',
        'produto.nome_produto',
        'produto.img_produto',
        'produto.medida',
        'categoria.nome_categoria' // Selecionando apenas o ID da categoria
      ])
      .getMany();

      const mediaDosProdutos = await AppDataSource
      .createQueryBuilder()
      .select('produtoIdProduto')
      .addSelect('ROUND(AVG(preco), 2)', 'avg_preco')
      .from('poupa_feira.precos', 'precos')
      .groupBy('produtoIdProduto')
      .getRawMany();
        
    
    const mapMediaPreco = {};

    mediaDosProdutos.forEach(item => {
      mapMediaPreco[item.produtoIdProduto] = item.avg_preco;
    });

  
    const produtosComMediaPreco = produtos.map(produto => ({
      ...produto,
      media_preco: mapMediaPreco[produto.id_produto] // Adicione a média do preço correspondente
    }));

    console.log(produtosComMediaPreco)    
    res.send(produtosComMediaPreco);
    }
}