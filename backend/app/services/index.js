const customersService = require("./customers");

module.exports = function (app) {
  app.use("/customers", customersService(app));
};
