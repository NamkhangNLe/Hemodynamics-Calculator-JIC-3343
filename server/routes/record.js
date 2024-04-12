const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
const db = dbo.getDb();

// This will help us convert the id from String to ObjectId for the _id field.
const ObjectId = require("mongodb").ObjectId;

/**
 * Calculates age from a DOB given as a dateString in the format YYYY-MM-DD.
 * @param {String} dob date of birth in YYYY-MM-DD format
 * @returns age as the whole number of years since the DOB
 */
function dobToAge(dob) {
    dob = new Date(dob); // dateString to Date object
    const ageInMs = Date.now() - dob.getTime(); // millisecond difference of DOB and current date
    const age = Math.abs(new Date(ageInMs).getUTCFullYear() - 1970); // calculate age in years

    return age;
}

// This section will help us get a list of all the records.
recordRoutes.get("/record", async (req, res) => {
    const collection = await db.collection("records");
    const results = await collection.find({}).toArray();
    res.send(results).status(200); // OK
});

// This section will help us get a record for a specific patient by patient_id.
recordRoutes.get("/record/:id", async (req, res) => {
    const collection = await db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200); // OK
});

// This section will help us create a new record.
recordRoutes.post("/record/add", async (req, res) => {
    const newPatient = {
        initials: req.body.initials,
        dob: req.body.dob,
        age: dobToAge(req.body.dob),
        sex: req.body.sex,
        height: req.body.height,
        weight: req.body.weight,
        bsa: Math.sqrt((+req.body.height * +req.body.weight) / 3600),
        medications: req.body.medications,
        notes: req.body.notes,
        archived: false
    };

    try {
        const collection = await db.collection("records");
        const result = await collection.insertOne(newPatient);
        res.send(result).status(204); // No Content
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record"); // Internal Server Error
    }
});

// This section will help us update a record by patient_id.
recordRoutes.patch("/update/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const updates = {
        $set: {
            initials: req.body.initials,
            dob: req.body.dob,
            age: dobToAge(req.body.dob),
            sex: req.body.sex,
            height: req.body.height,
            weight: req.body.weight,
            bsa: Math.sqrt((+req.body.height * +req.body.weight) / 3600),
            medications: req.body.medications,
            notes: req.body.notes,
            archived: req.body.archived
        },
    };

    try {
        const collection = await db.collection("records");
        const result = await collection.updateOne(query, updates);
        res.send(result).status(200); // OK
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record"); // Internal Server Error
    }
});

// This section will help us delete a record by patient_id.
// Calculations associated with the patient are also deleted.
recordRoutes.delete("/:id", async (req, res) => {
    const recordsQuery = { _id: new ObjectId(req.params.id) };
    const calculationsQuery = { patient_id: req.params.id };

    try {
        const recordsCollection = await db.collection("records");
        const result1 = await recordsCollection.deleteOne(recordsQuery);
        res.send(result1).status(200); // OK

        const calculationsCollection = await db.collection("calculations");
        await calculationsCollection.deleteMany(calculationsQuery);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record"); // Internal Server Error
    }
});

module.exports = recordRoutes;