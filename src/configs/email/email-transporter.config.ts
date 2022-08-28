import nodemailer from 'nodemailer';

import { mainConfig } from '../main-configs';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mainConfig.ROOT_EMAIL,
        pass: mainConfig.ROOT_EMAIL_PASSWORD,
    },
});
