import { Visit } from '../models/visit';

export const updateVisit = (shortURL: string) => {

    try {
        Visit.findOneAndUpdate({ shortURL }, { $inc: { visitCount: 1 } }, { upsert: true }, function (err) {
            if (err) {
                // tslint:disable-next-line:no-console
                console.log(err);
            }
        });
    } catch (error: any) {
        // tslint:disable-next-line:no-console
        console.log(error.message);
    }

}