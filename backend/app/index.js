const express = require("express");
const cors = require("cors");

const configuration = require("./configuration");
const databases = require("./databases");
const services = require("./services");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configuration(app);
databases(app);
services(app);

app.listen(app.config.port, () =>
  console.log(`Listening on port ${app.config.port}`)
);
