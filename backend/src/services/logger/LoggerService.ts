import winston from 'winston';
import { winstonFormat } from './LoggerFormat';
import { winstonTransports } from './LoggerTransports';

const logger = winston.createLogger({
    format: winstonFormat,
    transports: [...winstonTransports],
});

const stream = {
    write: (message: string) => {
        logger.http(message.substring(0, message.lastIndexOf('\n')));
    },
};

export { logger, stream };
