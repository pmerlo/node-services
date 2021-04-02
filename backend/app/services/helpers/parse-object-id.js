const ObjectId = require("mongodb").ObjectId;

module.exports = function () {
  return function (req, res, next) {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      req.params.id = new ObjectId(id);
      next();
    } else {
      res.status(400);
      res.json({ message: "Invalid value for parameter <id>" });
    }
  };
};
