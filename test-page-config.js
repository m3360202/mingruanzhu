// 页数配置测试脚本
console.log('=== 页数配置功能测试 ===\n');

// 模拟不同环境变量配置
const testConfigs = [
  {
    name: '正式模式（默认）',
    env: {},
    expectedPages: 30
  },
  {
    name: '测试模式 - NEXT_PUBLIC_TEST_MODE',
    env: { NEXT_PUBLIC_TEST_MODE: 'true' },
    expectedPages: 1
  },
  {
    name: '测试模式 - NEXT_PUBLIC_APP_ENV',
    env: { NEXT_PUBLIC_APP_ENV: 'test' },
    expectedPages: 1
  },
  {
    name: '测试模式 - NODE_ENV',
    env: { NODE_ENV: 'test' },
    expectedPages: 1
  }
];

// 测试页数配置逻辑
function getMinPages(env = {}) {
  const isTestMode = env.NODE_ENV === 'test' || 
                    env.NEXT_PUBLIC_APP_ENV === 'test' ||
                    env.NEXT_PUBLIC_TEST_MODE === 'true';
  
  const config = {
    min_pages: 30,
    test_min_pages: 1
  };
  
  if (isTestMode && config.test_min_pages !== undefined) {
    console.log(`  ✓ 测试模式：使用最小页数 ${config.test_min_pages}`);
    return config.test_min_pages;
  }
  
  console.log(`  ✓ 正常模式：使用最小页数 ${config.min_pages}`);
  return config.min_pages;
}

// 运行测试
testConfigs.forEach((testConfig, index) => {
  console.log(`${index + 1}. ${testConfig.name}:`);
  
  // 设置环境变量
  const originalEnv = { ...process.env };
  Object.assign(process.env, testConfig.env);
  
  const result = getMinPages(testConfig.env);
  const passed = result === testConfig.expectedPages;
  
  console.log(`  期望页数: ${testConfig.expectedPages}`);
  console.log(`  实际页数: ${result}`);
  console.log(`  测试结果: ${passed ? '✅ 通过' : '❌ 失败'}`);
  console.log('');
  
  // 恢复环境变量
  process.env = originalEnv;
});

console.log('=== 测试完成 ===');
console.log('\n使用说明:');
console.log('1. 正式环境：默认生成30页代码');
console.log('2. 测试环境：设置以下任一环境变量即可生成1页代码：');
console.log('   - NEXT_PUBLIC_TEST_MODE=true');
console.log('   - NEXT_PUBLIC_APP_ENV=test');
console.log('   - NODE_ENV=test');
console.log('\n在DeepSeek API请求中会包含页数信息：');
console.log('- 当前生成第 X 页，总共需要生成 Y 页代码');
console.log('- 这有助于AI更好地理解生成上下文'); 