const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userroutes =require("./routes/userroutes")
const morgan = require('morgan')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(morgan('tiny'))


app.use("/api/auth",userroutes)
 
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log("db connection established")
  
}).catch((err)=>{
  console.log(err.message);

});
const server = app.listen(process.env.PORT, () => {
  console.log(`server stsrted on port ${process.env.PORT}`);
});

