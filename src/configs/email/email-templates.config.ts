import EmailTemplate from 'email-templates';
import path from 'path';

import { mainConfig } from '../main-configs';
import { NodeEnvironmentEnum } from '../../enums';

let pathToEmailTemplates = '';

if (mainConfig.NODE_ENVIRONMENT_VARIABLE === NodeEnvironmentEnum.DEV) {
    pathToEmailTemplates = 'src';
}

export const emailTemplate = new EmailTemplate({
    views: {
        root: path.join(process.cwd(), pathToEmailTemplates, 'email-templates'),
    },
});
