import { Router } from 'express';
import { getProduct, postProduct } from '../controllers/productController.js';

const productRouter = Router();

productRouter.get('/', getProduct);
productRouter.post('/', postProduct);

export default productRouter;