require("dotenv").config();
const express=require('express');
const cors=require('cors');
const connect=require('./db');
const router=require('./routes');
const multer  = require('multer')
const {reviewResume}=require("./genai")
const app=express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
const details="name:Jayadir skills:python,java,sql experience:2 years, 3 months"
// reviewResume(details)
// const storage=multer.memoryStorage()
// const upload=multer({storage:storage}).single('file');
connect();
app.use(express.json());

app.use("/apiv1", router);
app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})
const port=5000