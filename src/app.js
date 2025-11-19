import express from 'express';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import itemRouter from './routes/itemRouter.js';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { logger} from './middlewares/logger.js';
import { delay } from './middlewares/delay.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/orders', orderRouter); // order 엔드포인트 처리
app.use('/users', userRouter); // user 엔드포인트 처리
app.use('/products', productRouter); // product 엔드포인트 처리
app.use('/items', itemRouter); // item 엔드포인트 처리

app.use(morgan('tiny'));
app.use(helmet());
app.use('/users', logger);
app.use('/test', delay);

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
