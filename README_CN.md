# dify-task-scheduler

[![Language JavaScript](https://img.shields.io/badge/Language-JavaScript-blue.svg)](https://github.com/sj-distributor/create-react-boilerplates)
[![License MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Simoon-F/dify-task-scheduler/blob/master/LICENSE)
[![Author Simoon Feng](https://img.shields.io/badge/Author-Simoon%20Feng-blue.svg)](https://github.com/Simoon-F)

---

`dify-task-scheduler` 是一个轻量级的定时任务工具，专为自动化调用 Dify 工作流 API 而设计。

项目旨在通过简单配置，实现 Dify 工作流的定时触发，为自动化运营或 CI/CD 场景打下基础。

🚀 特性
- **基于 cron 的定时调度**，使用 GitHub Actions（或自托管 Node 运行时）
- **多 API 密钥支持**，自动循环执行
- **灵活的密钥配置**，支持分号分隔格式
- **环境变量配置**，安全的 API 凭证管理
- **清晰的代码结构**，便于后续扩展与维护
- **错误处理和日志记录**，确保可靠执行

✅ 适合人群
- 希望定时触发 Dify agent / workflow 的开发者或团队
- 自动化运营、数据任务触发
- 希望构建更完整自动化系统的基础组件

## 📋 前置要求

- 拥有 API 访问权限的 Dify 账户
- GitHub 仓库（用于 GitHub Actions 调度）
- Node.js 18+（仅本地开发需要）

## 🚀 快速开始

### 方法一：GitHub Actions（推荐）

这是最简单的开始方式 - 无需本地环境配置！

#### 1. Fork 仓库

1. 访问 [https://github.com/Simoon-F/dify-task-scheduler](https://github.com/Simoon-F/dify-task-scheduler)
2. 点击右上角的 **Fork** 按钮
3. 这会在你的 GitHub 账户中创建仓库副本

或者，你也可以直接克隆仓库：

```bash
git clone https://github.com/Simoon-F/dify-task-scheduler.git
cd dify-task-scheduler
```

#### 2. 配置 GitHub Secrets

1. 进入你的仓库的 **Settings** → **Secrets and variables** → **Actions** -> **Environment secrets**
2. 添加以下 secrets：
   - `DIFY_BASE_URL`（可选，默认为 `https://api.dify.ai/v1`）
   - `DIFY_TOKEN`（必需 - 你的 Dify 工作流 token）
   - `DIFY_INPUTS`（可选，JSON 字符串如 `{"key":"value"}`）
   - `DIFY_RESPONSE_MODE`（可选，默认为 `blocking`）
   - `DIFY_USER`（可选，默认为 `scheduler-user`）

#### 3. 启用 GitHub Actions

工作流将自动在每天北京时间上午 9:00（UTC 凌晨 1:00）运行。你也可以手动触发：

1. 进入仓库的 **Actions** 标签页
2. 选择 "Dify Task Scheduler"
3. 点击 "Run workflow"

#### 4. 自定义调度时间（可选）

编辑 `.github/workflows/scheduler.yml` 来修改调度时间：

```yaml
schedule:
  # 在 UTC 凌晨 1:00 运行（北京时间上午 9:00）
  - cron: '0 1 * * *'
```

### 方法二：本地开发

用于测试和开发目的：

#### 1. 安装依赖

```bash
npm install
# 或者
yarn install
```

#### 2. 配置环境变量

在根目录创建 `.env` 文件：

```env
DIFY_BASE_URL=https://api.dify.ai/v1
# 单个密钥
DIFY_TOKEN=your-dify-workflow-token
# 多个密钥用分号分隔
# DIFY_TOKEN=token1;token2;token3
DIFY_INPUTS={"key":"value"}
DIFY_RESPONSE_MODE=blocking
DIFY_USER=scheduler-user
```

#### 3. 本地运行

```bash
yarn dev
```

## ⚙️ 配置说明

### 环境变量

| 变量名 | 描述 | 默认值 | 是否必需 |
|--------|------|--------|----------|
| `DIFY_BASE_URL` | Dify API 基础 URL | `https://api.dify.ai/v1` | 否 |
| `DIFY_TOKEN` | 你的 Dify 工作流 token，支持单个密钥或用分号分隔的多个密钥 | - | **是** |
| `DIFY_INPUTS` | 工作流输入参数的 JSON 字符串 | `{}` | 否 |
| `DIFY_RESPONSE_MODE` | 响应模式（`blocking` 或 `streaming`） | `blocking` | 否 |
| `DIFY_USER` | 工作流的用户标识符 | `scheduler-user` | 否 |

### 多密钥支持

你可以配置多个 API 密钥进行批量执行：

```env
# 多个密钥用分号分隔
DIFY_TOKEN=app-token1;app-token2;app-token3
```

调度器会自动循环遍历所有密钥：

```bash
$ yarn dev
发现 3 个API密钥，开始循环调用...
正在使用第 1/3 个API密钥: app-token1...
✅ 第 1 个API密钥调用成功
正在使用第 2/3 个API密钥: app-token2...
✅ 第 2 个API密钥调用成功
正在使用第 3/3 个API密钥: app-token3...
✅ 第 3 个API密钥调用成功
```

## 📁 项目结构

```
dify-task-scheduler/
├── .github/
│   └── workflows/
│       └── scheduler.yml    # GitHub Actions 工作流
├── src/
│   ├── config.js           # 环境配置
│   ├── dify-api.js         # Dify API 客户端
│   ├── dify-workflow.js    # 工作流任务类
│   ├── index.js            # 主入口点
│   ├── scheduler.js        # 调度器逻辑
│   └── utils.js            # 工具函数
├── package.json
├── README.md
└── .env.example            # 环境变量模板
```

## 📝 使用示例

### GitHub Actions 使用

配置完成后，你的工作流将按照调度自动运行。你可以监控执行情况：

1. 进入仓库的 **Actions** 标签页
2. 查看工作流运行记录和日志
3. 检查执行结果和任何错误

### 手动触发

你可以随时手动触发工作流：

1. 进入 **Actions** → **Dify Task Scheduler**
2. 点击 **Run workflow**
3. 选择分支并点击 **Run workflow**

### 本地测试

用于开发和测试：

```bash
# 测试单次执行
node src/index.js

# 运行开发模式
yarn dev
```

### 自定义配置示例

```javascript
const { startScheduler } = require('./src/scheduler');

async function runWorkflow() {
  try {
    await startScheduler();
    console.log('工作流执行成功');
  } catch (error) {
    console.error('工作流执行失败:', error);
  }
}

runWorkflow();
```

## 🔧 本地开发

适用于贡献者和高级用户：

### 设置

1. 复制环境变量：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，填入你的 Dify 凭证

3. 运行调度器：
   ```bash
   yarn dev
   ```

### 测试

```bash
# 测试工作流执行
node src/index.js

# 运行开发日志模式
DEBUG=* yarn dev
```

## 🛠️ 故障排除

### GitHub Actions 问题

1. **GitHub Actions 未运行**
   - 检查仓库设置中是否启用了 Actions
   - 验证 `.github/workflows/scheduler.yml` 中的 cron 调度语法
   - 确保你有运行 Actions 的必要权限

2. **"DIFY_TOKEN environment variable is required"**
   - 进入仓库设置 → Secrets and variables → Actions
   - 添加 `DIFY_TOKEN` 密钥，填入你的 Dify 工作流 token
   - 确保密钥名称完全匹配

3. **工作流执行失败，出现 API 错误**
   - 验证你的 Dify token 是否有效且具有正确权限
   - 检查你的 Dify 工作流/智能体是否处于活跃状态
   - 查看 Actions 日志获取详细错误信息

### 本地开发问题

1. **"Cannot find module" 错误**
   - 运行 `yarn install` 或 `npm install` 安装依赖
   - 确保你在正确的项目目录中

2. **环境变量问题**
   - 将 `.env.example` 复制为 `.env` 并填入你的值
   - 确保 `.env` 文件中正确设置了 `DIFY_TOKEN`

3. **API 认证错误**
   - 验证你的 Dify token 是否有效且具有正确的权限
   - 检查 `DIFY_BASE_URL` 是否对应你的 Dify 实例

## 🤝 贡献指南

1. Fork 这个仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交你的更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 打开一个 Pull Request

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [Dify 官方网站](https://dify.ai/)
- [Dify API 文档](https://docs.dify.ai/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

## 📞 支持

如果你遇到任何问题或有疑问：

1. 查看 [Issues](https://github.com/Simoon-F/dify-task-scheduler/issues) 页面
2. 创建一个包含详细信息的新 issue