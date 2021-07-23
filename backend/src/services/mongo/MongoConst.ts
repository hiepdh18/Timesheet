import { IMongoConfig } from '../../interfaces';

export const mongoSetup: IMongoConfig = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
    useFindAndModify: false,
};
