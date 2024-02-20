const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, response) {
  let db_connect = dbo.getDb();

  db_connect
    .collection("records")
    .find({})
    .toArray()
    .then((data) => {
      // console.log(data);
      response.json(data);
    });
});

// This section will help you get a record for a specific patient by patient_id.
recordRoutes.route("/record/:id").get(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      response.json(result);
    })
    .then((data) => {
      // console.log(data);
      response.json(data);
    });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let dob = new Date(req.body.dob); // Convert string to Date object
  let ageDiffMs = Date.now() - dob.getTime(); // Get the difference in milliseconds
  let ageDate = new Date(ageDiffMs); // Convert the age difference to a Date object
  let age = Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate the age
  let myobj = {
    initials: req.body.initials,
    dob: req.body.dob,
    age: age,
    sex: req.body.sex,
    height: req.body.height,
    weight: req.body.weight,
    bsa: Math.sqrt((+req.body.height * +req.body.weight) / 3600),
    medications: req.body.medications,
    notes: req.body.notes
  };
  db_connect
    .collection("records")
    .insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  let dob = new Date(req.body.dob); // Convert string to Date object
  let ageDiffMs = Date.now() - dob.getTime(); // Get the difference in milliseconds
  let ageDate = new Date(ageDiffMs); // Convert the age difference to a Date object
  let age = Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate the age
  let newvalues = {
    $set: {
      initials: req.body.initials,
      dob: req.body.dob,
      age: age,
      sex: req.body.sex,
      height: req.body.height,
      weight: req.body.weight,
      bsa: Math.sqrt((+req.body.height * +req.body.weight) / 3600),
      medications: req.body.medications,
      notes: req.body.notes
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record.
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
});

module.exports = recordRoutes;