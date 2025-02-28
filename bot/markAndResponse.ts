
const urlLocal = "http://localhost:6060";

class MarkAndResponse {

    constructor() {
        
    }

    async getMarkOrResponse(msg: any, sock: any, admins: string[], botNumber: string, anaNumber: string, jcNumber: string, text: any) {
        const contextInfo = msg.message.extendedTextMessage.contextInfo;
        const mentionedJids = contextInfo.mentionedJid || [];
        const senderId = msg.key.participant || "";
        const quotedUser = contextInfo.participant;     
    
        // Se um ADM marcar o bot
        if (mentionedJids.includes(botNumber) && senderId && admins.includes(senderId)) {
            const senderName = msg.pushName || "ADM";
    
            if (senderId === anaNumber && text !== "&meuMin") {
                if (msg.key.remoteJid) {
                    return await sock.sendMessage(msg.key.remoteJid, { text: `Você me marcou, minha dona?` });
                }
                return;
            } 
            
            if (senderId === jcNumber) {
                if (msg.key.remoteJid) {
                    return await sock.sendMessage(msg.key.remoteJid, { text: `Você me marcou, meu mestre?` });
                }
                return;
            }
    
            if (msg.key.remoteJid) {
                return await sock.sendMessage(msg.key.remoteJid, { text: `Você me marcou, ${senderName}?` });
            }
            return;
        } 


        try {
            // Fazendo o fetch para obter a resposta da API
            const response = await fetch(`${urlLocal}/msg/romantic?key=${text}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();
            const loveResponseMap = data.value;

            if (quotedUser === botNumber && text !== "&citar" && admins.includes(senderId) ) {
                const senderName = msg.pushName || "ADM";
        
                // Verifica primeiro se a mensagem está no mapa de respostas românticas
                if (senderId === anaNumber || senderId === jcNumber  && Array.isArray(loveResponseMap) && loveResponseMap.length > 0) {                    
    
                    const randomResponse = loveResponseMap[Math.floor(Math.random() * loveResponseMap.length)];                    
        
                    await sock.sendMessage(msg.key.remoteJid, { text: randomResponse });
                    return;
                }
        
                // Se a resposta do admin não estiver mapeada, responde de forma genérica
                if (senderId === anaNumber) {
                    await sock.sendMessage(msg.key.remoteJid, { text: 'Oque desejas, minha vida!!!' });
                    return;
                } 
                
                if (senderId === jcNumber) {
                    await sock.sendMessage(msg.key.remoteJid, { text: `Tudo bem, meu senhor?` });
                    return;
                }
        
                await sock.sendMessage(msg.key.remoteJid, { text: `Você me respondeu, ${senderName}?` });
                return;
            }               
    
        } catch (error) {
            console.error("Erro ao buscar resposta:", error);
        }        
    }

}

export default MarkAndResponse