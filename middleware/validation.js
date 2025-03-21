const yup = require('yup');

// Define Yup schema
const contactSchema = yup.object({
  firstName: yup.string().required('firstName is required'),
  lastName: yup.string().required('lastName is required'),
  email: yup.string().email('Invalid email format').required('email is required'),
  favoriteColor: yup.string().required('favoriteColor is required'),
  birthday: yup.string(), // optionally: yup.date().nullable()
});

// Middleware function
const saveContact = async (req, res, next) => {
  try {
    req.body = await contactSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    next();
  } catch (err) {
    const formattedErrors = err.inner.map(e => ({
      field: e.path,
      message: e.message
    }));
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: formattedErrors
    });
  }
};

module.exports = { saveContact };
