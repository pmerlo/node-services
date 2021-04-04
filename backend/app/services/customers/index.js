const express = require("express");
const router = express.Router();

const parseObjectId = require("../helpers/parse-object-id");
const validateBody = require("../helpers/validate-body");

const schema = require("./schema.json");
const collectionName = "customers";

const findAll = (req, res) => {
  req.collection
    .find({}, {})
    .toArray()
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
};

const findOne = (req, res) => {
  req.collection
    .findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
};

const createOne = (req, res) => {
  req.collection
    .insertOne(req.body, {})
    .then((result) => {
      res.status(201);
      res.json({ _id: result.insertedId, ...req.body });
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
};

const updateOne = (req, res) => {
  req.collection
    .updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { upsert: false }
    )
    .then((result) => {
      res.status(200);
      res.json({
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      });
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
      console.log(err);
    });
};

const deleteOne = (req, res) => {
  req.collection
    .deleteOne({ _id: req.params.id }, {})
    .then((result) => {
      res.status(200);
      res.json({ deletedCount: result.deletedCount });
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
};

const deleteAll = (req, res) => {
  req.collection
    .deleteMany()
    .then((result) => {
      res.status(200);
      res.json({ deletedCount: result.deletedCount });
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
};

module.exports = function (app) {
  router.use(function (req, _, next) {
    app.locals.mongodb.collection(collectionName, function (err, collection) {
      if (err) throw err;
      req.collection = collection;
      next();
    });
  });

  router.get("/", findAll);
  router.post("/", [validateBody(schema), createOne]);
  router.get("/:id", [parseObjectId(), findOne]);
  router.put("/:id", [parseObjectId(), validateBody(schema), updateOne]);
  router.delete("/:id", [parseObjectId(), deleteOne]);
  router.delete("/", deleteAll);

  return router;
};
