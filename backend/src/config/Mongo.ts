import { IMongoConfig } from '../interfaces';

export const mongoConfig: IMongoConfig = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ignoreUndefined: true,
  useFindAndModify: false,
};