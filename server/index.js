const express = require("express");
const cors = require("cors");
require("./database/Config")
const user = require("./database/Users")
const product = require("./database/Products");
const Products = require("./database/Products");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    let data = data
    res.send("app is running");
})

app.post("/register", async (req, res) => {
    let data = new user(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login", async (req, res) => {

    if (req.body.email && req.body.password)
    {
        let data = await user.findOne(req.body).select("-password");
        if (data)
        {
            res.send(data)
        }
        else
        {
            res.send({ result: "No Data found" })
        }
    }
})

app.post("/add-product", async (req, res) => {
    let data = new product(req.body);
    let result = await data.save();
    res.send(result)
})

app.get("/products", async (req, res) => {
    let products = await Products.find();
    if (Products.length > 0)
    {
        res.send(products)
    }
    else
    {
        res.send({ result: "No Product" })
    }


})



app.delete("/products/:_id", async (req, res) => {
    const result = await Products.deleteOne({ _id: req.params._id })
    res.send(result);
})

app.get("/products/:_id", async (req, res) => {
    const result = await Products.findOne({ _id: req.params._id })
    if (result)
    {
        res.send(result)
    }
    else
    {
        res.send({ result: "No record Found" })
    }

})


app.get("/search/:key", async (req, res) => {
    let result = await Products.find(
        {
            "$or": [
                { name: { $regex: req.params.key } },
                { price: { $regex: req.params.key } },
                { company: { $regex: req.params.key } },
                { category: { $regex: req.params.key } },
            ]
        }
    )
    res.send(result)
})

app.put("/products/:_id", async (req, res) => {
    let result = await Products.updateOne(
        { _id: req.params._id },
        { $set: req.body })
    res.send(result)
})

app.listen(8000, () => {
    console.log("server is running")
})