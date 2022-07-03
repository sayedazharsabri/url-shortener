import express from "express";
import shortenerRouter from './routes/shortener';
import mongoose from "mongoose";
import logger from "./logger/logger";

const app = express();

app.use(express.json());

app.get("/",(_req:express.Request, res:express.Response) =>{
    res.status(200).json({status:200,message:"Welcome to URL Shortener!"});
})

app.use("/shorturl",shortenerRouter);

mongoose.connect(process.env.CONNECTION_STRING || "",(err) =>{
    if(err){
        logger.error(err.message, err);
        return;
    }
    app.listen(process.env.PORT || 3000,()=>{
        logger.info("Server is started!");
    })
})
