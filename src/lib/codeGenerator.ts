import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { SoftwareInfo, CodePage } from '../types/software';
import DeepSeekClient from './deepseek';

// YAML配置接口
interface CodeTemplate {
  name: string;
  description: string;
  min_lines: number;
  priority: number;
}

interface CategoryConfig {
  name: string;
  percentage: number;
  color: string;
  pages: number;
}

interface CodeGenerationConfig {
  min_pages: number;
  test_min_pages?: number;
  min_lines_per_page: number;
  categories: Record<string, CategoryConfig>;
  templates: Record<string, CodeTemplate[]>;
  prompts: {
    system_prompt: string;
    code_template: string;
    documentation_template: string;
  };
  generation: {
    batch_size: number;
    delay_between_batches: number;
    max_retries: number;
    timeout: number;
  };
}

// 进度回调接口
export interface GenerationProgress {
  current: number;
  total: number;
  currentPage: string;
  status: 'preparing' | 'generating' | 'completed' | 'error';
  message: string;
}

// 新增：代码上下文管理接口
interface CodeContext {
  // 项目架构信息
  projectStructure: {
    packageName: string;
    mainClassName: string;
    databaseSchema: string;
    apiPrefix: string;
  };
  
  // 已生成的代码摘要
  generatedSummaries: Array<{
    title: string;
    category: string;
    mainClasses: string[];
    mainMethods: string[];
    dependencies: string[];
    exports: string[];
  }>;
  
  // 共享的数据模型
  sharedModels: Array<{
    name: string;
    fields: string[];
    type: 'entity' | 'dto' | 'enum';
  }>;
  
  // API接口定义
  apiEndpoints: Array<{
    path: string;
    method: string;
    description: string;
  }>;
  
  // 数据库表结构
  databaseTables: Array<{
    name: string;
    fields: string[];
    relationships: string[];
  }>;
}

export class CodeGenerator {
  private deepSeekClient: DeepSeekClient;
  private config: CodeGenerationConfig;
  private codeContext: CodeContext; // 新增：上下文管理

  constructor() {
    this.deepSeekClient = new DeepSeekClient();
    this.config = this.loadConfig();
    this.codeContext = this.initializeContext();
  }

  // 新增：初始化代码上下文
  private initializeContext(): CodeContext {
    return {
      projectStructure: {
        packageName: 'com.example.app',
        mainClassName: 'Application',
        databaseSchema: 'app_db',
        apiPrefix: '/api/v1'
      },
      generatedSummaries: [],
      sharedModels: [],
      apiEndpoints: [],
      databaseTables: []
    };
  }

  // 新增：更新项目结构信息
  private updateProjectStructure(softwareInfo: SoftwareInfo) {
    const safeName = softwareInfo.softwareName.toLowerCase().replace(/[^a-z0-9]/g, '');
    this.codeContext.projectStructure = {
      packageName: `com.${safeName}.app`,
      mainClassName: `${safeName.charAt(0).toUpperCase() + safeName.slice(1)}Application`,
      databaseSchema: `${safeName}_db`,
      apiPrefix: '/api/v1'
    };
  }

  // 获取当前环境应该使用的最小页数
  private getMinPages(): number {
    const isTestMode = process.env.NODE_ENV === 'test' || 
                      process.env.NEXT_PUBLIC_APP_ENV === 'test' ||
                      process.env.NEXT_PUBLIC_TEST_MODE === 'true';
    
    if (isTestMode && this.config.test_min_pages !== undefined) {
      console.log(`测试模式：使用最小页数 ${this.config.test_min_pages}`);
      return this.config.test_min_pages;
    }
    
    console.log(`正常模式：使用最小页数 ${this.config.min_pages}`);
    return this.config.min_pages;
  }

  private loadConfig() {
    try {
      // 在实际项目中，这里应该从文件系统或API加载YAML配置
      // 这里直接内嵌配置内容
      const yamlContent = `
code_generation:
  min_pages: 30
  test_min_pages: 1
  min_lines_per_page: 50
  
  categories:
    backend:
      name: "后端代码"
      percentage: 50
      color: "success"
      pages: 15
    frontend:
      name: "前端代码"  
      percentage: 30
      color: "primary"
      pages: 9
    database:
      name: "数据库"
      percentage: 10
      color: "warning"
      pages: 3
    config:
      name: "配置文件"
      percentage: 10
      color: "info"
      pages: 3

  templates:
    backend:
      - name: "主应用入口"
        description: "应用程序主入口类，包含启动配置和初始化逻辑"
        min_lines: 80
        priority: 1
      - name: "用户管理控制器"
        description: "RESTful API接口控制器，处理用户相关的HTTP请求"
        min_lines: 70
        priority: 2
      - name: "用户服务层"
        description: "业务逻辑处理层，封装用户管理的核心业务逻辑"
        min_lines: 85
        priority: 2
      - name: "用户数据模型"
        description: "数据实体类，定义用户数据结构和数据库映射关系"
        min_lines: 65
        priority: 2
      - name: "数据访问层"
        description: "数据访问接口，提供数据库CRUD操作"
        min_lines: 75
        priority: 2
      - name: "权限管理控制器"
        description: "权限验证和授权管理的API接口"
        min_lines: 90
        priority: 3
      - name: "角色管理服务"
        description: "角色权限管理的业务逻辑处理"
        min_lines: 80
        priority: 3
      - name: "系统配置类"
        description: "系统参数配置和应用设置管理"
        min_lines: 70
        priority: 3
      - name: "异常处理器"
        description: "全局异常处理和错误响应管理"
        min_lines: 60
        priority: 3
      - name: "工具类库"
        description: "通用工具方法和辅助函数集合"
        min_lines: 95
        priority: 3
      - name: "数据验证器"
        description: "输入数据验证和格式检查逻辑"
        min_lines: 75
        priority: 4
      - name: "缓存管理器"
        description: "数据缓存策略和缓存操作管理"
        min_lines: 85
        priority: 4
      - name: "日志管理器"
        description: "系统日志记录和日志分析功能"
        min_lines: 70
        priority: 4
      - name: "文件上传处理"
        description: "文件上传下载和存储管理功能"
        min_lines: 80
        priority: 4
      - name: "消息队列处理"
        description: "异步消息处理和队列管理逻辑"
        min_lines: 90
        priority: 4

    frontend:
      - name: "主应用组件"
        description: "React应用主组件，包含路由和全局状态管理"
        min_lines: 75
        priority: 1
      - name: "用户管理页面"
        description: "用户列表展示和管理操作界面"
        min_lines: 85
        priority: 2
      - name: "用户表单组件"
        description: "用户信息录入和编辑表单组件"
        min_lines: 70
        priority: 2
      - name: "API服务层"
        description: "HTTP客户端封装，处理前端与后端API的通信"
        min_lines: 80
        priority: 2
      - name: "路由配置"
        description: "React Router路由配置，定义页面导航和访问控制"
        min_lines: 65
        priority: 2
      - name: "状态管理"
        description: "全局状态管理，管理应用数据和用户状态"
        min_lines: 90
        priority: 3
      - name: "权限组件"
        description: "权限验证和访问控制的前端组件"
        min_lines: 60
        priority: 3
      - name: "公共组件库"
        description: "可复用的UI组件集合和通用组件"
        min_lines: 95
        priority: 3
      - name: "数据表格组件"
        description: "数据展示和操作的表格组件"
        min_lines: 80
        priority: 4

    database:
      - name: "数据库初始化脚本"
        description: "数据库表结构创建和基础数据初始化"
        min_lines: 120
        priority: 1
      - name: "数据迁移脚本"
        description: "数据库版本升级和数据迁移脚本"
        min_lines: 80
        priority: 2
      - name: "存储过程"
        description: "复杂业务逻辑的数据库存储过程"
        min_lines: 90
        priority: 3

    config:
      - name: "应用配置文件"
        description: "应用程序配置参数和环境变量设置"
        min_lines: 60
        priority: 1
      - name: "部署配置"
        description: "Docker和部署相关的配置文件"
        min_lines: 70
        priority: 2
      - name: "构建配置"
        description: "项目构建和打包配置文件"
        min_lines: 55
        priority: 3

  prompts:
    system_prompt: |
      你是一个专业的软件开发专家，擅长根据需求生成高质量的代码。
      请根据用户提供的软件信息和功能描述，生成符合以下要求的代码：
      1. 代码必须完整可运行，包含所有必要的导入和依赖
      2. 代码风格规范，注释详细
      3. 包含适当的错误处理和异常管理
      4. 遵循最佳实践和设计模式
      5. 代码行数不少于{min_lines}行
      6. 包含详细的功能说明和技术文档

    code_template: |
      请为"{software_name}"软件生成"{module_name}"模块的代码。
      
      软件信息：
      - 软件名称: {software_name}
      - 开发语言: {development_language}
      - 数据库: {database}
      - 平台: {platforms}
      - 功能描述: {functional_description}
      
      模块要求：
      - 模块名称: {module_name}
      - 模块描述: {module_description}
      - 最少行数: {min_lines}行
      - 代码分类: {category}
      
      用户提示词: {user_prompt}
      
      请生成完整的代码文件，包含：
      1. 文件头注释（包含文件描述、作者、创建时间等）
      2. 必要的导入语句
      3. 完整的类/函数实现
      4. 详细的方法注释
      5. 异常处理逻辑
      6. 示例使用代码（如适用）

    documentation_template: |
      请为"{software_name}"软件生成详细的技术说明书。
      
      软件基本信息：
      - 软件名称: {software_name}
      - 版本号: {version}
      - 开发者: {developer}
      - 开发语言: {development_language}
      - 数据库: {database}
      - 支持平台: {platforms}
      - 开发完成日期: {completion_date}
      - 软件类型: {software_type}
      - 行业领域: {industry}
      
      功能描述：
      {functional_description}
      
      代码结构：
      {code_structure}
      
      请生成包含以下章节的详细说明书：
      1. 软件概述
      2. 系统架构设计
      3. 功能模块说明
      4. 技术实现方案
      5. 数据库设计
      6. 接口设计
      7. 部署和运维
      8. 系统特色和创新点
      9. 性能指标
      10. 安全机制
      
      说明书应该专业、详细，符合软件著作权申报要求。

  generation:
    batch_size: 1
    delay_between_batches: 3000
    max_retries: 3
    timeout: 60000
      `;

      const parsed = yaml.load(yamlContent) as { code_generation: CodeGenerationConfig };
      return parsed.code_generation;
    } catch (error) {
      console.error('Failed to load code generation config:', error);
      throw new Error('配置文件加载失败');
    }
  }

