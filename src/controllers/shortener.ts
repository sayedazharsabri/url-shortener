import { RequestHandler } from "express";
import crypto from 'crypto';
import { Shortener } from '../models/shortener';
import { MAX_ATTEMPT_FOR_SHORT_URL, SHORT_URL_PATH_BYTE_SIZE } from '../utils/config';

export const generateShortURL: RequestHandler = async (req, res) => {
    try {
        const originalURL: string = req.body.originalURL;
        const uniqueShortURLPath = await getUniqueShortURL();
        if (!uniqueShortURLPath) {
            throw new Error("Maximum attempt failed, please try again.");
        }
        const shortener = new Shortener({ shortURL: uniqueShortURLPath, originalURL });
        await shortener.save();
        const shortURL = "tier.app/" + uniqueShortURLPath;
        res.status(201).json({ status: "success", data: { shortURL } });
    } catch (error: any) {
        // log error
        // tslint:disable-next-line:no-console
        console.log(error.message);
        res.status(500).json({ status: "error", message: "Something went wrong, please try later!" });
    }
}

const getUniqueShortURL = async (): Promise<string> => {

    let shortURL: string = "";
    // We can change the number of maximum attempt or we can execute infinite loop for this
    try {
        let i = 1;
        while (i < MAX_ATTEMPT_FOR_SHORT_URL) {
            shortURL = crypto.randomBytes(SHORT_URL_PATH_BYTE_SIZE).toString("hex");
            let result = await Shortener.find({ shortURL });
            if (!result || result.length === 0) {
                break;
            }
            shortURL = "";
            i++;
        }
    } catch (error: any) {
        // tslint:disable-next-line:no-console
        console.log(error.message);
        shortURL = "";
    }
    return shortURL;
}