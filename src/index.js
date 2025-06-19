const { startScheduler } = require('./scheduler');

async function main() {
  try {
    console.log('🚀 Starting Dify Task Scheduler...');
    await startScheduler();
    console.log('✅ Scheduler completed successfully');
  } catch (error) {
    console.error('❌ Scheduler failed:', error);
    process.exit(1);
  }
}

main();