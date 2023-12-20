import { Router } from 'express';
import categoriasController from '../../controllers/categoriasController';
import produtosController from '../../controllers/produtosController';
import mercadosController from '../../controllers/mercadosController';
import authToken from '../../middlewares/authToken';

const appRoutes = Router();

// Rota para buscar todas as categorias
appRoutes.get('/categorias', authToken,categoriasController.getAllCategorias);
// Rota para buscar todos os produtos
appRoutes.get('/produtos', authToken,produtosController.getAllProdutos);
// Rota para buscar todos os mercados com um conjunto de produtos especifico
appRoutes.post('/mercadosEncontrados',authToken,mercadosController.mercadosComProdutos)

appRoutes.post('/mercadosEncontradosComMin1',authToken,mercadosController.mercadosComPeloMenos1Produtos)
export default appRoutes;