const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dvnw110.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions Object to set the Stable API version
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
    // await client.connect();

    const brandCollection = client.db('brandDB').collection('brand')
    const feedbackCollection = client.db('feedBackDB').collection('feedback')
    const memberCollection = client.db('memberDB').collection('member')
    const productCollection = client.db('productDB').collection('product')
    const cartCollection = client.db('cartDB').collection('cart')

    app.post('/brand', async (req, res) => {
      const newBrand = req.body;
      const result = await brandCollection.insertOne(newBrand)
      res.send(result)
    })

    app.post('/feedback', async (req, res) => {
      const newFeedback = req.body;
      const result = await feedbackCollection.insertOne(newFeedback)
      res.send(result)
    })
    app.post('/member', async (req, res) => {
      const newMember = req.body;
      const result = await memberCollection.insertOne(newMember)
      res.send(result)
    })
    app.post('/product', async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct)
      res.send(result)
    })
    app.post('/cart', async (req, res) => {
      const newProduct = req.body;
      const result = await cartCollection.insertOne(newProduct)
      res.send(result)
    })


    app.get('/feedback', async (req, res) => {
      const cursor = feedbackCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get('/member', async (req, res) => {
      const cursor = memberCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/brand', async (req, res) => {
      const cursor = brandCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get('/brand/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await brandCollection.findOne(query)
      res.send(result)
    })
    app.get('/product', async (req, res) => {
      const cursor = productCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await productCollection.findOne(query)
      res.send(result)
    })
    app.get('/cart', async (req, res) => {
      const cursor = cartCollection.find()
      const result = await cursor.toArray()
      res.send(result)

    })

    app.put('/product/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updatedProduct = req.body;
      const product = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
          photo: updatedProduct.photo

        }
      }
      const result = await productCollection.updateOne(filter, product, options)
      res.send(result)
    })


    app.delete('/cart/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: id }
      const result = await cartCollection.deleteOne(query)
      res.send(result)
    })

      /
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