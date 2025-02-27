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
const urlLocal = "http://localhost:6060";
class MarkAndResponse {
    constructor() {
    }
    getMarkOrResponse(msg, sock, admins, botNumber, anaNumber, jcNumber, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const contextInfo = msg.message.extendedTextMessage.contextInfo;
            const mentionedJids = contextInfo.mentionedJid || [];
            const senderId = msg.key.participant || "";
            const quotedUser = contextInfo.participant;
            // Se um ADM marcar o bot
            if (mentionedJids.includes(botNumber) && senderId && admins.includes(senderId)) {
                const senderName = msg.pushName || "ADM";
                if (senderId === anaNumber && text !== "&meuMin") {
                    if (msg.key.remoteJid) {
                        return yield sock.sendMessage(msg.key.remoteJid, { text: `Você me marcou, minha dona?` });
                    }
                    return;
                }
                if (senderId === jcNumber) {
                    if (msg.key.remoteJid) {
                        return yield sock.sendMessage(msg.key.remoteJid, { text: `Você me marcou, meu mestre?` });
                    }
                    return;
                }
                if (msg.key.remoteJid) {
                    return yield sock.sendMessage(msg.key.remoteJid, { text: `Você me marcou, ${senderName}?` });
                }
                return;
            }
            try {
                // Fazendo o fetch para obter a resposta da API
                const response = yield fetch(`${urlLocal}/msg/romantic?key=${text}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = yield response.json();
                const loveResponseMap = data.value;
                if (quotedUser === botNumber && text !== "&citar" && admins.includes(senderId)) {
                    const senderName = msg.pushName || "ADM";
                    // Verifica primeiro se a mensagem está no mapa de respostas românticas
                    if (senderId === anaNumber && Array.isArray(loveResponseMap) && loveResponseMap.length > 0) {
                        const randomResponse = loveResponseMap[Math.floor(Math.random() * loveResponseMap.length)];
                        yield sock.sendMessage(msg.key.remoteJid, { text: randomResponse });
                        return;
                    }
                    // Se a resposta do admin não estiver mapeada, responde de forma genérica
                    if (senderId === anaNumber) {
                        yield sock.sendMessage(msg.key.remoteJid, { text: 'Oque desejas, minha vida!!!' });
                        return;
                    }
                    if (senderId === jcNumber) {
                        yield sock.sendMessage(msg.key.remoteJid, { text: `Tudo bem, meu senhor?` });
                        return;
                    }
                    yield sock.sendMessage(msg.key.remoteJid, { text: `Você me respondeu, ${senderName}?` });
                    return;
                }
            }
            catch (error) {
                console.error("Erro ao buscar resposta:", error);
            }
        });
    }
}
exports.default = MarkAndResponse;
