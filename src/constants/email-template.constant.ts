import { EmailTypeTemplateEnum } from '../enums';

export const emailTemplateConstant = {
    [EmailTypeTemplateEnum.NEW_POSITION]: {
        subject: 'Added new position',
        template: 'addedNewPosition',
    },

    [EmailTypeTemplateEnum.REMOVE_POSITION]: {
        subject: 'Position removed',
        template: 'positionRemoved',
    },
};
