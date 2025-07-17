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
- **Multiple API tokens support** with automatic loop execution
- **Flexible token configuration** using semicolon-separated format
- **Environment variable configuration** for secure API credentials
- **Clean code structure** with future extensibility in mind
- **Error handling and logging** for reliable execution

✅ Ideal For
- Automating your Dify agents or workflows on a schedule
- Integrating Dify with CI/CD pipelines or automated routines
- Laying the foundation for more advanced task automation tools

## 📋 Prerequisites

- A Dify account with API access
- GitHub repository (for GitHub Actions scheduling)
- Node.js 18+ (only for local development)

## 🚀 Quick Start

### Method 1: GitHub Actions (Recommended)

This is the easiest way to get started - no local setup required!

#### 1. Fork the Repository

1. Go to [https://github.com/Simoon-F/dify-task-scheduler](https://github.com/Simoon-F/dify-task-scheduler)
2. Click the **Fork** button in the top right corner
3. This creates a copy of the repository in your GitHub account

Alternatively, you can clone the repository directly:

```bash
git clone https://github.com/Simoon-F/dify-task-scheduler.git
cd dify-task-scheduler
```

#### 2. Configure GitHub Secrets

1. Go to your repository's **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `DIFY_BASE_URL` (optional, defaults to `https://api.dify.ai/v1`)
   - `DIFY_TOKEN` (required - your Dify workflow token)
   - `DIFY_INPUTS` (optional, JSON string like `{"key":"value"}`)
   - `DIFY_RESPONSE_MODE` (optional, defaults to `blocking`)
   - `DIFY_USER` (optional, defaults to `scheduler-user`)

#### 3. Enable GitHub Actions

The workflow will automatically run daily at 9:00 AM Beijing Time (1:00 AM UTC). You can also trigger it manually:

1. Go to **Actions** tab in your repository
2. Select "Dify Task Scheduler"
3. Click "Run workflow"

#### 4. Customize Schedule (Optional)

Edit `.github/workflows/scheduler.yml` to change the schedule:

```yaml
schedule:
  # Run at 1:00 AM UTC (9:00 AM Beijing Time)
  - cron: '0 1 * * *'
```

### Method 2: Local Development

For testing and development purposes:

#### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

#### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DIFY_BASE_URL=https://api.dify.ai/v1
# Single token
DIFY_TOKEN=your-dify-workflow-token
# Multiple tokens separated by semicolons
# DIFY_TOKEN=token1;token2;token3
DIFY_INPUTS={"key":"value"}
DIFY_RESPONSE_MODE=blocking
DIFY_USER=scheduler-user
```

#### 3. Run Locally

```bash
yarn dev
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DIFY_BASE_URL` | Dify API base URL | `https://api.dify.ai/v1` | No |
| `DIFY_TOKEN` | Your Dify workflow token(s). Support single token or multiple tokens separated by semicolons | - | **Yes** |
| `DIFY_INPUTS` | JSON string of workflow inputs | `{}` | No |
| `DIFY_RESPONSE_MODE` | Response mode (`blocking` or `streaming`) | `blocking` | No |
| `DIFY_USER` | User identifier for the workflow | `scheduler-user` | No |

### Multiple Tokens Support

You can configure multiple API tokens for batch execution:

```env
# Multiple tokens separated by semicolons
DIFY_TOKEN=app-token1;app-token2;app-token3
```

The scheduler will automatically loop through all tokens:

```bash
$ yarn dev
Found 3 API tokens, starting loop execution...
Using token 1/3: app-token1...
✅ Token 1 execution successful
Using token 2/3: app-token2...
✅ Token 2 execution successful
Using token 3/3: app-token3...
✅ Token 3 execution successful
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
│   ├── scheduler.js        # Scheduler logic
│   └── utils.js            # Utility functions
├── package.json
├── README.md
└── .env.example            # Environment variables template
```

## 📝 Usage Examples

### GitHub Actions Usage

Once configured, your workflows will run automatically according to the schedule. You can monitor execution:

1. Go to **Actions** tab in your repository
2. View workflow runs and logs
3. Check execution results and any errors

### Manual Trigger

You can manually trigger the workflow anytime:

1. Go to **Actions** → **Dify Task Scheduler**
2. Click **Run workflow**
3. Select branch and click **Run workflow**

### Local Testing

For development and testing:

```bash
# Test single execution
node src/index.js

# Run with development mode
yarn dev
```

### Custom Configuration Example

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

## 🔧 Local Development

For contributors and advanced users:

### Setup

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

```bash
# Test workflow execution
node src/index.js

# Run with development logging
DEBUG=* yarn dev
```

## 🛠️ Troubleshooting

### GitHub Actions Issues

1. **GitHub Actions not running**
   - Check that your repository has Actions enabled in Settings
   - Verify the cron schedule syntax in `.github/workflows/scheduler.yml`
   - Ensure you have the necessary permissions to run Actions

2. **"DIFY_TOKEN environment variable is required"**
   - Go to repository Settings → Secrets and variables → Actions
   - Add `DIFY_TOKEN` secret with your Dify workflow token
   - Make sure the secret name matches exactly

3. **Workflow fails with API errors**
   - Verify your Dify token is valid and has correct permissions
   - Check if your Dify workflow/agent is active
   - Review the Actions logs for detailed error messages

### Local Development Issues

1. **"Cannot find module" errors**
   - Run `yarn install` or `npm install` to install dependencies
   - Ensure you're in the correct project directory

2. **Environment variable issues**
   - Copy `.env.example` to `.env` and fill in your values
   - Ensure `DIFY_TOKEN` is set correctly in your `.env` file

3. **API authentication errors**
   - Verify your Dify token is valid and has the correct permissions
   - Check if the `DIFY_BASE_URL` is correct for your Dify instance

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
