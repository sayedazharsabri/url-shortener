import { RequestHandler } from "express";
import crypto from 'crypto';
import { Shortener } from '../models/shortener';
import { updateVisit } from "./visit";
import EventEmitter from 'events';

import { MAX_ATTEMPT_FOR_SHORT_URL, SHORT_URL_PATH_BYTE_SIZE, BASE } from '../utils/config';

const visitEventName = "visited";
const visitEvent = new EventEmitter();
visitEvent.on(visitEventName, updateVisit);


export const generateShortURL: RequestHandler = async (req, res) => {
    try {
        const originalURL: string = req.body.originalURL;
        const shortURL = await getUniqueShortURL();
        if (!shortURL) {
            throw new Error("Maximum attempt failed, please try again.");
        }
        const shortener = new Shortener({ shortURL, originalURL });
        await shortener.save();

        res.status(201).json({ status: "success", data: { shortURL: BASE + shortURL } });
    } catch (error: any) {
        // log error
        // tslint:disable-next-line:no-console
        console.log(error.message);
        res.status(500).json({ status: "error", message: "Something went wrong, please try later!" });
    }
}

export const getOriginalURL: RequestHandler = async (req, res) => {
    try {
        const shortURL: string = req.params.shortURL;
        const result = await Shortener.findOne({ shortURL });
        if (!!result && !!result.originalURL) {
            visitEvent.emit(visitEventName, shortURL);
            return res.status(200).json({ originalURL: result.originalURL });
        }
        return res.status(404).json({ status: "error", message: "URL not found!" });
    } catch (error: any) {
        // tslint:disable-next-line:no-console
        console.log(error.message);
        return res.status(500).json({ status: "error", message: "Something went wrong, please try later!" });

    }
}

const getUniqueShortURL = async (): Promise<string> => {

    let shortURL: string = "";
    // We can change the number of maximum attempt or we can execute infinite loop for this
    try {
        let i = 1;
        while (i < MAX_ATTEMPT_FOR_SHORT_URL) {
            shortURL = crypto.randomBytes(SHORT_URL_PATH_BYTE_SIZE).toString("hex");
            const result = await Shortener.find({ shortURL });
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