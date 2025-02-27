
const groupCache = new Map(); // Cache de metadados do grupo

// Função para buscar cache de metadados do grupo
export async function getCachedGroupMetadata(sock: any, groupId: string) {
    if (groupCache.has(groupId)) {
        return groupCache.get(groupId);
    }

    const metadata = await getGroupMetadataSafe(sock, groupId);
    if (metadata) {
        groupCache.set(groupId, metadata);
        setTimeout(() => groupCache.delete(groupId), 60000); // Limpa cache após 1 minuto
    }
    return metadata;
}

// Função para buscar metadados do grupo de forma segura
async function getGroupMetadataSafe(sock: any, groupId: string) {
    try {
        const controller = new AbortController(); // Controla o timeout
        const timeout = setTimeout(() => controller.abort(), 5000); // 5 segundos

        const metadata = await sock.groupMetadata(groupId, { signal: controller.signal });

        clearTimeout(timeout); // Cancela o timeout se a resposta veio antes
        return metadata;
    } catch (error) {
        console.error(`Erro ao buscar metadados do grupo ${groupId}:`, error);
        return null; // Evita que o código quebre se falhar
    }
}