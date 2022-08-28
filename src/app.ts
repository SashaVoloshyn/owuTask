import express from 'express';
import mongoose from 'mongoose';

import { mainConfig } from './configs';
import { apiRouter } from './routes';

const mongoDB = mainConfig.DATABASE_URL;
const { PORT } = mainConfig;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const start = async () => {
    const connected = await mongoose.connect(mongoDB);
    if (connected) console.log('Data Base has been connected!');

    app.listen(PORT, () => {
        console.log(`Server is running on PORT:${PORT}!!!!!`);
    });
};
start();
