const { MongoClient } = require("mongodb");

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = client.db("hemodynamics-calculator");

module.exports = {
    connectToServer: async function (callback) {
        try {
            // Connect the client to the server
            await client.connect();

            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log(
                "Pinged your deployment. You successfully connected to MongoDB!"
            );
        } catch (err) {
            console.error(err);
        }

        return (db === undefined ? false : true);
    },
    getDb: function () {
        return db;
    },
};