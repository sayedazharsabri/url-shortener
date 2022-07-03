const logger = {
    error(message: string = "", data: any) {
        // tslint:disable-next-line:no-console
        console.error("ERROR: " + message, data);
        // trigger notifications in case of critical log
        // Add checks for critical logs
    },

    info(message: string = "") {
        // tslint:disable-next-line:no-console
        console.log("INFO: " + message);
    }
}

export default logger;