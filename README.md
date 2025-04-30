# CKB 文档 MCP 服务器

这是一个基于 Model Context Protocol (MCP) 的服务器，提供 CKB 生态相关文档和代码的搜索功能。该服务器通过连接到 CKB 的文档和代码向量数据库，使用语义搜索技术提供高质量的搜索结果。

## 功能

- 提供 MCP 工具接口，支持搜索 CKB 相关文档和代码

### 集成示例

```json
{
  "mcpServers": {
    "ckb-docs-mcp": {
      "command": "npx",
      "args": ["-y", "ckb-docs-mcp@latest"],
      "env": {
        "OPENAI_API_KEY": "set your openai api key here"
      }
    }
  }
}
```

## 开发环境设置

### 先决条件

- Node.js (>= 18.x)
- pnpm (>= 8.x)

### 安装

```bash
# 克隆仓库
git clone https://github.com/D-lyw/ckb-docs-mcp.git
cd ckb-docs-mcp

# 安装依赖
pnpm install
```

### 开发模式运行

```bash
pnpm dev
```

### 构建和生产模式运行

```bash
# 构建项目
pnpm build

# 运行生产模式
pnpm start
```

## MCP 工具

### ckb_docs_search

搜索 CKB 生态相关文档和代码。

**参数:**

- `query` (string, 必需): 搜索查询文本
- `limit` (number, 可选): 要返回的结果数，默认为 8
