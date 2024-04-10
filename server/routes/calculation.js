const express = require("express");

// calcuationRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /calculation.
const calcuationRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
const db = dbo.getDb();

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the calculations.
calcuationRoutes.get("/calculation", async (req, res) => {
    const collection = await db.collection("calculations");
    const results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// This section will help you get a list of all the calculations for a specific patient by patient_id.
calcuationRoutes.get("/calculation/:id", async (req, res) => {
    const query = { patient_id: req.params.id };
    const collection = await db.collection("calculations");
    const results = await collection.find(query).toArray();

    if (!results) res.send("Not found").status(404);
    else res.send(results).status(200);
});

// This section will help you create a new record.
calcuationRoutes.post("/calculation/add", async (req, res) => {
    try {
        const newPatient = {
            patient_id: req.body.selectedPatientID,
            date: new Date(),
            valueType: req.body.valueType,
            calculatedValue: req.body.calculatedValue,
        };

        const collection = await db.collection("calculations");
        const result = await collection.insertOne(newPatient);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

// Updates the date, valuetype/formula, and value for a calculation. Does NOT update associated patient_id.
calcuationRoutes.patch("/updatecalc/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const updates = {
            $set: {
                date: new Date(req.body.date),
                valueType: req.body.valueType,
                calculatedValue: req.body.calculatedValue
            },
        };

        const collection = await db.collection("calculations");
        const result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

// This section will help you delete a record.
calcuationRoutes.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const collection = await db.collection("calculations");
        const result = await collection.deleteOne(query);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

module.exports = calcuationRoutes;