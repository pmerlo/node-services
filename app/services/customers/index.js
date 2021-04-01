const express = require("express");
const router = express.Router();

const parseObjectId = require("../helpers/parse-object-id");
const validateBody = require("../helpers/validate-body");

const schema = require("./schema.json");
const collectionName = "customers";

const findAll = function (req, res) {
  req.collection.find({}, {}).toArray(function (err, result) {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.status(200);
      res.json(result);
    }
  });
};

const findOne = function (req, res) {
  req.collection.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.status(200);
      res.json(result);
    }
  });
};

const createOne = function (req, res) {
  req.collection.insertOne(req.body, {}, (err, result) => {
    data = {};
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.status(201);
      res.json({
        _id: result.insertedId,
        ...req.body,
      });
    }
  });
};

const updateOne = function (req, res) {
  req.collection.updateOne(
    { _id: req.params.id },
    { $set: { ...req.body } },
    { upsert: false },
    (err, result) => {
      if (err) {
        res.status(400);
        res.json(err);
        console.log(err);
      } else {
        res.status(200);
        res.json({
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
        });
      }
    }
  );
};

const deleteOne = function (req, res) {
  req.collection.deleteOne({ _id: req.params.id }, {}, (err, result) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.status(200);
      res.json({
        deletedCount: result.deletedCount,
      });
    }
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

  return router;
};
