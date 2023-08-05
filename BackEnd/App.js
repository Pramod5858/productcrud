const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const cors = require("cors");

const route = require("./Index/index.js");

const port = 5500;
const hostname = "localhost";
const AtlasDB = "mongodb+srv://productprojectuser:soY47ApLABkrjc75@cluster0.bp8cdod.mongodb.net/productprojectdb?retryWrites=true&w=majority"

// project name = "productproject"
// username= productprojectuser
// password= soY47ApLABkrjc75
// link="mongodb+srv://productprojectuser:<password>@cluster0.bp8cdod.mongodb.net/?retryWrites=true&w=majority"
// database name= "productprojectdb"

const app = express();

app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
app.use("/", route);

mongoose.connect(AtlasDB, {useNewUrlParser:true, useUnifiedTopology:true})
.then(res=>{
    app.listen(port, hostname, ()=>{
        console.log(`Server is connected to ${hostname}:${port}`);
    })
}

)
.catch(error=>console.log(error))


