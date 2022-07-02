import express from "express";

const app = express();

app.get("/",(_req:express.Request, res:express.Response) =>{
    res.status(200).json({status:200,message:"Welcome to URL Shortener!"});
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is started!");
})