import { Visit } from '../models/visit';
import logger from "../logger/logger";
export const updateVisit = (shortURL: string) => {

    try {
        Visit.findOneAndUpdate({ shortURL }, { $inc: { visitCount: 1 } }, { upsert: true }, function (err) {
            if (err) {
                logger.error(err.message,err);
            }
        });
    } catch (error: any) {
        logger.error(error.message,error);
    }

}