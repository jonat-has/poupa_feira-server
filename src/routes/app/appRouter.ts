import { Router } from 'express';
import categoriasController from '../../controllers/categoriasController';
import produtosController from '../../controllers/produtosController';
import mercadosController from '../../controllers/mercadosController';

const appRoutes = Router();

// Rota para buscar todas as categorias
appRoutes.get('/categorias/:id', categoriasController.getAllCategorias);
// Rota para buscar todos os produtos
appRoutes.get('/produtos/:id', produtosController.getAllProdutos);
// Rota para buscar todos os mercados com um conjunto de produtos especifico
appRoutes.get('/mercadosComProdutos', mercadosController.mercadosComProdutos);
export default appRoutes;