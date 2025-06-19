# dify-task-scheduler

[![Language JavaScript](https://img.shields.io/badge/Language-JavaScript-blue.svg)](https://github.com/sj-distributor/create-react-boilerplates)
[![License MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Simoon-F/dify-task-scheduler/blob/master/LICENSE)
[![Author Simoon Feng](https://img.shields.io/badge/Author-Simoon%20Feng-blue.svg)](https://github.com/Simoon-F)


---

[![中文文档](https://img.shields.io/badge/中文文档-点击查看-red.svg)](https://github.com/Simoon-F/dify-task-scheduler/blob/master/README_CN.md)


`dify-task-scheduler` is a lightweight task scheduling tool designed to automatically trigger Dify workflows via API at predefined times.

It simplifies integration with Dify by enabling scheduled execution of agents or workflows using cron-like configurations.

🚀 Features
- **Cron-based scheduling** using GitHub Actions (or self-hosted Node runtime)
- **Single workflow support** with simplified token management
- **Environment variable configuration** for secure API credentials
- **Clean code structure** with future extensibility in mind
- **Error handling and logging** for reliable execution

✅ Ideal For
- Automating your Dify agents or workflows on a schedule
- Integrating Dify with CI/CD pipelines or automated routines
- Laying the foundation for more advanced task automation tools

## 📋 Prerequisites

- Node.js 18+ (for local development)
- A Dify account with API access
- GitHub repository (for GitHub Actions scheduling)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Simoon-F/dify-task-scheduler.git
cd dify-task-scheduler
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DIFY_BASE_URL=https://api.dify.ai/v1
DIFY_TOKEN=your-dify-workflow-token
DIFY_INPUTS={"key":"value"}
DIFY_RESPONSE_MODE=blocking
DIFY_USER=scheduler-user
```

### 4. Run Locally

```bash
yarn dev
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DIFY_BASE_URL` | Dify API base URL | `https://api.dify.ai/v1` | No |
| `DIFY_TOKEN` | Your Dify workflow token | - | **Yes** |
| `DIFY_INPUTS` | JSON string of workflow inputs | `{}` | No |
| `DIFY_RESPONSE_MODE` | Response mode (`blocking` or `streaming`) | `blocking` | No |
| `DIFY_USER` | User identifier for the workflow | `scheduler-user` | No |

### GitHub Actions Scheduling

The project includes a GitHub Actions workflow (`.github/workflows/scheduler.yml`) that runs automatically:

- **Schedule**: Daily at 9:00 AM Beijing Time (1:00 AM UTC)
- **Manual trigger**: Available via GitHub Actions UI

#### Setting up GitHub Secrets

1. Go to your repository's **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `DIFY_BASE_URL`
   - `DIFY_TOKEN`
   - `DIFY_INPUTS`
   - `DIFY_RESPONSE_MODE`
   - `DIFY_USER`

#### Customizing the Schedule

Edit `.github/workflows/scheduler.yml` to change the cron schedule:

```yaml
schedule:
  # Run at 1:00 AM UTC (9:00 AM Beijing Time)
  - cron: '0 1 * * *'
```

## 📁 Project Structure

```
dify-task-scheduler/
├── .github/
│   └── workflows/
│       └── scheduler.yml    # GitHub Actions workflow
├── src/
│   ├── config.js           # Environment configuration
│   ├── dify-api.js         # Dify API client
│   ├── dify-workflow.js    # Workflow task class
│   ├── index.js            # Main entry point
│   └── scheduler.js        # Scheduler logic
├── package.json
├── README.md
└── .env.example            # Environment variables template
```

## 🔧 Development

### Local Development

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your Dify credentials

3. Run the scheduler:
   ```bash
   yarn dev
   ```

### Testing

You can test the workflow execution manually:

```bash
node src/index.js
```

## 📝 Usage Examples

### Basic Workflow Execution

```javascript
const { startScheduler } = require('./src/scheduler');

async function runWorkflow() {
  try {
    await startScheduler();
    console.log('Workflow completed successfully');
  } catch (error) {
    console.error('Workflow failed:', error);
  }
}

runWorkflow();
```

### Custom Configuration

```javascript
const { DifyWorkflowTask } = require('./src/dify-workflow');

async function customWorkflow() {
  const task = new DifyWorkflowTask('your-token');
  await task.run();
  console.log('Result:', task.toString());
}
```

## 🛠️ Troubleshooting

### Common Issues

1. **"DIFY_TOKEN environment variable is required"**
   - Ensure you've set the `DIFY_TOKEN` in your `.env` file or GitHub Secrets

2. **"Cannot find module" errors**
   - Run `yarn install` to install dependencies

3. **API authentication errors**
   - Verify your Dify token is valid and has the correct permissions

4. **GitHub Actions not running**
   - Check that your repository has Actions enabled
   - Verify the cron schedule syntax

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Dify Official Website](https://dify.ai/)
- [Dify API Documentation](https://docs.dify.ai/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Simoon-F/dify-task-scheduler/issues) page
2. Create a new issue with detailed information
