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
class Comandos {
    constructor() { }
    getStatus(sock, msg, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield sock.sendMessage(msg.key.remoteJid, {
                text: "🤖✨ Estou online e funcionando perfeitamente! 🎉🥳🎊😃"
            });
            return response;
        });
    }
    ;
    getCitar(sock, msg, text) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const quotedMessage = msg.message.extendedTextMessage.contextInfo.quotedMessage;
            let quotedText = quotedMessage.conversation ||
                ((_a = quotedMessage.extendedTextMessage) === null || _a === void 0 ? void 0 : _a.text) ||
                "[Mídia não pode ser citada]";
            const groupMetadata = yield sock.groupMetadata(msg.key.remoteJid);
            const members = groupMetadata.participants;
            const mentions = members.map((member) => member.id);
            // Enviar mensagem com marcação invisível
            const mentionMessage = {
                text: `${quotedText}\n\n`,
                mentions: mentions,
            };
            return yield sock.sendMessage(msg.key.remoteJid, mentionMessage);
        });
    }
    ;
    getMarcar(sock, msg, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupMetadata = yield sock.groupMetadata(msg.key.remoteJid);
            const members = groupMetadata.participants;
            // Mapeia os nomes dos membros
            const mentions = members.map((member) => member.id);
            const memberNames = members
                .map((member) => `@${member.id.split("@")[0]}`)
                .join("\n");
            const mentionMessage = {
                text: `👥 ${members.length} membros marcados!\n${memberNames}`,
                mentions: mentions,
            };
            return yield sock.sendMessage(msg.key.remoteJid, mentionMessage);
        });
    }
    ;
    getMenu(sock, msg, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const menuMessage = `📜 *Lista de Comandos do Bot* 🤖\n\n` +
                `✅ *&status* – Verifica se o bot está online.\n` +
                `💬 *&citar* – Cita uma mensagem respondida e menciona todos do grupo.\n` +
                `👥 *&marcar* – Menciona todos os membros do grupo.\n` +
                `📜 *&menu* – Exibe esta lista de comandos.\n` +
                `🤖 *&min* – Exibe a lista de comandos exclusivo da Anna.\n\n\n` +
                `✨ *Feito com ❤️ por JcBushido - O rei dos Bots*`;
            return yield sock.sendMessage(msg.key.remoteJid, { text: menuMessage });
        });
    }
    ;
    getWelcome(sock, member, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const avisoLink = "https://chat.whatsapp.com/J5KCYGS4I9KAEPdm13mteX";
            const jid = member.includes("@") ? member : `${member.replace(/\D/g, "")}@s.whatsapp.net`;
            const welcomeMessage = `🌟✨ **Seja muito bem-vindo, ${jid}!** ✨🌟\n\n` +
                `📖 Aqui você pode falar um pouco sobre sua obra e compartilhar suas ideias! 🎨📜\n\n` +
                `⚠️ **Regras importantes para uma boa convivência:** ⚠️\n\n` +
                `🚫 *Sem links de divulgação no chat!* ❌\n\n` +
                `🤝 **Respeite os coleguinhas** – Tratamos todos com educação, cordialidade e respeito! ❤️\n\n` +
                `📩 **Não chame ninguém no PV sem permissão** – Evite desconfortos! 🚷\n\n` +
                `⛔ **Sem tópicos religiosos ou políticos**✨\n\n` +
                `🔞 **Sem conteúdo 18+** – Mantenha o grupo seguro para todos! 🚨\n\n` +
                `📢 **Entre no nosso grupo de avisos e não saia sem avisar um ADM!** 🛑\n\n` +
                `Caso saia sem permissão, não poderá retornar ao projeto. 🚷\n\n\n` +
                `📌 **Grupo de Avisos | PROJETO LUNAR 🌙**\n\n` +
                `🔗 ${avisoLink} 🚀✨`;
            return yield sock.sendMessage(msg.key.remoteJid, { text: welcomeMessage, mentions: [jid] });
        });
    }
    getMin(sock, msg, text, senderId, anaNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            if (senderId !== anaNumber) {
                yield sock.sendMessage(msg.key.remoteJid, { text: "Você não é a minha Anna, vá embora! 😠🚫" });
                return;
            }
            const loveMessage = `💖 *Lista de Comandos Românticos* 💖\n\n` +
                `Digite uma dessas frases, meu amor, para receber uma resposta apaixonada:\n\n` +
                `💌 *Oi, amor*\n` +
                `💌 *Você está bem?*\n` +
                `💌 *Saudades*\n` +
                `💌 *Boa noite*\n` +
                `💌 *Bom dia*\n` +
                `💌 *Te amo*\n` +
                `💌 *Está ocupado?*\n` +
                `💌 *Senti sua falta*\n` +
                `💌 *Você é fofo*\n` +
                `💌 *Marry me?*\n` +
                `💌 *Vem morar comigo*\n` +
                `💌 *Você é meu tudo*\n` +
                `💌 *Me apaixonei por você*\n` +
                `💌 *Eu preciso de você*\n` +
                `💌 *Você é a melhor parte de mim*\n\n\n` +
                `💘 *Respondo com muito amor e carinho!* 💘`;
            yield sock.sendMessage(msg.key.remoteJid, { text: loveMessage });
            return;
        });
    }
}
exports.default = Comandos;
