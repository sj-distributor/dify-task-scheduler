const { config } = require('./config');
const { DifyWorkflowTask } = require('./dify-workflow');

async function startScheduler() {
  if (!config.difyToken) {
    console.error('Error: DIFY_TOKEN environment variable is required');
    return;
  }

  const task = new DifyWorkflowTask(config.difyToken);
  await task.run();
  
  console.log('Dify Scheduler Result:\n', task.toString());
}

module.exports = { startScheduler };