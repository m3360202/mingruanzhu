import axios from 'axios';

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface DeepSeekErrorResponse {
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
}

class DeepSeekClient {
  private apiKey: string;
  private baseURL: string;
  private axiosInstance;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_KEY || '';
    this.baseURL = process.env.NEXT_PUBLIC_DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
    
    if (!this.apiKey) {
      console.warn('DeepSeek API key not found. Please set NEXT_PUBLIC_DEEPSEEK_KEY in your environment variables.');
    }

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 180000, // 增加到180秒超时 (3分钟)
    });
  }

  // 重试机制
  private async retryRequest<T>(
    requestFn: () => Promise<T>, 
    maxRetries: number = 2, // 增加重试次数到2次
    delay: number = 3000 // 减少延迟到3秒
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`API请求尝试 ${attempt}/${maxRetries}`);
        return await requestFn();
      } catch (error) {
        console.error(`尝试 ${attempt} 失败:`, error instanceof Error ? error.message : error);
        
        if (attempt === maxRetries) {
          console.error('已达到最大重试次数，抛出错误');
          throw error;
        }
        
        // 根据错误类型决定是否重试
        if (axios.isAxiosError(error)) {
          // 对于某些错误类型，不进行重试
          if (error.response?.status === 401 || error.response?.status === 400) {
            console.log('认证或参数错误，不进行重试');
            throw error;
          }
        }
        
        console.log(`等待 ${delay}ms 后重试...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 1.5; // 增加延迟倍数
      }
    }
    throw new Error('Max retries exceeded');
  }

  async generateCode(prompt: string, systemPrompt?: string, totalPages?: number, currentPage?: number): Promise<string> {
    return this.retryRequest(async () => {
      try {
        const messages: DeepSeekMessage[] = [];
        
        if (systemPrompt) {
          messages.push({
            role: 'system',
            content: systemPrompt
          });
        }

        // 如果提供了页数信息，在用户消息中添加页数上下文
        let enhancedPrompt = prompt;
        if (totalPages && currentPage) {
          enhancedPrompt = `${prompt}\n\n页数信息：当前生成第 ${currentPage} 页，总共需要生成 ${totalPages} 页代码。`;
        }

        messages.push({
          role: 'user',
          content: enhancedPrompt
        });

        const request: DeepSeekRequest = {
          model: 'deepseek-chat',
          messages,
          temperature: 0.3,
          max_tokens: 3000, // 减少token数量以提高响应速度
          stream: false
        };

        console.log('发送DeepSeek API请求:', {
          model: request.model,
          messagesCount: messages.length,
          temperature: request.temperature,
          max_tokens: request.max_tokens,
          promptLength: prompt.length,
          totalPages: totalPages || '未指定',
          currentPage: currentPage || '未指定'
        });

        const startTime = Date.now();
        const response = await this.axiosInstance.post<DeepSeekResponse>('/v1/chat/completions', request);
        const endTime = Date.now();
        
        console.log(`API请求完成，耗时: ${endTime - startTime}ms`);
        
        if (response.data.choices && response.data.choices.length > 0) {
          const rawContent = response.data.choices[0].message.content;
          // 清理响应内容，去掉多余的说明文字
          const cleanedContent = this.cleanCodeResponse(rawContent);
          console.log(`生成内容长度: ${cleanedContent.length} 字符`);
          return cleanedContent;
        } else {
          throw new Error('DeepSeek API返回空响应');
        }
      } catch (error) {
        console.error('DeepSeek API详细错误:', error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            throw new Error('DeepSeek API认证失败，请检查API密钥是否正确');
          } else if (error.response?.status === 429) {
            throw new Error('DeepSeek API请求频率限制，请稍后重试');
          } else if (error.response?.status === 500) {
            throw new Error('DeepSeek API服务器内部错误，请稍后重试');
          } else if (error.code === 'ECONNABORTED') {
            throw new Error(`DeepSeek API请求超时 (${this.axiosInstance.defaults.timeout}ms)，请检查网络连接或稍后重试`);
          } else if (error.response?.status === 400) {
            const errorData = error.response?.data as DeepSeekErrorResponse;
            throw new Error(`DeepSeek API请求参数错误: ${errorData?.error?.message || '请检查模型参数'}`);
          } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            throw new Error('无法连接到DeepSeek API服务器，请检查网络连接');
          } else {
            throw new Error(`DeepSeek API请求失败 (${error.response?.status}): ${error.response?.statusText || error.message}`);
          }
        }
        throw new Error('DeepSeek API请求失败，请检查网络连接和API配置');
      }
    }, 2); // 改为重试2次
  }

  // 新增：清理代码响应内容
  private cleanCodeResponse(rawContent: string): string {
    let content = rawContent.trim();
    
    // 移除markdown代码块标记
    content = content.replace(/^```[\w]*\n?/gm, '');
    content = content.replace(/\n?```$/gm, '');
    
    // 移除常见的说明性前缀
    const prefixesToRemove = [
      /^以下是.*?代码[:：]\s*/i,
      /^这是.*?代码[:：]\s*/i,
      /^根据.*?生成的代码[:：]\s*/i,
      /^为.*?生成的代码[:：]\s*/i,
      /^代码如下[:：]\s*/i,
      /^以下是完整的.*?代码[:：]\s*/i,
      /^这里是.*?代码[:：]\s*/i,
      /^下面是.*?代码[:：]\s*/i,
      /^以下是.*?的实现[:：]\s*/i,
      /^这是.*?的实现[:：]\s*/i
    ];
    
    for (const prefix of prefixesToRemove) {
      content = content.replace(prefix, '');
    }
    
    // 移除常见的说明性后缀
    const suffixesToRemove = [
      /\n\n这个代码.*$/i,
      /\n\n以上代码.*$/i,
      /\n\n代码说明.*$/i,
      /\n\n注意事项.*$/i,
      /\n\n使用方法.*$/i,
      /\n\n该代码.*$/i
    ];
    
    for (const suffix of suffixesToRemove) {
      content = content.replace(suffix, '');
    }
    
    // 移除多余的空行（保留适当的空行）
    content = content.replace(/\n{4,}/g, '\n\n\n');
    
    // 如果内容以说明性文字开头，尝试找到实际代码开始的位置
    const codeStartPatterns = [
      /^[^\/\*#\n]*\n(\/\*|\/\/|#|package|import|using|from|class|interface|function|def|var|let|const)/m,
      /^[^<\n]*\n(<\?|<!|<html|<script)/m,  // HTML/XML
      /^[^{}\n]*\n\{/m,  // JSON或配置文件
      /^[^-\n]*\n(-{3,}|CREATE|DROP|SELECT|INSERT)/mi  // SQL
    ];
    
    for (const pattern of codeStartPatterns) {
      const match = content.match(pattern);
      if (match && match.index !== undefined) {
        const actualCodeStart = match.index + match[0].indexOf(match[1]);
        content = content.substring(actualCodeStart);
        break;
      }
    }
    
    return content.trim();
  }

  async generateDocumentation(prompt: string, systemPrompt?: string): Promise<string> {
    return this.retryRequest(async () => {
      try {
        const messages: DeepSeekMessage[] = [];
        
        if (systemPrompt) {
          messages.push({
            role: 'system',
            content: systemPrompt
          });
        }

        messages.push({
          role: 'user',
          content: prompt
        });

        const request: DeepSeekRequest = {
          model: 'deepseek-chat', // 改为deepseek-chat
          messages,
          temperature: 0.2,
          max_tokens: 6000,
          stream: false
        };

        const response = await this.axiosInstance.post<DeepSeekResponse>('/v1/chat/completions', request);
        
        if (response.data.choices && response.data.choices.length > 0) {
          return response.data.choices[0].message.content;
        } else {
          throw new Error('No response from DeepSeek API');
        }
      } catch (error) {
        console.error('DeepSeek API Error:', error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            throw new Error('DeepSeek API认证失败，请检查API密钥是否正确');
          } else if (error.response?.status === 429) {
            throw new Error('DeepSeek API请求频率限制，请稍后重试');
          } else if (error.response?.status === 500) {
            throw new Error('DeepSeek API服务器错误，请稍后重试');
          } else if (error.code === 'ECONNABORTED') {
            throw new Error('DeepSeek API请求超时，请检查网络连接或稍后重试');
          } else if (error.response?.status === 400) {
            const errorData = error.response?.data as DeepSeekErrorResponse;
            throw new Error(`DeepSeek API请求参数错误: ${errorData?.error?.message || '请检查模型参数'}`);
          } else {
            throw new Error(`DeepSeek API请求失败: ${error.response?.statusText || error.message}`);
          }
        }
        throw new Error('DeepSeek API请求失败，请检查网络连接和API配置');
      }
    }, 1); // 只重试1次
  }

  // 检查API连接状态
  async checkConnection(): Promise<boolean> {
    try {
      const testRequest: DeepSeekRequest = {
        model: 'deepseek-chat', // 改为deepseek-chat
        messages: [
          {
            role: 'user',
            content: 'Hello'
          }
        ],
        max_tokens: 10
      };

      await this.axiosInstance.post('/v1/chat/completions', testRequest);
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  // 获取API状态信息
  getApiInfo(): { hasApiKey: boolean; baseURL: string } {
    return {
      hasApiKey: !!this.apiKey,
      baseURL: this.baseURL
    };
  }

  // 新增：API连接诊断
  async diagnoseConnection(): Promise<{
    status: 'success' | 'error';
    message: string;
    details?: string;
  }> {
    try {
      console.log('开始诊断DeepSeek API连接...');
      
      // 检查API密钥
      if (!this.apiKey) {
        return {
          status: 'error',
          message: 'API密钥未配置',
          details: '请在环境变量中设置 NEXT_PUBLIC_DEEPSEEK_KEY'
        };
      }

      // 测试简单的API调用
      const testRequest: DeepSeekRequest = {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: 'Hello, please respond with just "OK".'
          }
        ],
        max_tokens: 10,
        temperature: 0.1
      };

      console.log('发送测试请求...');
      const startTime = Date.now();
      const response = await this.axiosInstance.post<DeepSeekResponse>('/v1/chat/completions', testRequest);
      const endTime = Date.now();

      if (response.data.choices && response.data.choices.length > 0) {
        return {
          status: 'success',
          message: '✅ API连接正常',
          details: `响应时间: ${endTime - startTime}ms, 内容: "${response.data.choices[0].message.content.trim()}"`
        };
      } else {
        return {
          status: 'error',
          message: '❌ API返回空响应',
          details: 'API调用成功但未返回有效内容'
        };
      }
    } catch (error) {
      console.error('API诊断失败:', error);
      
      let errorMessage = '❌ API连接失败';
      let errorDetails = '';

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = '❌ API认证失败';
          errorDetails = 'API密钥无效或已过期，请检查 NEXT_PUBLIC_DEEPSEEK_KEY';
        } else if (error.response?.status === 429) {
          errorMessage = '❌ API请求频率限制';
          errorDetails = '请求过于频繁，请稍后重试';
        } else if (error.response?.status === 500) {
          errorMessage = '❌ API服务器错误';
          errorDetails = 'DeepSeek服务器内部错误，请稍后重试';
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = '❌ API请求超时';
          errorDetails = `请求超时 (${this.axiosInstance.defaults.timeout}ms)，请检查网络连接`;
        } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
          errorMessage = '❌ 无法连接到API服务器';
          errorDetails = '请检查网络连接和防火墙设置';
        } else {
          errorMessage = '❌ API请求失败';
          errorDetails = `状态码: ${error.response?.status}, 错误: ${error.response?.statusText || error.message}`;
        }
      } else {
        errorDetails = error instanceof Error ? error.message : '未知错误';
      }

      return {
        status: 'error',
        message: errorMessage,
        details: errorDetails
      };
    }
  }
}

export default DeepSeekClient; 