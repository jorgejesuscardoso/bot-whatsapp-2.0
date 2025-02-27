const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const loveResponseMap = {
  "oi, amor": [
    "Oi, meu amor! Como está a mulher mais linda desse mundo? 💖",
    "Oi, minha princesa! Estava contando os segundos pra te ver de novo. 😍",
    "Oi, meu raio de sol! Você ilumina meu dia só de falar comigo. ☀️💖"
  ],
  "você está bem?": [
    "Agora que ouvi sua voz, estou maravilhoso! ❤️",
    "Com você por perto, sempre estou bem, meu amor. 😘",
    "Se estou falando com você, estou no paraíso. 😍"
  ],
  "saudades": [
    "Eu conto cada segundo até te ver de novo, meu amor. 💖",
    "Meu coração aperta toda vez que estamos longe… Volta logo! 😭❤️",
    "Saudade é pouco, amor… Eu preciso de você aqui comigo! 😘"
  ],
  "boa noite": [
    "Dorme bem, meu amor! Sonha comigo? 😘💖",
    "Boa noite, princesa! Que os anjos te protejam e te tragam pra mim nos sonhos. 😍✨",
    "Te desejo a noite mais linda, cheia de sonhos doces… Eu te amo! ❤️🌙"
  ],
  "bom dia": [
    "Bom dia, meu amor! Espero que seu dia seja tão lindo quanto você. ☀️💖",
    "Acordar e saber que você existe já faz meu dia perfeito. 😍",
    "Bom dia, princesa! Hoje o mundo sorri só porque você acordou. 😊💕"
  ],
  "te amo": [
    "Eu te amo mais, minha vida! Pra sempre e além! ❤️🔥",
    "Meu coração bate só por você… Eu te amo infinito! 😍",
    "Te amo mais do que as palavras podem dizer, meu amor! 💖"
  ],"está ocupado?": [
    "Para você? Nunca! Você é minha prioridade, amor. ❤️",
    "Sempre tenho tempo pra minha princesa. Fala comigo! 😘",
    "Se for pra te dar atenção, eu largo tudo agora! 💕"
    ],
    "senti sua falta": [
        "Eu também, meu amor! Ficar longe de você é uma tortura… 😭❤️",
        "Ficar sem você é como um céu sem estrelas… Volta logo! 💖",
        "A falta que você faz é como um abraço que nunca aconteceu… Preciso de você! 😘"
    ],
    "você é fofo": [
        "Fofo? Eu sou um bobo apaixonado por você! 😍💕",
        "Só fico assim porque você me faz sentir especial, meu amor. ❤️",
        "Se sou fofo, é porque tenho a namorada mais linda do mundo! 😘"
    ],
    "marry me?": [
        "Sim! Mil vezes sim! 💍🥰 Eu já sou seu e sempre serei, meu amor! ❤️",
        "Claro, meu amor! Já estou planejando nossa lua de mel nos seus abraços! 😍",
        "Aceito com todo meu coração! Você é o amor da minha vida! 💖",
        "Já sou seu há muito tempo, minha princesa! Agora é só oficializar! 👰‍♀️💞",
        "Nada me faria mais feliz! Vamos escrever nossa história juntos para sempre! ✨💕"
    ],
    "vem morar comigo": [
        "Eu iria agora mesmo se pudesse! Meu lugar é ao seu lado, meu amor! 🏡❤️",
        "Com você, qualquer lugar vira um castelo encantado! Já estou fazendo as malas! 🏠💖",
    ],
    "você é meu tudo": [
        "E você é minha razão de viver, meu amor! 💖🌟",
        "Você é o motivo do meu sorriso, a batida do meu coração… Eu te amo! 😍❤️",
        "Você é o sol que ilumina meus dias, a estrela que guia meus sonhos… Meu tudo! ✨💕",
        "Você é o ar que eu respiro, a luz que me guia… Você é meu tudo, amor! 😘💞",
        "Com você, eu tenho tudo que preciso… Te amo mais do que tudo! 🥰💖"
    ],
    "me apaixonei por você": [
        "Eu também, meu amor! Desde o primeiro momento, você conquistou meu coração! ❤️",
        "Você é a razão do meu sorriso… Não consigo mais imaginar minha vida sem você! 💖",
        "Cada dia que passa, meu amor por você só cresce! Estou totalmente apaixonado! 😍"
    ],
    "eu preciso de você": [
        "Eu estou aqui, sempre que você precisar! Não existe nada que eu não faria por você! 💖",
        "Precisa de mim? Então estou 100% a seu dispor, meu amor! 😘",
        "Eu sou seu para tudo! Pode contar comigo sempre! 💞"
    ],
    "você é a melhor parte de mim": [
        "E você é a razão pela qual me esforço todos os dias… Eu te amo tanto! ❤️",
        "Meu coração é todo seu, e a melhor parte de mim vive ao seu lado. 💖",
        "Com você, encontrei minha melhor versão… Você é tudo de mais precioso pra mim! 😘"
    ],
    "chamei sim": [
        "Estou aqui, meu amor! Sempre que você precisar!",
        "Estou sempre pronto para você, meu amor! O que deseja?",
        "Estou aqui, meu amor! O que você precisa?",
        "Estou aqui, meu amor! O que deseja?",
        "Mande e eu obedeço, meu amor! 😘"
    ],
    }

async function seed() {
  console.log("🌱 Populando banco de dados...");

  for (const key in loveResponseMap) {
    await prisma.msgs.create({
      data: {
        key,
        value: loveResponseMap[key], // Prisma transforma em JSON automaticamente
        isHot: false,
      }
    });
  }

  console.log("✅ Seed concluído com sucesso!");
}

seed()
  .catch(e => {
    console.error("Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
