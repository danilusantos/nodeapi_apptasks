import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { AppDataSource } from './data-source';
import routes from './routes';

AppDataSource.initialize();

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.listen(3333);
