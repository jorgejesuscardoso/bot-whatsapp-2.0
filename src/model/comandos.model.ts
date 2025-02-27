import { PrismaClient } from "@prisma/client";

class ComandosModel {
    private prisma: PrismaClient

    constructor(
        prisma: PrismaClient
    ) {
        this.prisma = prisma
    }

    async getMsgRomantics(key: string) {
        try {
            const mensagens = await this.prisma.msgs.findFirst({
                where: {
                    key
                }
            })

            if (!mensagens) {
                return { text: 'Mensagem não encontrada' }
            }
            return mensagens
        } catch {
            throw new Error('Erro ao buscar mensagens românticas')
        }
    }

}

export default ComandosModel