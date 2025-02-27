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
exports.getCachedGroupMetadata = getCachedGroupMetadata;
const groupCache = new Map(); // Cache de metadados do grupo
// Função para buscar cache de metadados do grupo
function getCachedGroupMetadata(sock, groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (groupCache.has(groupId)) {
            return groupCache.get(groupId);
        }
        const metadata = yield getGroupMetadataSafe(sock, groupId);
        if (metadata) {
            groupCache.set(groupId, metadata);
            setTimeout(() => groupCache.delete(groupId), 60000); // Limpa cache após 1 minuto
        }
        return metadata;
    });
}
// Função para buscar metadados do grupo de forma segura
function getGroupMetadataSafe(sock, groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const controller = new AbortController(); // Controla o timeout
            const timeout = setTimeout(() => controller.abort(), 5000); // 5 segundos
            const metadata = yield sock.groupMetadata(groupId, { signal: controller.signal });
            clearTimeout(timeout); // Cancela o timeout se a resposta veio antes
            return metadata;
        }
        catch (error) {
            console.error(`Erro ao buscar metadados do grupo ${groupId}:`, error);
            return null; // Evita que o código quebre se falhar
        }
    });
}
