const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middle ware 
app.use(express.json())
app.use(cors())



const uri = `${process.env.DATABASE_URL}`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    const addProductCollection = client.db("equi-sports").collection("product");



    try {

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })


        //  create product 

        app.post('/create-product', async (req, res) => {
            const product = req.body;
            console.log(product)
            const result = await addProductCollection.insertOne(product);
            return res.send(result)

        })

        // get all product 

        app.get('/products',  async(req, res) => {           
            const products = await addProductCollection.find().toArray();
            res.send(products); 
         })
        //   find single product 

         app.get('/products/:id',  async(req, res) => {      
            const productId= req.params.id    
             const query = { _id: new ObjectId(productId) } 
            const products = await addProductCollection.findOne(query);
            res.send(products); 
         }) 

        app.get('/my-product/:userEmail',  async(req, res) => {      
            const {userEmail} = req.params
            console.log(userEmail)
            const query = { userEmail } 
            const products = await addProductCollection.find(query).toArray();
            res.send(products); 
         }) 
         

        //  update equipment
         
         app.put('/my-product/:id', async(req, res) => {   
            const id=req.params.id   
            const filter={_id: new ObjectId(id)}
             const  product  = req.body ; 
              const query = { $set: product } 
            const products =  await addProductCollection.updateOne(filter,query);
            res.send(products); 
         })

 

        app.delete("/my-products/:id", async (req, res) => {
           
           try{
               const id = req.params.id;
               const query = { _id: new ObjectId(id) };
               const result = await addProductCollection.deleteOne(query);
               res.send(result);
           }
           catch(error){
            console.log(error)
           }
            
        });




        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log(error)

    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})