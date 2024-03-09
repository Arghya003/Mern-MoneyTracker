const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose")
const app=express()
const PORT=4000||process.env.PORT;
const Transaction=require("./models/Transaction.js")
app.use(cors())
app.use(express.json())
app.get("/api/test",(req,res)=>{
    res.json('text ok')
   
})

app.post("/api/transaction",async(req,res)=>{
    try{
    await mongoose.connect("mongodb://localhost:27017");
    console.log("MongoDb connected")

         if (
           !req.body.name ||
           !req.body.description ||
           !req.body.datetime ||
           !req.body.price
         ) {
           res.status(400).send("Missing required fields");
           return;
         }

    const{name,description,datetime,price}=req.body;

   const transaction= await Transaction.create({name,description,datetime,price})

    res.json(transaction);
    }
    catch(e){
        console.log(e)
    }
})
app.get("/api/transaction", async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017");
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})