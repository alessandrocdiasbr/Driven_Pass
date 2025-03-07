import express, { Request, Response } from 'express';
import cors from 'cors';

import router from './routers';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send()
});

export default app;