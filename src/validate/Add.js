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
    image: Joi.string().uri().required().messages({
        'string.empty': 'Image trống',
        'string.uri': 'Image phải là một URL hợp lệ'
    })
})
