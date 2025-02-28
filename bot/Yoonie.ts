import { Browsers, makeWASocket, useMultiFileAuthState } from 'baileys';
import qrcode from 'qrcode-terminal';
import Comandos from './comandos/comand';
import MarkAndResponse from './markAndResponse';
import { getCachedGroupMetadata } from './metaData';
import axios from 'axios';



class Bot {
    private comandos: Comandos;
    private markAndResponse: MarkAndResponse;

  constructor(
    comandos: Comandos,
    markAndResponse: MarkAndResponse
) {
    
    this.markAndResponse = markAndResponse;
    this.comandos = comandos;

  }
  

  async startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_yoonie");
    const sock = makeWASocket({ auth: state, browser: Browsers.windows('Desktop') });

    sock.ev.on("creds.update", saveCreds);


    // atualização de conexão
    sock.ev.on("connection.update", (update) => {
        const { qr, connection, lastDisconnect } = update as any;
    
        if (qr) {
            console.log("QR Code gerado!");
            qrcode.generate(qr, { small: true }); // Exibe o QR Code no terminal
        }
    
        if (connection === "open") {
            console.log("Conexão aberta com sucesso!");
        }
    
        if (lastDisconnect?.error?.output?.statusCode === 515) {
            console.log("Erro 515 detectado, tentando reconectar...");
            setTimeout(() => this.startBot(), 3000); // Reconnect after 3 seconds
        }
    });

    // Mensagens recebidas
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        const senderName = msg.pushName || msg.key.participant || msg.key.remoteJid || "";

        if(!msg) return;      

        // IDs dos grupos que o bot deve escutar
        const GROUPS = [
            "120363344315534746@g.us", 
            "120363385529862822@g.us",
            "120363371139546807@g.us" // Grupo de Avisos
        ];

        // IDs dos administradores e do bot
        const botNumber = "557381062081@s.whatsapp.net";
        const anaNumber = "557381828372@s.whatsapp.net";
        const jcNumber = "557391266263@s.whatsapp.net";

        // Obtém os IDs dos administradores
        async function getGroupAdmins(groupId: any) {
            const groupMetadata = await sock.groupMetadata(groupId);
            const adms = groupMetadata.participants
                .filter(p => p.admin)
                .map(p => p.id);                
            return adms;
        }
        
        const admins = await getGroupAdmins(msg.key.remoteJid); // Pegamos os admins do grupo 
        const senderId = msg.key.participant || msg.key.remoteJid || ""; // Obtém o ID do remetente

        let text = "";        
    
        // Verifica se a mensagem veio de um dos grupos autorizados
        if (msg.key.remoteJid && GROUPS.includes(msg.key.remoteJid) && msg.message) {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2s antes de consultar metadata

            const groupMetadata = await getCachedGroupMetadata(sock, msg.key.remoteJid);
            if (!groupMetadata) return; // Sai da função se falhar

            const groupName = groupMetadata.subject;
            const members = groupMetadata.participants;
        
            // Obtém o ID do remetente
            const senderId = msg.key.participant || msg.key.remoteJid || "";
            //const sender = members.find(member => member.id === senderId) || {};
            //const senderNumber = senderId.split("@")[0] as string;
        
            // Obtém o conteúdo da mensagem
            text =
                msg.message.conversation ||
                msg.message.extendedTextMessage?.text ||
                "[Mídia/Postagem]";
        
            // Exibe no console
            console.log(`📢 ${groupName} - ${senderName} = ${text}`); 
        };

        // Verifica se o bot ta online
        if (text === "&status") {
            this.comandos.getStatus(sock, msg, text);
            return;
        };

        // Citar mensagem
        if (text === "&citar") {
            this.comandos.getCitar(sock, msg, text);
            return;
        };

        // Marcar membros
        if (text === "&marcar") {
            this.comandos.getMarcar(sock, msg, text);
            return;
        };

        // Envia um menu de comandos
        if (text === "&menu") {
            this.comandos.getMenu(sock, msg, text);
            return;
        };

        // Envia um menu de comandos exclusivo da Anna
        if (text === "&min") {
            this.comandos.getMin(sock, msg, text, senderId,anaNumber);
            return;
        };

        // Responde se for marcado
        if (msg.message?.extendedTextMessage?.contextInfo) {
           this.markAndResponse.getMarkOrResponse(msg, sock, admins, botNumber, anaNumber, jcNumber, text);
           return;
        }










       
        const sentWelcome = new Set(); // Armazena quem já recebeu boas-vindas

        // Remove ouvintes duplicados antes de adicionar um novo
        sock.ev.removeAllListeners("group-participants.update");

        // Ouvinte para mensagens de entrada de boas-vindas
        sock.ev.on("group-participants.update", async (update) => {
            const { id, participants, action } = update;

            if (action === "add" && id !== "120363371139546807@g.us") {
                for (let participant of participants) {
                    if (sentWelcome.has(participant)) {
                        console.log(`Já enviou boas-vindas para @${participant.split("@")[0]}`);
                        continue; // Se já enviou, pula este usuário
                    }

                    const avisoLink = "https://chat.whatsapp.com/J5KCYGS4I9KAEPdm13mteX";

                    const welcomeMessage = 
                    `🌟✨ **Seja muito bem-vindo, @${participant.split("@")[0]}!** ✨🌟\n\n` +
                    `📖 Aqui você pode falar um pouco sobre sua obra e compartilhar suas ideias! 🎨📜\n\n` +
                    `⚠️ **Regras importantes para uma boa convivência:** ⚠️\n\n` +
                    `🚫 *Sem links no chat!* ❌\n\n` +
                    `🤝 **Respeite os coleguinhas** – Tratamos todos com educação, cordialidade e respeito! ❤️\n\n` +
                    `📩 **Não chame ninguém no PV sem permissão** – Evite desconfortos! 🚷\n\n` +
                    `⛔ **Sem tópicos religiosos ou políticos**✨\n\n` +
                    `🔞 **Sem conteúdo 18+** – Mantenha o grupo seguro para todos! 🚨\n\n` +
                    `📢 **Entre no nosso grupo de avisos e não saia sem avisar um ADM!** 🛑\n\n` +
                    `Caso saia sem permissão, não poderá retornar ao projeto. 🚷\n\n\n` +
                    `📌 **Grupo de Avisos | PROJETO LUNAR 🌙**\n\n` +
                    `🔗 ${avisoLink} 🚀✨`;


                    try {
                        await new Promise((resolve) => setTimeout(resolve, 2000)); // Evita spam de mensagens
                        await sock.sendMessage(id, {
                            text: welcomeMessage,
                            mentions: [participant],
                        });

                        sentWelcome.add(participant); // Marca como já enviado
                    } catch (error) {
                        console.error(`Erro ao enviar boas-vindas para ${participant}:`, error);
                    }
                }
            }
        });

        

    });
  }
}

export default Bot;

function keepAlive() {
    axios.get("https://google.com")
    .then(() => console.log("Ping enviado para manter o bot ativo."))
    .catch((err) => console.error("Erro ao pingar:", err));
}

// Executa o ping a cada 5 minutos
setInterval(keepAlive, 5 * 60 * 1000);