  // 生成所有代码页面
  async generateAllPages(
    softwareInfo: SoftwareInfo,
    onProgress?: (progress: GenerationProgress) => void
  ): Promise<CodePage[]> {
    if (!this.config) {
      throw new Error('配置文件未加载');
    }

    // 重置并初始化上下文
    this.codeContext = this.initializeContext();
    this.updateProjectStructure(softwareInfo);

    const allTemplates = this.getAllTemplates();
    const totalPages = Math.max(this.getMinPages(), allTemplates.length);
    const codePages: CodePage[] = [];

    onProgress?.({
      current: 0,
      total: totalPages,
      currentPage: '准备生成...',
      status: 'preparing',
      message: '正在准备代码生成任务和上下文信息...'
    });

    // 第一步：生成项目架构概览
    await this.generateProjectArchitecture(softwareInfo);

    // 按优先级和依赖关系排序模板
    const sortedTemplates = this.sortTemplatesByDependency(allTemplates);

    let successCount = 0;
    let fallbackCount = 0;

    // 逐个生成代码页面，每次都传递完整的上下文
    for (let i = 0; i < sortedTemplates.length; i++) {
      const template = sortedTemplates[i];
      const pageIndex = i + 1;
      
      onProgress?.({
        current: pageIndex,
        total: totalPages,
        currentPage: template.name,
        status: 'generating',
        message: `正在生成 ${template.name}... (${pageIndex}/${totalPages})`
      });

      try {
        console.log(`开始生成第 ${pageIndex} 页: ${template.name}`);
        const codePage = await this.generateSinglePageWithContext(
          softwareInfo, 
          template, 
          pageIndex, 
          totalPages
        );
        
        codePages.push(codePage);
        successCount++;
        
        // 重要：更新上下文信息
        await this.updateContextFromGeneratedCode(codePage, template);
        
        console.log(`✅ 成功生成第 ${pageIndex} 页: ${template.name}`);
        
        // 每个页面生成后增加延迟，避免API频率限制
        if (i < sortedTemplates.length - 1) {
          console.log(`等待 ${this.config.generation.delay_between_batches}ms 后继续...`);
          await new Promise(resolve => setTimeout(resolve, this.config.generation.delay_between_batches));
        }
      } catch (error) {
        console.error(`❌ 生成第 ${pageIndex} 页失败: ${template.name}`, error);
        
        // 生成失败时使用fallback页面
        const fallbackPage = this.createFallbackPage(template, pageIndex);
        codePages.push(fallbackPage);
        fallbackCount++;
        
        console.log(`🔄 使用fallback生成第 ${pageIndex} 页: ${template.name}`);
        
        // 即使使用fallback，也要更新上下文（使用简化的信息）
        await this.updateContextFromFallbackCode(fallbackPage, template);
        
        // 失败后稍微延长等待时间
        if (i < sortedTemplates.length - 1) {
          await new Promise(resolve => setTimeout(resolve, this.config.generation.delay_between_batches * 1.5));
        }
      }
    }

    const statusMessage = successCount === sortedTemplates.length 
      ? `🎉 成功生成 ${codePages.length} 个代码文件，所有代码具有完整的上下文关联性`
      : `✅ 生成完成：${successCount} 个AI生成，${fallbackCount} 个模板生成，共 ${codePages.length} 个文件`;

    onProgress?.({
      current: totalPages,
      total: totalPages,
      currentPage: '完成',
      status: 'completed',
      message: statusMessage
    });

    return codePages;
  }

