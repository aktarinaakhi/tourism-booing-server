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
        const servicesCollection = database.collection("services");
        const bookingCollection = database.collection("booking");


        // services GET API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({})
            const services = await cursor.toArray();
            res.json(services);
        })

        // services POST api

        app.post('/services', async (req, res) => {
            const service = req.body;
            const result = await servicesCollection.insertOne(service);
            res.json(result);
        });

        //booking post api
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            console.log(req.body)

            const result = await bookingCollection.insertOne(booking);
            res.json(result);
        });

        //booking get api
        app.get('/bookings', async (req, res) => {
            const cursor = bookingCollection.find({ 'confirmation.email': req.query.email })
            const bookings = await cursor.toArray();
            res.json(bookings);
        });

        //Delete  Api 
        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            console.log(query);
            const result = await bookingCollection.deleteOne(query);
            res.json(result);
            console.log(result);
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