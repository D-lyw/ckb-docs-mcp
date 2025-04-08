import { MastraClient } from "@mastra/client-js";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
const VECTOR_STORE_NAME = "pgVector";
const VECTOR_INDEX_NAME = "ckb_docs_embeddings";
const EMBEDDING_MODEL = "text-embedding-3-small";
const MASTRA_BASE_URL = "https://agent.nervepuppy.xyz";
export class NervePuppyService {
    client;
    vectorStore;
    constructor() {
        this.client = new MastraClient({
            baseUrl: MASTRA_BASE_URL,
        });
        this.vectorStore = this.client.getVector(VECTOR_STORE_NAME);
    }
    async queryVector(query, k) {
        const { embedding } = await embed({
            value: query,
            model: openai.embedding(EMBEDDING_MODEL),
        });
        const results = await this.vectorStore.query({
            indexName: VECTOR_INDEX_NAME,
            topK: k,
            queryVector: embedding,
            filter: {},
            includeVector: true
        });
        return results;
    }
}
