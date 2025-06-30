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
    maxRetries: number = 1, // 减少重试次数避免过长等待
    delay: number = 5000 // 增加延迟到5秒
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`API请求尝试 ${attempt}/${maxRetries}`);
        return await requestFn();
      } catch (error) {
        console.error(`尝试 ${attempt} 失败:`, error instanceof Error ? error.message : error);
        
        if (attempt === maxRetries) {
          throw error;
        }
        
        console.log(`等待 ${delay}ms 后重试...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 1.2; // 轻微增加延迟
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
          const content = response.data.choices[0].message.content;
          console.log(`生成内容长度: ${content.length} 字符`);
          return content;
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
    }, 0); // 不重试，直接失败并使用fallback
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
}

export default DeepSeekClient; 