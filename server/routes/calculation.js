const express = require("express");

// The router will be added as a middleware and will take control of requests starting with path /calculation.
const calcuationRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the calculations.
calcuationRoutes.route("/calculation").get(async function (req, response) {
  let db_connect = dbo.getDb();

  db_connect
    .collection("calculations")
    .find({})
    .toArray()
    .then((data) => {
      // console.log(data);
      response.json(data);
    });
});

// This section will help you get a list of all the calculations for a specific patient by patient_id.
calcuationRoutes.route("/calculation/:id").get(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { patient_id: req.params.id };
  db_connect
    .collection("calculations")
    .find(myquery)
    .toArray()
    .then((data) => {
      // console.log(data);
      response.json(data);
    });
});

// This section will help you create a new record.
calcuationRoutes.route("/calculation/add").post(function (req, response) {
  // console.log("back", req.body)
  let db_connect = dbo.getDb();
  let myobj = {
    patient_id: req.body.selectedPatientID,
    date: new Date(),
    valueType: req.body.valueType,
    calculatedValue: req.body.calculatedValue,
  };
  db_connect
    .collection("calculations")
    .insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// Updates the date, valuetype/formula, and value for a calculation. Does NOT update associated patient_id.
calcuationRoutes.route("/updatecalc/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      date: new Date(req.body.date),
      valueType: req.body.valueType,
      calculatedValue: req.body.calculatedValue
    },
  };
  db_connect
    .collection("calculations")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record.
calcuationRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  db_connect
    .collection("calculations")
    .deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      // console.log("1 document deleted");
      response.json(obj);
    });
});

module.exports = calcuationRoutes;