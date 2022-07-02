import { RequestHandler } from "express";
import crypto from 'crypto';

export const generateShortURL: RequestHandler = (req, res) => {
    try {
        const originalURL: string = req.body.originalURL;
        const newId = crypto.randomBytes(4).toString("hex");
        const shortURL = "tier.app/" + newId;
        res.status(201).json({status:"success",data:{shortURL,originalURL}})
    } catch (error) {
        // log error
        res.status(500).json({status:"error",message:"Something went wrong, please try later!"});
    }
}