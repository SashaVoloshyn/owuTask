import dotenv from 'dotenv';

dotenv.config();

export const mainConfig = {
    PORT: Number(process.env.PORT) || 5500,

    NODE_ENVIRONMENT_VARIABLE: process.env.NODE_ENVIRONMENT_VARIABLE || 'dev',

    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/owu_task',

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'testemail@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'googletestpassword1234567890',
};
