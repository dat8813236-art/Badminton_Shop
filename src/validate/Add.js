import Joi from 'joi';

export const addSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'Name trống',
        'any.required': 'Name bắt buộc',
        'string.min': 'Ban phai nhap toi da 3 ky ty'
    }),
    fullName: Joi.string().required().messages({
        'string.empty': 'Full name trống',
    }),
    address: Joi.allow(''),
})
