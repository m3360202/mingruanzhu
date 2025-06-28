// 简单的DeepSeek API测试脚本
const axios = require('axios');

const API_KEY = 'sk-59b548226d934b3cb838b9fe57e285c8';
const BASE_URL = 'https://api.deepseek.com';

async function testDeepSeekAPI() {
  try {
    console.log('正在测试DeepSeek API连接...');
    
    const response = await axios.post(`${BASE_URL}/v1/chat/completions`, {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: 'Hello, please respond with a simple greeting.'
        }
      ],
      max_tokens: 50,
      temperature: 0.1
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000
    });

    console.log('✅ API连接成功！');
    console.log('响应:', response.data.choices[0].message.content);
    
  } catch (error) {
    console.error('❌ API连接失败:');
    
    if (error.response) {
      console.error('状态码:', error.response.status);
      console.error('错误信息:', error.response.data);
    } else if (error.request) {
      console.error('网络错误:', error.message);
    } else {
      console.error('其他错误:', error.message);
    }
  }
}

testDeepSeekAPI(); 