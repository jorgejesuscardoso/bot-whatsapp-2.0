import express, { Request, Response } from 'express';
import ComandosController from '../controller/comand.controler';
import ComandosModel from '../model/comandos.model';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const comandosModel = new ComandosModel(prisma);
const comandController = new ComandosController(comandosModel);

const route = express.Router();

route.get('/msg/romantic', async (req: Request, res: Response) => {
    await comandController.getMsgRomantics(req, res);
});

export default route;