  // 新增：生成项目架构概览
  private async generateProjectArchitecture(softwareInfo: SoftwareInfo) {
    const architecturePrompt = `
请为"${softwareInfo.softwareName}"项目设计完整的架构方案，重要：必须使用 ${softwareInfo.developmentLanguage} 语言。

软件信息：
- 名称: ${softwareInfo.softwareName}
- 开发语言: ${softwareInfo.developmentLanguage} （必须严格使用此语言）
- 数据库: ${softwareInfo.database}
- 平台: ${softwareInfo.platforms.join(', ')}
- 功能描述: ${softwareInfo.functionalDescription}

请基于 ${softwareInfo.developmentLanguage} 语言特性提供以下架构信息：
1. 核心数据模型（使用${softwareInfo.developmentLanguage}的类名和字段命名规范）
2. 主要API接口（符合${softwareInfo.developmentLanguage}的REST API设计）
3. 数据库表结构（表名、主要字段、关系）
4. 项目包结构和主要类名（遵循${softwareInfo.developmentLanguage}的包命名规范）
5. 技术栈和依赖关系（使用${softwareInfo.developmentLanguage}生态的框架和库）

请以JSON格式返回，确保所有类名、方法名、包名都符合${softwareInfo.developmentLanguage}的命名规范：
    `;

    try {
      const architectureResponse = await this.deepSeekClient.generateCode(
        architecturePrompt,
        `你是一个专业的软件架构师，请严格使用${softwareInfo.developmentLanguage}语言设计完整且一致的项目架构。所有命名和结构都必须符合${softwareInfo.developmentLanguage}的标准规范。`
      );

      // 解析架构信息并更新上下文
      this.parseAndUpdateArchitecture(architectureResponse, softwareInfo);
    } catch (error) {
      console.warn('架构生成失败，使用默认架构:', error);
      this.generateDefaultArchitecture(softwareInfo);
    }
  }

