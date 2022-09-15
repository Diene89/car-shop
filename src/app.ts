import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/error';
import routeCar from './routes/Cars';

const app = express();

app.use(express.json());

app.use('/cars', routeCar);

app.use(errorMiddleware);

export default app;
