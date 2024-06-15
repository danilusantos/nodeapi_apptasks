import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { AppDataSource } from './data-source';
import routes from './routes';

AppDataSource.initialize();

const app = express();
const port = process.env.PORT || 4000

app.use(bodyParser.json());
app.use(routes);

app.listen(port);
