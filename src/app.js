import express from 'express';
import userRouter from './routes/users.js';
import productRouter from './routes/product.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRouter); // user 엔드포인트 처리
app.use('/product', productRouter); // product 엔드포인트 처리

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
