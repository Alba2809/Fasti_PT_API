// middleware function to validate the request body against a schema, if the validation is successful then proceed to the next middleware function, otherwise return a 400 Bad Request error with the validation errors
export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};
