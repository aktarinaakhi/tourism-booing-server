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
        const ordersCollection = database.collection("orders");
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

        //orders post api
        app.post('/orders', async (req, res) => {
            const orders = req.body;
            const result = await ordersCollection.insertOne(orders);
            res.json(result);
        });

        //all orders get api
        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({})
            const orderss = await cursor.toArray();
            res.json(orderss);
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
            const orderss = await cursor.toArray();
            res.json(orderss);
        });


        //Delete  Api 
        app.delete('/orderss/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        })

        //update orders status
        app.put('/orderss/:id', async (req, res) => {
            const id = req.params.id;
            const updatedStatus = req.body;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updateDoc = {
                $set: {
                    status: updatedStatus.status
                },
            };
            const result = await ordersCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        });
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