import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './src/routes';
import Yoonie from './bot/Yoonie';
import targetBts from './bot/palavrasAlvo/bts';
import Comandos from './bot/comandos/comand';
import MarkAndResponse from './bot/markAndResponse';

dotenv.config();

const wordsTarget = new targetBts();
const comandos = new Comandos();
const markAndResponse = new MarkAndResponse();


class App {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.config();
        this.routes();
        this.bot();
    }

    private config() {
        this.app.use(express.json());
        this.app.use(cors(
            {
                origin: '*',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                preflightContinue: false,
                optionsSuccessStatus: 204
            }
        ));
    }

    private routes() {
        this.app.use('/api/v1', route);
        this.app.use(route);

        this.app.get('/healthcheck', (req: Request, res: Response) => {
            res.status(200).send('Hello World!');
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on the port ${this.port}`);
        });
    }

    private bot() {
        const yoonie = new Yoonie(
            comandos,
            markAndResponse,         
        );
        yoonie.startBot();
    }
}

export default App;