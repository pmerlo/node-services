const Validator = require("jsonschema").Validator;

module.exports = function (schema) {
  return function (req, res, next) {
    const result = new Validator().validate(req.body, schema);
    if (result.errors.length == 0) {
      next();
    } else {
      res.status(400);
      res.json({ message: result.errors[0].stack.split('"').join("'") });
    }
  };
};
