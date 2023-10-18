const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dvnw110.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const brandCollection = client.db('brandDB').collection('brand')
    const feedbackCollection = client.db('feedBackDB').collection('feedback')
    const memberCollection = client.db('memberDB').collection('member')

    app.post('/brand', async(req, res) => {
        const newBrand = req.body;
        const result = await brandCollection.insertOne(newBrand)
        res.send(result)
    })

    app.post('/feedback', async(req, res) => {
      const newFeedback = req.body;
      console.log(newFeedback);
      const result = await feedbackCollection.insertOne(newFeedback)
      res.send(result)
    })
    app.post('/member', async(req, res) => {
      const newMember = req.body;
      console.log(newMember);
      const result = await memberCollection.insertOne(newMember)
      res.send(result)
    })


    app.get('/feedback', async(req, res) => {
      const cursor = feedbackCollection.find();
      const result = await cursor.toArray();
      res.send(result)
  })

    app.get('/brand', async(req, res) => {
        const cursor = brandCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send('Technology and electronics site is running')
})

app.listen(port, () => {
    console.log(`Technology and electronics site is running port is: ${port}`);
})