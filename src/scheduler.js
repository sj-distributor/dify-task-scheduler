const { config } = require('./config');
const { DifyWorkflowTask } = require('./tasks/dify-workflow');

async function startScheduler() {
  const results = [];

  for (const token of config.difyTokens) {
    const task = new DifyWorkflowTask(token);
    await task.run();
    results.push(task.toString());
  }

  console.log('Dify Scheduler Results:\n', results.join('\n-----\n'));
}

module.exports = { startScheduler };