import express from 'express';
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import orderRouter from './orderRouter.js';
import itemRouter from './itemRouter.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/items', itemRouter); 
// 다른 라우터를 추가할 수 있습니다.

export default router;