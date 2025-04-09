import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { NervePuppyService } from './services/nervePuppyService.js';
import { z } from 'zod';

export async function createMcpServer() {
  const nervePuppy = new NervePuppyService();

  // 创建 MCP 服务器
  const server = new McpServer({
    name: 'ckb-docs-mcp-server',
    version: "0.1.4",
  });

  // 定义工具
  server.tool(
    'ckb_docs_search',
    '搜索 CKB 生态相关所有文档和代码及示例',
    {
      query: z.string().describe('搜索查询文本'),
      limit: z.number().default(8).describe('要返回的结果数')
    },
    async ({ query, limit = 8 }) => {
      try {
        const { results } = await nervePuppy.queryVector(
          query,
          limit
        );
        const formattedResults = results.map(result => {
          const metadata = result.metadata || {};
          return {
            title: metadata.title || 'Unknown Title',
            url: metadata.url || '',
            content: metadata.content || '',
            score: result.score
          };
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(formattedResults, null, 2)
            }
          ]
        };
      } catch (error) {
        console.error('Error executing ckb_docs_search:', error);
        return {
          content: [
            {
              type: 'text',
              text: `搜索出错: ${error instanceof Error ? error.message : String(error)}`
            }
          ]
        };
      }
    }
  );

  return {
    server,
  };
} 