class Comandos {

    constructor() {}



   async getStatus(sock: any, msg: any, text: string) {
        const response = await sock.sendMessage(msg.key.remoteJid, { 
            text: "🤖✨ Estou online e funcionando perfeitamente! 🎉🥳🎊😃"
        });
        return response;
    };

    async getCitar(sock: any, msg: any, text: string) {
        
        const quotedMessage = msg.message.extendedTextMessage.contextInfo.quotedMessage;
        let quotedText = quotedMessage.conversation || 
                            quotedMessage.extendedTextMessage?.text || 
                            "[Mídia não pode ser citada]";

        const groupMetadata = await sock.groupMetadata(msg.key.remoteJid);
        const members = groupMetadata.participants;
        const mentions = members.map((member: any) => member.id);

        // Enviar mensagem com marcação invisível
        const mentionMessage = {
            text: `${quotedText}\n\n`,
            mentions: mentions,
        };

        return await sock.sendMessage(msg.key.remoteJid, mentionMessage);    
        
    };

    async getMarcar(sock: any, msg: any, text: string) {
        const groupMetadata = await sock.groupMetadata(msg.key.remoteJid);
                const members = groupMetadata.participants;
    
                // Mapeia os nomes dos membros
        const mentions = members.map((member: any) => member.id);
        const memberNames = members
            .map((member: any) => `@${member.id.split("@")[0]}`)
            .join("\n");

        const mentionMessage = {
            text: `👥 ${members.length} membros marcados!\n${memberNames}`,
            mentions: mentions,
        };

        return await sock.sendMessage(msg.key.remoteJid, mentionMessage);
        
    };

    async getMenu(sock: any, msg: any, text: string) {
        const menuMessage = `📜 *Lista de Comandos do Bot* 🤖\n\n` +
                    `✅ *&status* – Verifica se o bot está online.\n` +
                    `💬 *&citar* – Cita uma mensagem respondida e menciona todos do grupo.\n` +                    
                    `👥 *&marcar* – Menciona todos os membros do grupo.\n` +
                    `📜 *&menu* – Exibe esta lista de comandos.\n` +
                    `🤖 *&min* – Exibe a lista de comandos exclusivo da Anna.\n\n\n` +
                    `✨ *Feito com ❤️ por JcBushido - O rei dos Bots*`;
            
        return await sock.sendMessage(msg.key.remoteJid, { text: menuMessage });
    };

    async getWelcome(sock: any, member: string, msg: any) {
        const avisoLink = "https://chat.whatsapp.com/J5KCYGS4I9KAEPdm13mteX";
        const jid = member.includes("@") ? member : `${member.replace(/\D/g, "")}@s.whatsapp.net`;
    
        const welcomeMessage = 
        `🌟✨ **Seja muito bem-vindo, ${jid}!** ✨🌟\n\n` +
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
    
        return await sock.sendMessage(msg.key.remoteJid, { text: welcomeMessage, mentions: [jid] });
    }

    async getMin(sock: any, msg: any, text: string, senderId: string, anaNumber: string) {        

        if (senderId !== anaNumber) {
            await sock.sendMessage(msg.key.remoteJid, { text: "Você não é a minha Anna, vá embora! 😠🚫" });
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

        
        await sock.sendMessage(msg.key.remoteJid, { text: loveMessage });
        return;
    }
    
    
}

export default Comandos;