const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9m4lb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database connect successful')
        const database = client.db("tourism");
        const placesCollection = database.collection("places");
        const ordersCollection = database.collection("orders");

        //GET API
        app.get('/places', async (req, res) => {
            const cursor = placesCollection.find({})
            const places = await cursor.toArray();
            res.json(places);

        })

        // //use post method by use keys

        // app.post('/places/byKeys', async (req, res) => {
        //     console.log(req.body)
        //     const keys = req.body;
        //     const query = { key: { $in: keys } }
        //     const places = await productCollection.find(query).toArray();
        //     res.json(places);
        // })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('ema john running');
});

app.listen(port, () => {
    console.log('ema john server running', port);
})