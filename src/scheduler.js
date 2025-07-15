const { config } = require('./config');
const { DifyWorkflowTask } = require('./dify-workflow');
const { maskToken } = require('./utils');

async function startScheduler() {
  if (config.difyTokens.length === 0) {
    console.error('Error: DIFY_TOKEN environment variable is required');
    return;
  }

  console.log(`Found ${config.difyTokens.length} API tokens, starting loop execution...`);
  
  const results = [];
  
  for (let i = 0; i < config.difyTokens.length; i++) {
    const token = config.difyTokens[i];
    console.log(`Using token ${i + 1}/${config.difyTokens.length}: ${maskToken(token)}`);
    
    const task = new DifyWorkflowTask(token);
    const result = await task.run();
    
    results.push({
      token: maskToken(token),
      ...result
    });
    
    if (result.success) {
      console.log(`✅ Token ${i + 1} execution successful`);
    } else {
      console.error(`❌ Token ${i + 1} execution failed:`, result.error);
    }
  }
  
  // Output summary results
  console.log('\n=== Loop Execution Results Summary ===');
  results.forEach((result, index) => {
    console.log(`\nAPI Token ${index + 1} (${result.token}):`);
    if (result.success) {
      console.log('✅ Success:', result.result);
    } else {
      console.log('❌ Failed:', result.error);
    }
  });
  
  return results;
}

module.exports = { startScheduler };