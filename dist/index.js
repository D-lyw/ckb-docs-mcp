import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpServer } from './mcpServer.js';
async function main() {
    try {
        const { server } = await createMcpServer();
        const transport = new StdioServerTransport();
        console.error('Starting CKB Docs MCP Server...');
        await server.connect(transport);
        console.error('CKB Docs MCP Server successfully connected and running on stdio');
        // 添加优雅退出的处理
        process.on('SIGINT', () => {
            console.error('Received SIGINT. Shutting down...');
            process.exit(0);
        });
        process.on('SIGTERM', () => {
            console.error('Received SIGTERM. Shutting down...');
            process.exit(0);
        });
    }
    catch (error) {
        console.error('Fatal error while starting MCP server:', error);
        process.exit(1);
    }
}
main().catch((error) => {
    console.error('Unexpected error in main():', error);
    process.exit(1);
});
