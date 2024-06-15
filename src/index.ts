import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import routes from './routes';

AppDataSource.initialize();

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

// Configuração do CORS para permitir o domínio do Expo Snack
const corsOptions = {
    origin: 'https://snack.expo.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Rotas
app.use(routes);

// Middleware para tratar rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware para tratamento global de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocorreu um erro inferno no servidor' });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
