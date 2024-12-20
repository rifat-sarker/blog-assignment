import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api', router);

app.use(globalErrorHandler);

app.use(notFound)

export default app;
