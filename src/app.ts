import express from "express";
import shortenerRouter from './routes/shortener';
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.get("/",(_req:express.Request, res:express.Response) =>{
    res.status(200).json({status:200,message:"Welcome to URL Shortener!"});
})

app.use("/shorturl",shortenerRouter);

mongoose.connect(process.env.CONNECTION_STRING || "",(err) =>{
    if(err){
        // tslint:disable-next-line:no-console
        console.log(err.message);
        return;
    }
    app.listen(process.env.PORT || 3000,()=>{
        // tslint:disable-next-line:no-console
        console.log("Server is started!");
    })
})
