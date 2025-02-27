"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ComandosController {
    constructor(comandosModel) {
        this.comandosModel = comandosModel;
    }
    getMsgRomantics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = req.query.key;
                key.toLocaleLowerCase();
                const mensagens = yield this.comandosModel.getMsgRomantics(key);
                return res.status(200).json(mensagens);
            }
            catch (_a) {
                throw new Error('Erro ao buscar mensagens românticas');
            }
        });
    }
}
exports.default = ComandosController;
