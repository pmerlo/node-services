const process = require("process");
const Validator = require("jsonschema").Validator;

const schema = require("./config.schema.json");

const loadConfig = function () {
  switch (process.env.NODE_ENV) {
    case "dev":
      return require("./files/dev.json");
    case "prod":
      return require("./files/prod.json");
    case "test":
      return require("./files/test.json");
    default:
      throw Error(`invalid environment '${process.env.NODE_ENV}'`);
  }
};

const validate = function (config) {
  const result = new Validator().validate(config, schema);
  if (result.errors.length > 0) throw Error(result.errors[0].stack);
};

module.exports = function (app) {
  const config = loadConfig();
  validate(config);
  app.config = config;
};
