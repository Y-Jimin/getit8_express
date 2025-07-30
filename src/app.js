import express from 'express';
import userRouter from './routes/users.js';
import productRouter from './routes/product.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRouter);
app.use('/product', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
