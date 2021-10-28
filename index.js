const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9m4lb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        // await client.connect();
        // console.log('database connect successful')
        // const database = client.db("tourism");
        // // const productCollection = database.collection("products");

        // //GET API
        // app.get('/products', async (req, res) => {
        //     const cursor = productCollection.find({})
        //     const page = req.query.page;
        //     const size = parseInt(req.query.size);

        //     let products;
        //     const count = await cursor.count();

        //     if (page) {
        //         products = await cursor.skip(page * size).limit(size).toArray();
        //     }
        //     else {
        //         products = await cursor.toArray();
        //     }

        //     res.json({
        //         count,
        //         products
        //     });

        // })

        // //use post method by use keys

        // app.post('/products/byKeys', async (req, res) => {
        //     console.log(req.body)
        //     const keys = req.body;
        //     const query = { key: { $in: keys } }
        //     const products = await productCollection.find(query).toArray();
        //     res.json(products);
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