const express = require('express')
const app = express()
const port = 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.get('/', (req, res) => {
    res.send('Hello World!')
}) 
require('dotenv').config()



const uri = `${process.env.DATABASE_URL}`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1, 
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        await client.db("admin").command({ ping: 1 });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})