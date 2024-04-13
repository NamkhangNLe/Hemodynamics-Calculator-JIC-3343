const express = require("express");

// calcuationRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /calculation.
const calcuationRoutes = express.Router();

// This will help us connect to the database.
const dbo = require("../db/conn");
const db = dbo.getDb();

// This will help us convert the id from String to ObjectId for the _id field.
const ObjectId = require("mongodb").ObjectId;


// This section will help us get a list of all the calculations.
calcuationRoutes.get("/calculation", async (req, res) => {
    const collection = await db.collection("calculations");
    const results = await collection.find({}).toArray();
    res.send(results).status(200); // OK
});

// This section will help us get a list of all the calculations for a specific patient by patient_id.
calcuationRoutes.get("/calculation/:id", async (req, res) => {
    const query = { patient_id: req.params.id };
    const collection = await db.collection("calculations");
    const results = await collection.find(query).toArray();

    if (!results) res.send("Not found").status(404); // Not Found
    else res.send(results).status(200); // OK
});

// This section will help us create a new calculation.
calcuationRoutes.post("/calculation/add", async (req, res) => {
    const currentDate = new Date();
    currentDate.setMilliseconds(0); // NOTE: assumes the same calculation won't be calculated for the same patient more than once per second

    const newPatient = {
        patient_id: req.body.selectedPatientID,
        date: currentDate,
        valueType: req.body.valueType,
        calculatedValue: req.body.calculatedValue,
    };

    try {
        const collection = await db.collection("calculations");
        const result = await collection.insertOne(newPatient);
        res.send(result).status(204); // No Content
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record"); // Internal Server Error
    }
});

// This section will help us update the date, valuetype/formula, and value for a calculation by _id.
calcuationRoutes.patch("/updatecalc/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updatedDate = new Date(req.body.date);
    updatedDate.setMilliseconds(0); // NOTE: assumes the same calculation won't be calculated for the same patient more than once per second

    const updates = {
        $set: {
            date: updatedDate,
            valueType: req.body.valueType,
            calculatedValue: req.body.calculatedValue
        },
    };

    try {
        const collection = await db.collection("calculations");
        const result = await collection.updateOne(query, updates);
        res.send(result).status(200); // OK
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record"); // Internal Server Error
    }
});

// This section will help us delete a record by _id.
calcuationRoutes.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    try {
        const collection = await db.collection("calculations");
        const result = await collection.deleteOne(query);
        res.send(result).status(200); // OK
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record"); // Internal Server Error
    }
});

module.exports = calcuationRoutes;