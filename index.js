const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7sw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const servicesCollection = client.db("car-mechanic").collection("data");
    // perform actions on the collection object

    //POST API
    app.post('/services', async (req, res) => {

        const service = req.body;
        const result = await servicesCollection.insertOne(service);
        res.send(result)
    });

    //GET API 
    app.get('/services', async (req, res) => {
        const result = await servicesCollection.find({}).toArray();
        res.send(result)
    });

    //GET SPECIFIC SERVICE
    app.get('/services/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: (ObjectId(id)) };
        const result = await servicesCollection.findOne(query);
        res.send(result);
        console.log(id);
    });

    //DELETE METHOD
    app.delete('/services/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: (ObjectId(id)) };
        const result = await servicesCollection.deleteOne(query);
        console.log(result);
        res.send(result);
    })


});

app.get('/', (req, res) => {
    console.log('something');
    res.send('welcome to home page')
});

app.get('/hello', (req, res) => {
    res.send('Hello Mr. Hafizur Rahman')
})


app.listen(port, () => {
    console.log('surver running on:', port);
})