  // 新增：解析架构信息
  private parseAndUpdateArchitecture(architectureResponse: string, softwareInfo: SoftwareInfo) {
    try {
      // 尝试提取JSON部分
      const jsonMatch = architectureResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const architecture = JSON.parse(jsonMatch[0]);
        
        // 更新共享模型
        if (architecture.models) {
          this.codeContext.sharedModels = architecture.models.map((model: any) => ({
            name: model.name,
            fields: model.fields || [],
            type: model.type || 'entity'
          }));
        }

        // 更新API接口
        if (architecture.apis) {
          this.codeContext.apiEndpoints = architecture.apis.map((api: any) => ({
            path: api.path,
            method: api.method,
            description: api.description
          }));
        }

        // 更新数据库表
        if (architecture.tables) {
          this.codeContext.databaseTables = architecture.tables.map((table: any) => ({
            name: table.name,
            fields: table.fields || [],
            relationships: table.relationships || []
          }));
        }
      }
    } catch (error) {
      console.warn('架构解析失败，使用默认架构:', error);
      this.generateDefaultArchitecture(softwareInfo);
    }
  }

  // 新增：生成默认架构
  private generateDefaultArchitecture(softwareInfo: SoftwareInfo) {
    const safeName = softwareInfo.softwareName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const language = softwareInfo.developmentLanguage.toLowerCase();
    
    // 根据开发语言生成不同的默认架构
    if (language.includes('java')) {
      this.generateJavaDefaultArchitecture(safeName, softwareInfo);
    } else if (language.includes('python')) {
      this.generatePythonDefaultArchitecture(safeName, softwareInfo);
    } else if (language.includes('javascript') || language.includes('typescript') || language.includes('node')) {
      this.generateJavaScriptDefaultArchitecture(safeName, softwareInfo);
    } else if (language.includes('c#') || language.includes('csharp')) {
      this.generateCSharpDefaultArchitecture(safeName, softwareInfo);
    } else if (language.includes('go') || language.includes('golang')) {
      this.generateGoDefaultArchitecture(safeName, softwareInfo);
    } else {
      // 通用默认架构
      this.generateGenericDefaultArchitecture(safeName, softwareInfo);
    }
  }

  // Java默认架构
  private generateJavaDefaultArchitecture(safeName: string, softwareInfo: SoftwareInfo) {
    this.codeContext.projectStructure = {
      packageName: `com.${safeName}.app`,
      mainClassName: `${safeName.charAt(0).toUpperCase() + safeName.slice(1)}Application`,
      databaseSchema: `${safeName}_db`,
      apiPrefix: '/api/v1'
    };

    this.codeContext.sharedModels = [
      {
        name: 'User',
        fields: ['private Long id', 'private String username', 'private String email', 'private LocalDateTime createdAt'],
        type: 'entity'
      },
      {
        name: 'Role',
        fields: ['private Long id', 'private String name', 'private String description'],
        type: 'entity'
      },
      {
        name: 'UserDto',
        fields: ['private Long id', 'private String username', 'private String email'],
        type: 'dto'
      }
    ];

    this.codeContext.apiEndpoints = [
      { path: '/api/v1/users', method: 'GET', description: '获取用户列表' },
      { path: '/api/v1/users', method: 'POST', description: '创建用户' },
      { path: '/api/v1/users/{id}', method: 'PUT', description: '更新用户' },
      { path: '/api/v1/users/{id}', method: 'DELETE', description: '删除用户' }
    ];

    this.codeContext.databaseTables = [
      {
        name: 'users',
        fields: ['id BIGINT PRIMARY KEY', 'username VARCHAR(50)', 'email VARCHAR(100)', 'password VARCHAR(255)', 'created_at TIMESTAMP'],
        relationships: ['many-to-many: roles']
      },
      {
        name: 'roles',
        fields: ['id BIGINT PRIMARY KEY', 'name VARCHAR(50)', 'description TEXT'],
        relationships: ['many-to-many: users']
      }
    ];
  }

  // Python默认架构
  private generatePythonDefaultArchitecture(safeName: string, softwareInfo: SoftwareInfo) {
    this.codeContext.projectStructure = {
      packageName: safeName,
      mainClassName: `${safeName.charAt(0).toUpperCase() + safeName.slice(1)}App`,
      databaseSchema: `${safeName}_db`,
      apiPrefix: '/api/v1'
    };

    this.codeContext.sharedModels = [
      {
        name: 'User',
        fields: ['id: int', 'username: str', 'email: str', 'created_at: datetime'],
        type: 'entity'
      },
      {
        name: 'Role',
        fields: ['id: int', 'name: str', 'description: str'],
        type: 'entity'
      },
      {
        name: 'UserSchema',
        fields: ['id: int', 'username: str', 'email: str'],
        type: 'dto'
      }
    ];

    this.codeContext.apiEndpoints = [
      { path: '/api/v1/users', method: 'GET', description: '获取用户列表' },
      { path: '/api/v1/users', method: 'POST', description: '创建用户' },
      { path: '/api/v1/users/{user_id}', method: 'PUT', description: '更新用户' },
      { path: '/api/v1/users/{user_id}', method: 'DELETE', description: '删除用户' }
    ];

    this.codeContext.databaseTables = [
      {
        name: 'users',
        fields: ['id INTEGER PRIMARY KEY', 'username VARCHAR(50)', 'email VARCHAR(100)', 'password VARCHAR(255)', 'created_at TIMESTAMP'],
        relationships: ['many-to-many: roles']
      },
      {
        name: 'roles',
        fields: ['id INTEGER PRIMARY KEY', 'name VARCHAR(50)', 'description TEXT'],
        relationships: ['many-to-many: users']
      }
    ];
  }

  // JavaScript/TypeScript默认架构
  private generateJavaScriptDefaultArchitecture(safeName: string, softwareInfo: SoftwareInfo) {
    this.codeContext.projectStructure = {
      packageName: safeName,
      mainClassName: `${safeName.charAt(0).toUpperCase() + safeName.slice(1)}App`,
      databaseSchema: `${safeName}_db`,
      apiPrefix: '/api/v1'
    };

    this.codeContext.sharedModels = [
      {
        name: 'User',
        fields: ['id: number', 'username: string', 'email: string', 'createdAt: Date'],
        type: 'entity'
      },
      {
        name: 'Role',
        fields: ['id: number', 'name: string', 'description: string'],
        type: 'entity'
      },
      {
        name: 'UserInterface',
        fields: ['id: number', 'username: string', 'email: string'],
        type: 'dto'
      }
    ];

    this.codeContext.apiEndpoints = [
      { path: '/api/v1/users', method: 'GET', description: '获取用户列表' },
      { path: '/api/v1/users', method: 'POST', description: '创建用户' },
      { path: '/api/v1/users/:id', method: 'PUT', description: '更新用户' },
      { path: '/api/v1/users/:id', method: 'DELETE', description: '删除用户' }
    ];

    this.codeContext.databaseTables = [
      {
        name: 'users',
        fields: ['id INTEGER PRIMARY KEY', 'username VARCHAR(50)', 'email VARCHAR(100)', 'password VARCHAR(255)', 'created_at TIMESTAMP'],
        relationships: ['many-to-many: roles']
      },
      {
        name: 'roles',
        fields: ['id INTEGER PRIMARY KEY', 'name VARCHAR(50)', 'description TEXT'],
        relationships: ['many-to-many: users']
      }
    ];
  }

  // C#默认架构
  private generateCSharpDefaultArchitecture(safeName: string, softwareInfo: SoftwareInfo) {
    const pascalName = safeName.charAt(0).toUpperCase() + safeName.slice(1);
    
    this.codeContext.projectStructure = {
      packageName: `${pascalName}.App`,
      mainClassName: `${pascalName}Application`,
      databaseSchema: `${pascalName}Db`,
      apiPrefix: '/api/v1'
    };

    this.codeContext.sharedModels = [
      {
        name: 'User',
        fields: ['public int Id { get; set; }', 'public string Username { get; set; }', 'public string Email { get; set; }', 'public DateTime CreatedAt { get; set; }'],
        type: 'entity'
      },
      {
        name: 'Role',
        fields: ['public int Id { get; set; }', 'public string Name { get; set; }', 'public string Description { get; set; }'],
        type: 'entity'
      },
      {
        name: 'UserDto',
        fields: ['public int Id { get; set; }', 'public string Username { get; set; }', 'public string Email { get; set; }'],
        type: 'dto'
      }
    ];

    this.codeContext.apiEndpoints = [
      { path: '/api/v1/users', method: 'GET', description: '获取用户列表' },
      { path: '/api/v1/users', method: 'POST', description: '创建用户' },
      { path: '/api/v1/users/{id}', method: 'PUT', description: '更新用户' },
      { path: '/api/v1/users/{id}', method: 'DELETE', description: '删除用户' }
    ];

    this.codeContext.databaseTables = [
      {
        name: 'Users',
        fields: ['Id INT PRIMARY KEY', 'Username NVARCHAR(50)', 'Email NVARCHAR(100)', 'Password NVARCHAR(255)', 'CreatedAt DATETIME'],
        relationships: ['many-to-many: Roles']
      },
      {
        name: 'Roles',
        fields: ['Id INT PRIMARY KEY', 'Name NVARCHAR(50)', 'Description NTEXT'],
        relationships: ['many-to-many: Users']
      }
    ];
  }

  // Go默认架构
  private generateGoDefaultArchitecture(safeName: string, softwareInfo: SoftwareInfo) {
    this.codeContext.projectStructure = {
      packageName: safeName,
      mainClassName: 'main',
      databaseSchema: `${safeName}_db`,
      apiPrefix: '/api/v1'
    };

    this.codeContext.sharedModels = [
      {
        name: 'User',
        fields: ['ID uint `json:"id"`', 'Username string `json:"username"`', 'Email string `json:"email"`', 'CreatedAt time.Time `json:"created_at"`'],
        type: 'entity'
      },
      {
        name: 'Role',
        fields: ['ID uint `json:"id"`', 'Name string `json:"name"`', 'Description string `json:"description"`'],
        type: 'entity'
      },
      {
        name: 'UserResponse',
        fields: ['ID uint `json:"id"`', 'Username string `json:"username"`', 'Email string `json:"email"`'],
        type: 'dto'
      }
    ];

    this.codeContext.apiEndpoints = [
      { path: '/api/v1/users', method: 'GET', description: '获取用户列表' },
      { path: '/api/v1/users', method: 'POST', description: '创建用户' },
      { path: '/api/v1/users/{id}', method: 'PUT', description: '更新用户' },
      { path: '/api/v1/users/{id}', method: 'DELETE', description: '删除用户' }
    ];

    this.codeContext.databaseTables = [
      {
        name: 'users',
        fields: ['id INTEGER PRIMARY KEY', 'username VARCHAR(50)', 'email VARCHAR(100)', 'password VARCHAR(255)', 'created_at TIMESTAMP'],
        relationships: ['many-to-many: roles']
      },
      {
        name: 'roles',
        fields: ['id INTEGER PRIMARY KEY', 'name VARCHAR(50)', 'description TEXT'],
        relationships: ['many-to-many: users']
      }
    ];
  }

  // 通用默认架构
  private generateGenericDefaultArchitecture(safeName: string, softwareInfo: SoftwareInfo) {
    this.codeContext.projectStructure = {
      packageName: safeName,
      mainClassName: `${safeName.charAt(0).toUpperCase() + safeName.slice(1)}App`,
      databaseSchema: `${safeName}_db`,
      apiPrefix: '/api/v1'
    };

    this.codeContext.sharedModels = [
      {
        name: 'User',
        fields: ['id', 'username', 'email', 'createdAt'],
        type: 'entity'
      },
      {
        name: 'Role',
        fields: ['id', 'name', 'description'],
        type: 'entity'
      }
    ];

    this.codeContext.apiEndpoints = [
      { path: '/api/v1/users', method: 'GET', description: '获取用户列表' },
      { path: '/api/v1/users', method: 'POST', description: '创建用户' },
      { path: '/api/v1/users/{id}', method: 'PUT', description: '更新用户' },
      { path: '/api/v1/users/{id}', method: 'DELETE', description: '删除用户' }
    ];

    this.codeContext.databaseTables = [
      {
        name: 'users',
        fields: ['id', 'username', 'email', 'password', 'created_at'],
        relationships: ['many-to-many: roles']
      },
      {
        name: 'roles',
        fields: ['id', 'name', 'description'],
        relationships: ['many-to-many: users']
      }
    ];
  }

  // 新增：按依赖关系排序模板
  private sortTemplatesByDependency(templates: Array<CodeTemplate & { category: string }>): Array<CodeTemplate & { category: string }> {
    // 定义生成顺序：数据库 -> 后端模型 -> 后端服务 -> 后端控制器 -> 前端 -> 配置
    const priorityOrder = {
      'database': 1,
      'backend': 2,
      'frontend': 3,
      'config': 4
    };

    return templates.sort((a, b) => {
      const priorityA = priorityOrder[a.category as keyof typeof priorityOrder] || 5;
      const priorityB = priorityOrder[b.category as keyof typeof priorityOrder] || 5;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // 同类别内按优先级排序
      return a.priority - b.priority;
    });
  }

  // 重构：带上下文的单页生成
  private async generateSinglePageWithContext(
    softwareInfo: SoftwareInfo,
    template: CodeTemplate & { category: string },
    pageIndex: number,
    totalPages?: number
  ): Promise<CodePage> {
    if (!this.config) {
      throw new Error('配置文件未加载');
    }

    // 构建包含上下文的系统提示词
    const contextualSystemPrompt = this.buildContextualSystemPrompt(template, softwareInfo);
    
    // 构建包含上下文的用户提示词
    const contextualUserPrompt = this.buildContextualUserPrompt(softwareInfo, template);

    try {
      const generatedCode = await this.deepSeekClient.generateCode(
        contextualUserPrompt, 
        contextualSystemPrompt, 
        totalPages, 
        pageIndex
      );
      
      // 计算代码行数
      const lineCount = generatedCode.split('\n').length;

      return {
        id: pageIndex,
        title: template.name,
        content: generatedCode,
        lineCount: Math.max(lineCount, template.min_lines),
        isChecking: false,
        category: template.category as 'backend' | 'frontend' | 'database' | 'config',
        description: template.description
      };
    } catch (error) {
      console.error(`API生成失败，使用fallback: ${error instanceof Error ? error.message : error}`);
      throw error;
    }
  }

  // 新增：构建包含上下文的系统提示词
  private buildContextualSystemPrompt(template: CodeTemplate, softwareInfo: SoftwareInfo): string {
    const basePrompt = this.config.prompts.system_prompt.replace('{min_lines}', template.min_lines.toString());
    
    const languageSpecificPrompt = `
重要：请严格按照以下要求生成代码：
- 开发语言：${softwareInfo.developmentLanguage}
- 必须使用 ${softwareInfo.developmentLanguage} 语言编写所有代码
- 遵循 ${softwareInfo.developmentLanguage} 的语法规范和最佳实践
- 使用 ${softwareInfo.developmentLanguage} 的标准库和框架

`;
    
    const contextInfo = `
上下文信息：
- 项目包名: ${this.codeContext.projectStructure.packageName}
- 主应用类: ${this.codeContext.projectStructure.mainClassName}
- 数据库架构: ${this.codeContext.projectStructure.databaseSchema}
- API前缀: ${this.codeContext.projectStructure.apiPrefix}

已生成的代码模块：
${this.codeContext.generatedSummaries.map(summary => 
  `- ${summary.title} (${summary.category}): 主要类 [${summary.mainClasses.join(', ')}]`
).join('\n')}

共享数据模型：
${this.codeContext.sharedModels.map(model => 
  `- ${model.name} (${model.type}): ${model.fields.join(', ')}`
).join('\n')}

API接口定义：
${this.codeContext.apiEndpoints.map(api => 
  `- ${api.method} ${api.path}: ${api.description}`
).join('\n')}

数据库表结构：
${this.codeContext.databaseTables.map(table => 
  `- ${table.name}: ${table.fields.join(', ')}`
).join('\n')}

请确保生成的代码与上述上下文信息保持一致，使用相同的类名、包名、数据结构等。
请直接输出代码，不要添加任何解释性文字或markdown格式标记。
    `;

    return languageSpecificPrompt + basePrompt + contextInfo;
  }

  // 新增：构建包含上下文的用户提示词
  private buildContextualUserPrompt(
    softwareInfo: SoftwareInfo,
    template: CodeTemplate & { category: string }
  ): string {
    const basePrompt = `请为"${softwareInfo.softwareName}"生成"${template.name}"模块的代码。

重要要求：
- 必须使用 ${softwareInfo.developmentLanguage} 语言
- 直接输出代码，不要任何解释或说明文字
- 不要使用markdown代码块格式
- 代码必须完整可运行

软件信息：
- 名称: ${softwareInfo.softwareName}
- 开发语言: ${softwareInfo.developmentLanguage}
- 数据库: ${softwareInfo.database}
- 平台: ${softwareInfo.platforms.join(', ')}
- 功能描述: ${softwareInfo.functionalDescription}

模块要求：
- 名称: ${template.name}
- 描述: ${template.description}
- 最少行数: ${template.min_lines}行
- 分类: ${template.category}`;

    // 根据开发语言和模板类别添加特定的指导
    let languageSpecificGuidance = this.getLanguageSpecificGuidance(softwareInfo.developmentLanguage, template.category);
    let categorySpecificGuidance = this.getCategorySpecificGuidance(softwareInfo, template);

    return basePrompt + languageSpecificGuidance + categorySpecificGuidance + `

请生成完整可运行的 ${softwareInfo.developmentLanguage} 代码，确保：
1. 严格使用 ${softwareInfo.developmentLanguage} 语法
2. 与项目整体架构保持一致
3. 正确引用已定义的类和接口
4. 包含完整的导入语句和依赖
5. 添加详细的注释和错误处理
6. 遵循 ${softwareInfo.developmentLanguage} 的最佳实践和设计模式

直接输出代码，不要任何额外说明：`;
  }

  // 新增：根据开发语言获取特定指导
  private getLanguageSpecificGuidance(language: string, category: string): string {
    const lowerLang = language.toLowerCase();
    
    if (lowerLang.includes('java')) {
      return `
Java开发规范：
- 使用标准的Java包结构
- 遵循Java命名约定（类名大驼峰，方法名小驼峰）
- 使用Spring Boot框架（如适用）
- 包含适当的注解（@Service, @Controller, @Entity等）
- 使用try-catch进行异常处理
      `;
    } else if (lowerLang.includes('python')) {
      return `
Python开发规范：
- 遵循PEP 8代码风格
- 使用适当的Python框架（Django, Flask, FastAPI等）
- 使用类型提示（type hints）
- 包含docstring文档
- 使用try-except进行异常处理
      `;
    } else if (lowerLang.includes('javascript') || lowerLang.includes('typescript') || lowerLang.includes('node')) {
      return `
JavaScript/TypeScript开发规范：
- 使用ES6+语法
- 如果是TypeScript，包含类型定义
- 使用适当的框架（Express, React, Vue等）
- 使用async/await处理异步操作
- 包含JSDoc注释
      `;
    } else if (lowerLang.includes('c#') || lowerLang.includes('csharp')) {
      return `
C#开发规范：
- 使用.NET框架或.NET Core
- 遵循C#命名约定
- 使用适当的特性（Attributes）
- 包含XML文档注释
- 使用try-catch进行异常处理
      `;
    } else if (lowerLang.includes('go') || lowerLang.includes('golang')) {
      return `
Go开发规范：
- 遵循Go代码风格
- 使用Go标准库
- 包含适当的错误处理
- 使用接口进行抽象
- 包含包级别注释
      `;
    }
    
    return `
${language}开发规范：
- 遵循${language}的标准语法和约定
- 使用${language}的标准库和常用框架
- 包含适当的错误处理机制
- 添加详细的代码注释
    `;
  }

  // 新增：根据模板类别获取特定指导
  private getCategorySpecificGuidance(softwareInfo: SoftwareInfo, template: CodeTemplate & { category: string }): string {
    switch (template.category) {
      case 'backend':
        return `
后端开发规范：
- 使用包名: ${this.codeContext.projectStructure.packageName}
- 引用已定义的实体类: ${this.codeContext.sharedModels.map(m => m.name).join(', ')}
- 实现API接口: ${this.codeContext.apiEndpoints.filter(api => 
    template.name.toLowerCase().includes('controller') || 
    template.name.toLowerCase().includes('api')
  ).map(api => `${api.method} ${api.path}`).join(', ')}
- 确保与其他服务层的一致性
        `;
        
      case 'frontend':
        return `
前端开发规范：
- 调用API接口: ${this.codeContext.apiEndpoints.map(api => api.path).join(', ')}
- 使用数据模型: ${this.codeContext.sharedModels.map(m => m.name).join(', ')}
- 保持与后端接口的一致性
- 确保组件间的数据流畅通
        `;
        
      case 'database':
        return `
数据库设计规范：
- 数据库名: ${this.codeContext.projectStructure.databaseSchema}
- 已定义的表: ${this.codeContext.databaseTables.map(t => t.name).join(', ')}
- 保持表结构的一致性和完整性
- 确保外键关系正确
        `;
        
      case 'config':
        return `
配置文件规范：
- 项目名: ${softwareInfo.softwareName}
- 主应用类: ${this.codeContext.projectStructure.mainClassName}
- 数据库配置与 ${this.codeContext.projectStructure.databaseSchema} 保持一致
        `;
        
      default:
        return '';
    }
  }

  // 新增：从生成的代码中更新上下文
  private async updateContextFromGeneratedCode(codePage: CodePage, template: CodeTemplate & { category: string }) {
    try {
      // 简单的代码分析，提取关键信息
      const codeContent = codePage.content;
      
      // 提取类名
      const classMatches = codeContent.match(/class\s+(\w+)/g) || [];
      const mainClasses = classMatches.map(match => match.replace('class ', ''));
      
      // 提取方法名
      const methodMatches = codeContent.match(/public\s+\w+\s+(\w+)\s*\(/g) || [];
      const mainMethods = methodMatches.map(match => 
        match.replace(/public\s+\w+\s+/, '').replace(/\s*\(.*/, '')
      );
      
      // 提取导入依赖
      const importMatches = codeContent.match(/import\s+([^;]+);/g) || [];
      const dependencies = importMatches.map(match => 
        match.replace('import ', '').replace(';', '').trim()
      );

      // 更新上下文
      this.codeContext.generatedSummaries.push({
        title: template.name,
        category: template.category,
        mainClasses,
        mainMethods,
        dependencies,
        exports: mainClasses // 简化处理
      });

      console.log(`更新上下文信息 - ${template.name}:`, {
        classes: mainClasses,
        methods: mainMethods.slice(0, 3), // 只显示前3个方法
        dependencies: dependencies.slice(0, 3) // 只显示前3个依赖
      });
      
    } catch (error) {
      console.warn(`更新上下文失败 - ${template.name}:`, error);
    }
  }

  // 新增：从fallback代码更新上下文（简化版）
  private async updateContextFromFallbackCode(codePage: CodePage, template: CodeTemplate & { category: string }) {
    try {
      // 为fallback代码添加基本的上下文信息
      const fallbackSummary = {
        title: template.name,
        category: template.category,
        mainClasses: [template.name.replace(/\s+/g, '')], // 简化的类名
        mainMethods: ['save', 'findAll', 'findById', 'update', 'delete'], // 通用方法
        dependencies: [],
        exports: [template.name.replace(/\s+/g, '')]
      };

      this.codeContext.generatedSummaries.push(fallbackSummary);
      
      console.log(`更新fallback上下文信息 - ${template.name}`);
      
    } catch (error) {
      console.warn(`更新fallback上下文失败 - ${template.name}:`, error);
    }
  }

  // 新增：获取当前代码上下文信息（用于调试和展示）
  public getCodeContext(): CodeContext {
    return { ...this.codeContext };
  }

  // 新增：导出项目架构摘要
  public generateArchitectureSummary(): string {
    const context = this.codeContext;
    
    return `
# 项目架构摘要

## 基本信息
- 项目包名: ${context.projectStructure.packageName}
- 主应用类: ${context.projectStructure.mainClassName}  
- 数据库架构: ${context.projectStructure.databaseSchema}
- API前缀: ${context.projectStructure.apiPrefix}

## 数据模型 (${context.sharedModels.length}个)
${context.sharedModels.map(model => 
  `### ${model.name} (${model.type})
${model.fields.map(field => `- ${field}`).join('\n')}`
).join('\n\n')}

## API接口 (${context.apiEndpoints.length}个)
${context.apiEndpoints.map(api => 
  `- ${api.method} ${api.path} - ${api.description}`
).join('\n')}

## 数据库表 (${context.databaseTables.length}个)
${context.databaseTables.map(table => 
  `### ${table.name}
字段: ${table.fields.join(', ')}
关系: ${table.relationships.join(', ')}`
).join('\n\n')}

## 生成的代码模块 (${context.generatedSummaries.length}个)
${context.generatedSummaries.map(summary => 
  `### ${summary.title} (${summary.category})
- 主要类: ${summary.mainClasses.join(', ')}
- 主要方法: ${summary.mainMethods.slice(0, 5).join(', ')}${summary.mainMethods.length > 5 ? '...' : ''}
- 依赖: ${summary.dependencies.slice(0, 3).join(', ')}${summary.dependencies.length > 3 ? '...' : ''}`
).join('\n\n')}
    `.trim();
  }

  // 新增：测试API连接
  public async testApiConnection() {
    return await this.deepSeekClient.diagnoseConnection();
  }

  // 生成单个代码页面（保留原有方法以兼容性）
  private async generateSinglePage(
    softwareInfo: SoftwareInfo,
    template: CodeTemplate & { category: string },
    pageIndex: number,
    totalPages?: number
  ): Promise<CodePage> {
    // 重定向到新的上下文方法
    return this.generateSinglePageWithContext(softwareInfo, template, pageIndex, totalPages);
  }

  // 创建备用页面（当生成失败时使用）
  private createFallbackPage(
    template: CodeTemplate & { category: string },
    pageIndex: number
  ): CodePage {
    let fallbackContent = '';
    
    // 根据分类生成不同的代码模板
    switch (template.category) {
      case 'backend':
        fallbackContent = this.generateBackendFallback(template);
        break;
      case 'frontend':
        fallbackContent = this.generateFrontendFallback(template);
        break;
      case 'database':
        fallbackContent = this.generateDatabaseFallback(template);
        break;
      case 'config':
        fallbackContent = this.generateConfigFallback(template);
        break;
      default:
        fallbackContent = this.generateGenericFallback(template);
    }

    return {
      id: pageIndex,
      title: template.name,
      content: fallbackContent,
      lineCount: fallbackContent.split('\n').length,
      isChecking: false,
      category: template.category as 'backend' | 'frontend' | 'database' | 'config',
      description: template.description
    };
  }

  private generateBackendFallback(template: CodeTemplate): string {
    return `/**
 * ${template.name}
 * ${template.description}
 * 
 * @author AI Generated
 * @version 1.0.0
 * @since ${new Date().toISOString().split('T')[0]}
 */

package com.example.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
@Transactional
public class ${template.name.replace(/\s+/g, '')}Service {
    
    private static final Logger logger = LoggerFactory.getLogger(${template.name.replace(/\s+/g, '')}Service.class);
    
    @Autowired
    private Repository repository;
    
    /**
     * 获取所有记录
     * @return 记录列表
     */
    public List<Entity> findAll() {
        try {
            logger.info("开始获取所有记录");
            List<Entity> result = repository.findAll();
            logger.info("成功获取 {} 条记录", result.size());
            return result;
        } catch (Exception e) {
            logger.error("获取记录失败", e);
            throw new RuntimeException("获取记录失败: " + e.getMessage());
        }
    }
    
    /**
     * 根据ID获取记录
     * @param id 记录ID
     * @return 记录对象
     */
    public Optional<Entity> findById(Long id) {
        try {
            logger.info("根据ID获取记录: {}", id);
            if (id == null || id <= 0) {
                throw new IllegalArgumentException("ID不能为空或小于等于0");
            }
            return repository.findById(id);
        } catch (Exception e) {
            logger.error("根据ID获取记录失败: {}", id, e);
            throw new RuntimeException("获取记录失败: " + e.getMessage());
        }
    }
    
    /**
     * 创建新记录
     * @param entity 实体对象
     * @return 保存后的实体
     */
    public Entity save(Entity entity) {
        try {
            logger.info("开始保存记录");
            if (entity == null) {
                throw new IllegalArgumentException("实体对象不能为空");
            }
            
            // 设置创建时间
            entity.setCreatedAt(LocalDateTime.now());
            entity.setUpdatedAt(LocalDateTime.now());
            
            Entity saved = repository.save(entity);
            logger.info("成功保存记录，ID: {}", saved.getId());
            return saved;
        } catch (Exception e) {
            logger.error("保存记录失败", e);
            throw new RuntimeException("保存记录失败: " + e.getMessage());
        }
    }
    
    /**
     * 更新记录
     * @param id 记录ID
     * @param entity 更新的实体对象
     * @return 更新后的实体
     */
    public Entity update(Long id, Entity entity) {
        try {
            logger.info("开始更新记录: {}", id);
            Optional<Entity> existing = repository.findById(id);
            if (!existing.isPresent()) {
                throw new RuntimeException("记录不存在: " + id);
            }
            
            Entity existingEntity = existing.get();
            // 更新字段
            existingEntity.setUpdatedAt(LocalDateTime.now());
            
            Entity updated = repository.save(existingEntity);
            logger.info("成功更新记录: {}", id);
            return updated;
        } catch (Exception e) {
            logger.error("更新记录失败: {}", id, e);
            throw new RuntimeException("更新记录失败: " + e.getMessage());
        }
    }
    
    /**
     * 删除记录
     * @param id 记录ID
     */
    public void deleteById(Long id) {
        try {
            logger.info("开始删除记录: {}", id);
            if (!repository.existsById(id)) {
                throw new RuntimeException("记录不存在: " + id);
            }
            repository.deleteById(id);
            logger.info("成功删除记录: {}", id);
        } catch (Exception e) {
            logger.error("删除记录失败: {}", id, e);
            throw new RuntimeException("删除记录失败: " + e.getMessage());
        }
    }
}`;
  }

  private generateFrontendFallback(template: CodeTemplate): string {
    return `/**
 * ${template.name}
 * ${template.description}
 * 
 * @author AI Generated
 * @version 1.0.0
 * @since ${new Date().toISOString().split('T')[0]}
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

interface DataItem {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const ${template.name.replace(/\s+/g, '')}: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // 加载数据
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('加载数据失败');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  }, []);

  // 组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 打开编辑对话框
  const handleEdit = (item: DataItem | null) => {
    setSelectedItem(item);
    setFormData({
      name: item?.name || '',
      description: item?.description || ''
    });
    setDialogOpen(true);
  };

  // 保存数据
  const handleSave = async () => {
    try {
      setLoading(true);
      const url = selectedItem ? \`/api/data/\${selectedItem.id}\` : '/api/data';
      const method = selectedItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('保存失败');
      }

      setDialogOpen(false);
      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除数据
  const handleDelete = async (id: number) => {
    if (!window.confirm('确定要删除这条记录吗？')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(\`/api/data/\${id}\`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('删除失败');
      }

      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ${template.name}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleEdit(null)}
          disabled={loading}
        >
          新增
        </Button>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={loadData}
          disabled={loading}
        >
          刷新
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>名称</TableCell>
              <TableCell>描述</TableCell>
              <TableCell>创建时间</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 编辑对话框 */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedItem ? '编辑记录' : '新增记录'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="名称"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="描述"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>取消</Button>
          <Button onClick={handleSave} variant="contained" disabled={loading}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ${template.name.replace(/\s+/g, '')};`;
  }

  private generateDatabaseFallback(template: CodeTemplate): string {
    return `-- ${template.name}
-- ${template.description}
-- 创建时间: ${new Date().toISOString().split('T')[0]}

-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS app_database 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE app_database;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
    password VARCHAR(255) NOT NULL COMMENT '密码哈希',
    full_name VARCHAR(100) COMMENT '姓名',
    phone VARCHAR(20) COMMENT '电话',
    status TINYINT DEFAULT 1 COMMENT '状态：1-正常，0-禁用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB COMMENT='用户表';

-- 创建角色表
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '角色ID',
    name VARCHAR(50) NOT NULL UNIQUE COMMENT '角色名称',
    description TEXT COMMENT '角色描述',
    permissions JSON COMMENT '权限列表',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    INDEX idx_name (name)
) ENGINE=InnoDB COMMENT='角色表';

-- 创建用户角色关联表
CREATE TABLE IF NOT EXISTS user_roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '关联ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_role (user_id, role_id)
) ENGINE=InnoDB COMMENT='用户角色关联表';

-- 创建操作日志表
CREATE TABLE IF NOT EXISTS operation_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '日志ID',
    user_id BIGINT COMMENT '操作用户ID',
    operation VARCHAR(100) NOT NULL COMMENT '操作类型',
    resource VARCHAR(100) COMMENT '操作资源',
    details JSON COMMENT '操作详情',
    ip_address VARCHAR(45) COMMENT 'IP地址',
    user_agent TEXT COMMENT '用户代理',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_operation (operation),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB COMMENT='操作日志表';

-- 插入默认角色
INSERT INTO roles (name, description, permissions) VALUES 
('ADMIN', '系统管理员', '["*"]'),
('USER', '普通用户', '["read", "write"]'),
('GUEST', '访客', '["read"]');

-- 插入默认管理员用户
INSERT INTO users (username, email, password, full_name, status) VALUES 
('admin', 'admin@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', '系统管理员', 1);

-- 分配管理员角色
INSERT INTO user_roles (user_id, role_id) 
SELECT u.id, r.id FROM users u, roles r 
WHERE u.username = 'admin' AND r.name = 'ADMIN';

-- 创建存储过程：获取用户权限
DELIMITER //
CREATE PROCEDURE GetUserPermissions(IN p_user_id BIGINT)
BEGIN
    SELECT DISTINCT 
        r.name as role_name,
        r.permissions
    FROM users u
    JOIN user_roles ur ON u.id = ur.user_id
    JOIN roles r ON ur.role_id = r.id
    WHERE u.id = p_user_id AND u.status = 1;
END //
DELIMITER ;

-- 创建函数：检查用户权限
DELIMITER //
CREATE FUNCTION HasPermission(p_user_id BIGINT, p_permission VARCHAR(100))
RETURNS BOOLEAN
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE has_perm BOOLEAN DEFAULT FALSE;
    DECLARE perm_count INT DEFAULT 0;
    
    SELECT COUNT(*) INTO perm_count
    FROM users u
    JOIN user_roles ur ON u.id = ur.user_id
    JOIN roles r ON ur.role_id = r.id
    WHERE u.id = p_user_id 
    AND u.status = 1
    AND (JSON_CONTAINS(r.permissions, '"*"') OR JSON_CONTAINS(r.permissions, CONCAT('"', p_permission, '"')));
    
    IF perm_count > 0 THEN
        SET has_perm = TRUE;
    END IF;
    
    RETURN has_perm;
END //
DELIMITER ;

-- 创建视图：用户详细信息
CREATE VIEW user_details AS
SELECT 
    u.id,
    u.username,
    u.email,
    u.full_name,
    u.phone,
    u.status,
    u.created_at,
    u.updated_at,
    GROUP_CONCAT(r.name) as roles
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
GROUP BY u.id, u.username, u.email, u.full_name, u.phone, u.status, u.created_at, u.updated_at;`;
  }

  private generateConfigFallback(template: CodeTemplate): string {
    return `# ${template.name}
# ${template.description}
# 创建时间: ${new Date().toISOString().split('T')[0]}

# 应用基本配置
app:
  name: "智慧树软件系统"
  version: "1.0.0"
  description: "基于AI的智能软件开发平台"
  author: "AI Generated"
  
# 服务器配置
server:
  port: 8080
  servlet:
    context-path: /api/v1
  tomcat:
    max-threads: 200
    min-spare-threads: 10
    
# 数据库配置
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/app_database?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: \${DB_USERNAME:root}
    password: \${DB_PASSWORD:password}
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
      
  # JPA配置
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true
        
  # Redis配置
  redis:
    host: \${REDIS_HOST:localhost}
    port: \${REDIS_PORT:6379}
    password: \${REDIS_PASSWORD:}
    database: 0
    timeout: 5000
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
        max-wait: -1
        
# 日志配置
logging:
  level:
    com.example: DEBUG
    org.springframework.web: INFO
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/application.log
    max-size: 100MB
    max-history: 30
    
# JWT配置
jwt:
  secret: \${JWT_SECRET:mySecretKey123456789}
  expiration: 86400000 # 24小时
  refresh-expiration: 604800000 # 7天
  
# 文件上传配置
file:
  upload:
    path: \${FILE_UPLOAD_PATH:/tmp/uploads}
    max-size: 10MB
    allowed-types:
      - image/jpeg
      - image/png
      - image/gif
      - application/pdf
      - application/msword
      - application/vnd.openxmlformats-officedocument.wordprocessingml.document
      
# 邮件配置
mail:
  host: \${MAIL_HOST:smtp.gmail.com}
  port: \${MAIL_PORT:587}
  username: \${MAIL_USERNAME:}
  password: \${MAIL_PASSWORD:}
  properties:
    mail:
      smtp:
        auth: true
        starttls:
          enable: true
          
# 安全配置
security:
  cors:
    allowed-origins:
      - "http://localhost:3000"
      - "https://yourdomain.com"
    allowed-methods:
      - GET
      - POST
      - PUT
      - DELETE
      - OPTIONS
    allowed-headers: "*"
    allow-credentials: true
    
# API限流配置
rate-limit:
  enabled: true
  default-limit: 100
  default-duration: 60
  endpoints:
    "/api/auth/login":
      limit: 5
      duration: 300
    "/api/users":
      limit: 50
      duration: 60
      
# 监控配置
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized
  metrics:
    export:
      prometheus:
        enabled: true
        
# 缓存配置
cache:
  type: redis
  redis:
    time-to-live: 3600
    cache-null-values: false
  caffeine:
    spec: maximumSize=1000,expireAfterWrite=300s
    
# 第三方服务配置
external:
  api:
    timeout: 30000
    retry:
      max-attempts: 3
      delay: 1000
  payment:
    provider: alipay
    app-id: \${PAYMENT_APP_ID:}
    private-key: \${PAYMENT_PRIVATE_KEY:}
    public-key: \${PAYMENT_PUBLIC_KEY:}
    
# 环境特定配置
---
spring:
  profiles: development
  
logging:
  level:
    root: DEBUG
    
---
spring:
  profiles: production
  
logging:
  level:
    root: WARN
    com.example: INFO
    
server:
  tomcat:
    max-threads: 500`;
  }

  private generateGenericFallback(template: CodeTemplate): string {
    return `/**
 * ${template.name}
 * ${template.description}
 * 
 * 注意：此页面为自动生成的模板代码
 * 实际项目中应根据具体需求进行详细实现
 */

// TODO: 实现具体的业务逻辑
// TODO: 添加错误处理
// TODO: 添加单元测试
// TODO: 优化性能
// TODO: 添加日志记录

${Array(Math.max(0, template.min_lines - 20)).fill('// 代码实现...').join('\n')}
`;
  }

  // 获取所有模板
  private getAllTemplates(): (CodeTemplate & { category: string })[] {
    if (!this.config) return [];

    const allTemplates: (CodeTemplate & { category: string })[] = [];
    
    Object.entries(this.config.templates).forEach(([category, templates]) => {
      templates.forEach(template => {
        allTemplates.push({ ...template, category });
      });
    });

    // 按优先级排序
    return allTemplates.sort((a, b) => a.priority - b.priority);
  }

  // 生成说明书
  async generateDocumentation(
    softwareInfo: SoftwareInfo,
    codePages: CodePage[]
  ): Promise<string> {
    if (!this.config) {
      throw new Error('配置文件未加载');
    }

    // 构建代码结构描述
    const codeStructure = codePages.map((page, index) => 
      `${index + 1}. ${page.title} (${page.lineCount}行) - ${page.description}`
    ).join('\n');

    const userPrompt = this.config.prompts.documentation_template
      .replace('{software_name}', softwareInfo.softwareName)
      .replace('{version}', softwareInfo.version)
      .replace('{developer}', softwareInfo.developer)
      .replace('{development_language}', softwareInfo.developmentLanguage)
      .replace('{database}', softwareInfo.database)
      .replace('{platforms}', softwareInfo.platforms.join(', '))
      .replace('{completion_date}', softwareInfo.completionDate)
      .replace('{software_type}', softwareInfo.softwareType)
      .replace('{industry}', softwareInfo.industry)
      .replace('{functional_description}', softwareInfo.functionalDescription)
      .replace('{code_structure}', codeStructure);

    const systemPrompt = '你是一个专业的技术文档编写专家，擅长编写详细、专业的软件技术说明书。';

    return await this.deepSeekClient.generateDocumentation(userPrompt, systemPrompt);
  }
} 