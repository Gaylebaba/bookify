import express from "express";
import connectdb from "./config/db.js";

const app=express();

connectdb();

app.get("/",(req,res)=>{
    res.send("server running");
});

app.listen(5000, ()=>{
    console.log("server started on log 5000");
});