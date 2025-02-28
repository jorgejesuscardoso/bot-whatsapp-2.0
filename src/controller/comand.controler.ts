import { Request, Response } from 'express';
import ComandosModel from "../model/comandos.model";

class ComandosController {
    private comandosModel: ComandosModel

    constructor(
        comandosModel: ComandosModel
    ) {
        this.comandosModel = comandosModel
    }

    async getMsgRomantics(req: Request, res: Response) {
        try {
            const key = req.query.key as string
            const lower = key.toLocaleLowerCase()
            const mensagens = await this.comandosModel.getMsgRomantics(lower)
            return res.status(200).json(mensagens)
        } catch {
            throw new Error('Erro ao buscar mensagens românticas')
        }
    }
}

export default ComandosController;