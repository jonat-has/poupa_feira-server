import { Router } from 'express';
import categoriasController from '../../controllers/categoriasController';
import produtosController from '../../controllers/produtosController';
import mercadosController from '../../controllers/mercadosController';

const appRoutes = Router();

// Rota para buscar todas as categorias
appRoutes.get('/categorias', categoriasController.getAllCategorias);
// Rota para buscar todos os produtos
appRoutes.get('/produtos', produtosController.getAllProdutos);
// Rota para buscar todos os mercados com um conjunto de produtos especifico
appRoutes.post('/mercadosEncontrados', mercadosController.mercadosComProdutos)
export default appRoutes;