require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Routes/router")
const DB = require("./db/connection")
const PORT = 6010

// app.get("/",(req,res)=>{
//     res.status(201).json("server start")
// });
app.use(cors())

app.use(express.json());

app.use("/uploads",express.static("./uploads"));

app.use("/files",express.static("./public/files"));

app.use(router)


app.listen(PORT,()=>{
    console.log(`Server start at port no ${PORT}`);
})