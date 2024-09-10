import winston from "winston";
import __dirname from '../utils.js';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, 'src', '.env');
dotenv.config({ path: envPath });

const customLevelsOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    }
}

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: "debug" }),
        new winston.transports.Console({ level: "http" }),
        new winston.transports.Console({ level: "info" }),
        new winston.transports.Console({ level: "warning" }),
        new winston.transports.Console({ level: "error" }),
        new winston.transports.Console({ level: "fatal" })
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: "info" }),
        new winston.transports.Console({ level: "warning" }),
        new winston.transports.Console({ level: "error" }),
        new winston.transports.Console({ level: "fatal" }),
        new winston.transports.File({ filename: './errors.log', level: "error" }),
        new winston.transports.File({ filename: './errors.log', level: "fatal" })
    ]
})

export const addLogger = (req, res, next) => {
    if (process.env.ENTORNO == "PROD") {
        req.logger = prodLogger;
        req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
        req.logger.warning(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
        req.logger.fatal(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
    } else {
        req.logger = devLogger;
        req.logger.debug(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
        req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
        req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
        req.logger.warning(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
        req.logger.fatal(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
    }

    next();
}