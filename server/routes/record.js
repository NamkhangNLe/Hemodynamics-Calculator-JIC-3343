const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
const db = dbo.getDb();

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.get("/record", async (req, res) => {
    const collection = await db.collection("records");
    const results = await collection.find({}).toArray();
    res.send(results).status(200); // OK
});

// This section will help you get a record for a specific patient by patient_id.
recordRoutes.get("/record/:id", async (req, res) => {
    const collection = await db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200); // OK
});

// This section will help you create a new record.
recordRoutes.post("/record/add", async (req, res) => {
    const dob = new Date(req.body.dob); // Convert string to Date object
    const ageDiffMs = Date.now() - dob.getTime(); // Get the difference in milliseconds
    const ageDate = new Date(ageDiffMs); // Convert the age difference to a Date object
    const age = Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate the age

    try {
        const newPatient = {
            initials: req.body.initials,
            dob: req.body.dob,
            age: age,
            sex: req.body.sex,
            height: req.body.height,
            weight: req.body.weight,
            bsa: Math.sqrt((+req.body.height * +req.body.weight) / 3600),
            medications: req.body.medications,
            notes: req.body.notes,
            archived: false
        };

        const collection = await db.collection("records");
        const result = await collection.insertOne(newPatient);
        res.send(result).status(204); // No Content
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record"); // Internal Server Error
    }
});

// This section will help you update a record by id.
recordRoutes.patch("/update/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const dob = new Date(req.body.dob); // Convert string to Date object
        const ageDiffMs = Date.now() - dob.getTime(); // Get the difference in milliseconds
        const ageDate = new Date(ageDiffMs); // Convert the age difference to a Date object
        const age = Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate the age

        const updates = {
            $set: {
                initials: req.body.initials,
                dob: req.body.dob,
                age: age,
                sex: req.body.sex,
                height: req.body.height,
                weight: req.body.weight,
                bsa: Math.sqrt((+req.body.height * +req.body.weight) / 3600),
                medications: req.body.medications,
                notes: req.body.notes,
                archived: req.body.archived
            },
        };

        const collection = await db.collection("records");
        const result = await collection.updateOne(query, updates);
        res.send(result).status(200); // OK
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record"); // Internal Server Error
    }
});

// This section will help you delete a record.
recordRoutes.delete("/:id", async (req, res) => {
    try {
        const recordsQuery = { _id: new ObjectId(req.params.id) };
        const recordsCollection = await db.collection("records");
        const result1 = await recordsCollection.deleteOne(recordsQuery);
        res.send(result1).status(200); // OK

        const calculationsQuery = { patient_id: req.params.id };
        const calculationsCollection = await db.collection("calculations");
        const result2 = await calculationsCollection.deleteMany(calculationsQuery);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record"); // Internal Server Error
    }
});

module.exports = recordRoutes;