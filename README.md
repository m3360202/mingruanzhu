# mingruanzhu
给一个心爱的人做的软著生成mcp

# 智慧树 软著代码+说明书生成系统

基于 DeepSeek AI 的软件著作权申报材料自动生成系统。

## 快速开始

1.  安装依赖:
    ```bash
    yarn
    # or
    npm install
    ```

2.  配置环境变量:
    创建 `.env.dev` 文件：
    ```bash
    # DeepSeek API 配置
    NEXT_PUBLIC_DEEPSEEK_KEY=your_deepseek_api_key_here
    NEXT_PUBLIC_DEEPSEEK_BASE_URL=https://api.deepseek.com
    
    # 测试模式配置（可选）
    NEXT_PUBLIC_TEST_MODE=true  # 启用测试模式，生成1页代码
    ```

3.  启动开发服务器:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## 页数配置

系统支持两种模式：

### 正式模式（默认）
- **最小页数**: 30页
- **用途**: 生产环境，生成完整的软件代码
- **特点**: 包含完整的前端、后端、数据库和配置文件

### 测试模式
- **最小页数**: 1页
- **用途**: 开发测试，快速验证功能
- **启用方式**: 设置环境变量 `NEXT_PUBLIC_TEST_MODE=true`

## 获取 API Key

1. 访问 [DeepSeek 官网](https://platform.deepseek.com/)
2. 注册账号并登录
3. 在控制台中创建 API Key
4. 将 API Key 复制到 `.env.dev` 文件中

## 使用说明

1. 填写完整的软件信息（基本信息、申请人信息、软件分类）
2. 在"功能描述"中详细描述软件功能
3. 在"AI生成提示词"中输入具体的代码生成要求
4. 点击"生成项目代码及白皮书"按钮开始生成
5. 系统将根据当前模式生成相应数量的代码文件：
   - **正式模式**: 至少30页代码文件，每页不少于50行
   - **测试模式**: 至少1页代码文件，便于快速测试
6. 生成完成后会自动创建技术说明书

## 功能特点

- 🤖 AI驱动的代码生成
- 📊 实时进度显示
- 🎨 美观的MUI界面
- 📝 自动生成技术说明书
- 🔍 代码质量检查
- 📱 响应式设计
- 🔄 支持重新生成单个文件
- ⚙️ 灵活的页数配置（正式/测试模式）

## 代码分类

- **后端代码** (15页): 包含控制器、服务层、数据模型等
- **前端代码** (9页): 包含组件、页面、状态管理等  
- **数据库** (3页): 包含建表脚本、存储过程等
- **配置文件** (3页): 包含应用配置、部署配置等

## 注意事项

- 确保网络连接正常
- API Key 需要有足够的额度
- 生成过程可能需要几分钟时间
- 建议在生成前仔细填写软件信息
- 测试模式仅用于开发调试，正式使用请关闭测试模式
