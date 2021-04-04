const customersService = require("./customers");

module.exports = function (app) {
  app.use("/api/v1/customers", customersService(app));
};
