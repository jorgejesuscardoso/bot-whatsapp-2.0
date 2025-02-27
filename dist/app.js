"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./src/routes"));
const Yoonie_1 = __importDefault(require("./bot/Yoonie"));
const bts_1 = __importDefault(require("./bot/palavrasAlvo/bts"));
const comand_1 = __importDefault(require("./bot/comandos/comand"));
const markAndResponse_1 = __importDefault(require("./bot/markAndResponse"));
dotenv_1.default.config();
const wordsTarget = new bts_1.default();
const comandos = new comand_1.default();
const markAndResponse = new markAndResponse_1.default();
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.config();
        this.routes();
        this.bot();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204
        }));
    }
    routes() {
        this.app.use('/api/v1', routes_1.default);
        this.app.use(routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on the port ${this.port}`);
        });
    }
    bot() {
        const yoonie = new Yoonie_1.default(comandos, markAndResponse);
        yoonie.startBot();
    }
}
exports.default = App;
