import {EmailTypeTemplateEnum} from "../enums";
import {IEmailContext} from "../interfaces";
import {emailTemplateConstant} from "../constants";
import {emailTemplate, mainConfig, transporter} from "../configs";

class EmailService {
    public async sendMessage(email: string, type: EmailTypeTemplateEnum, context: IEmailContext): Promise<void> {
        const { subject, template } = emailTemplateConstant[type];



        const unitedContext = Object.assign(context);

        const html = await emailTemplate.render(template, unitedContext);

        await transporter.sendMail({
            from: mainConfig.ROOT_EMAIL,
            to: email,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();