import mongoose from "mongoose";
import { IMongoConfig } from "../../interfaces";
import { logger } from "../logger";
import { mongoConfig } from '../../config'

export class MongoService {
    constructor(private readonly uri: string, private readonly config: IMongoConfig) { }
    public async connect() {
        try {
            await mongoose.connect(this.uri, this.config)
            logger.info("Database cennected!!!")
        } catch (error) {
            logger.error(error.message)
            throw new Error(error)
        }
    }
}
const uri = process.env.MONGO_URI
export const mongoService = new MongoService(uri, mongoConfig)
