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
        const adminCollection = database.collection("admin");


        // all services GET API
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
            const result = await bookingCollection.insertOne(booking);
            res.json(result);
        });

        //all booking get api
        app.get('/bookings', async (req, res) => {
            const cursor = bookingCollection.find({})
            const bookings = await cursor.toArray();
            res.json(bookings);
        });


        //admin post api
        app.post('/admin', async (req, res) => {
            const admin = req.body;
            const result = await adminCollection.insertOne(admin);
            res.json(result);
        });

        //admin get api

        app.get('/admin', async (req, res) => {
            const cursor = adminCollection.find({})
            const bookings = await cursor.toArray();
            res.json(bookings);
        });


        //Delete  Api 
        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await bookingCollection.deleteOne(query);
            res.json(result);
        })

        // //get my order

        // app.get('/bookings', async (req, res) => {
        //     console.log(req.body)
        //     const keys = req.body;
        //     const query = { email: { $in: keys } }
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