const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 1 character long',
      'any.required': 'Title is required'
    }),
  
  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price must be greater than or equal to 0',
      'any.required': 'Price is required'
    })
});

const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }
  
  next();
};

module.exports = { validateBook };