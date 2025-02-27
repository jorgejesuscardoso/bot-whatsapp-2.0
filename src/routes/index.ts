import express, { Request, Response } from 'express';
import comand from './comands.route'

const route = express.Router();

route.use(comand);


export default route;