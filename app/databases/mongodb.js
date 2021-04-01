const MongoClient = require("mongodb").MongoClient;

const config = {
  useUnifiedTopology: true,
};

module.exports = function (app) {
  MongoClient.connect(
    app.config.databases.mongodb.url,
    config,
    function (err, client) {
      if (err) console.log("connect err");

      console.log("connected to database");
      const dbo = client.db("mydb");
      app.locals = {};
      app.locals.mongodb = dbo;
    }
  );
};
