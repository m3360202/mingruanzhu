import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Chip,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  LinearProgress
} from '@mui/material';
import {
  Code as CodeIcon,
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  AccountTree as AccountTreeIcon,
  PlayArrow as PlayArrowIcon,
  FileDownload as FileDownloadIcon,
  Archive as ArchiveIcon
} from '@mui/icons-material';
import { SoftwareInfo, CodePage } from '@/types/software';
import { CodeGenerator, GenerationProgress } from '@/lib/codeGenerator';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface GenerationBoardProps {
  softwareInfo?: SoftwareInfo;
  onGenerate?: (codePages: CodePage[]) => void;
  shouldGenerate?: boolean;
}

// 测试代码页面数据
const TEST_CODE_PAGES: CodePage[] = [
  {
    id: 1,
    title: '用户管理控制器',
    content: `/**
 * 用户管理控制器
 * 处理用户相关的HTTP请求和响应
 */
package com.example.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.example.service.UserService;
import com.example.entity.User;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * 获取所有用户
     * @return 用户列表
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 根据ID获取用户
     * @param id 用户ID
     * @return 用户信息
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            User user = userService.findById(id);
            if (user != null) {
                return ResponseEntity.ok(user);
      } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 创建新用户
     * @param user 用户信息
     * @return 创建结果
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            User savedUser = userService.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * 更新用户信息
     * @param id 用户ID
     * @param user 更新的用户信息
     * @return 更新结果
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            user.setId(id);
            User updatedUser = userService.update(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}`,
    lineCount: 67,
    isChecking: false,
    category: 'backend',
    description: 'RESTful API接口控制器，处理用户相关的HTTP请求'
  }
];

const GenerationBoard: React.FC<GenerationBoardProps> = ({ softwareInfo, onGenerate, shouldGenerate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeTab, setActiveTab] = useState(0);
  const [codePages, setCodePages] = useState<CodePage[]>([]);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<CodePage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress>({
    current: 0,
    total: 0,
    currentPage: '',
    status: 'preparing',
    message: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('info');
  const [codeGenerator] = useState(() => new CodeGenerator());
  const [architectureSummary, setArchitectureSummary] = useState<string>('');
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // 获取当前环境的页数配置信息
  const getPageConfigInfo = () => {
    const isTestMode = process.env.NODE_ENV === 'test' ||
      process.env.NEXT_PUBLIC_APP_ENV === 'test' ||
      process.env.NEXT_PUBLIC_TEST_MODE === 'true';

    if (isTestMode) {
      return {
        minPages: 1,
        environmentText: '测试模式：最少1页代码',
        description: '测试环境下快速生成，便于开发调试'
      };
    } else {
      return {
        minPages: 30,
        environmentText: '正式模式：至少30页代码',
        description: '将根据您填写的软件信息自动生成完整的代码文件'
      };
    }
  };

  const pageConfig = getPageConfigInfo();

  // 生成代码的主要逻辑
  const handleGenerate = async () => {
    if (isGenerating || !softwareInfo) return;

    setIsGenerating(true);
    setCodePages([]);
    setDocumentContent('');
    setArchitectureSummary('');
    setActiveTab(0);

    try {
      const pages = await codeGenerator.generateAllPages(softwareInfo, (progress) => {
        setGenerationProgress(progress);
      });

      setCodePages(pages);

      const summary = codeGenerator.generateArchitectureSummary();
      setArchitectureSummary(summary);

      setGenerationProgress({
        current: pages.length,
        total: pages.length,
        currentPage: '生成说明书',
        status: 'generating',
        message: '正在生成技术说明书...'
      });

      const documentation = await codeGenerator.generateDocumentation(softwareInfo, pages);
      setDocumentContent(documentation);

      setGenerationProgress({
        current: pages.length,
        total: pages.length,
        currentPage: '完成',
        status: 'completed',
        message: `成功生成 ${pages.length} 个代码文件和技术说明书`
      });

      setSnackbarMessage(`成功生成 ${pages.length} 个代码文件！所有代码具有完整的上下文关联性。`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      onGenerate?.(pages);
    } catch (error) {
      console.error('生成失败:', error);
      setGenerationProgress({
        current: 0,
        total: 0,
        currentPage: '错误',
        status: 'error',
        message: error instanceof Error ? error.message : '生成失败'
      });

      setSnackbarMessage(`生成失败: ${error instanceof Error ? error.message : '未知错误'}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // 测试API连接
  const handleTestConnection = async () => {
    if (isTestingConnection) return;

    setIsTestingConnection(true);
    try {
      const result = await codeGenerator.testApiConnection();

      showSnackbar(
        `${result.message}${result.details ? ` - ${result.details}` : ''}`,
        result.status === 'success' ? 'success' : 'error'
      );
    } catch (error) {
      showSnackbar(
        `连接测试失败: ${error instanceof Error ? error.message : '未知错误'}`,
        'error'
      );
    } finally {
      setIsTestingConnection(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // 导出为DOC文档
  const handleExportDoc = () => {
    if (!softwareInfo || !documentContent) {
      showSnackbar('请先生成代码和说明书', 'error');
      return;
    }

    try {
      // 创建简单的HTML文档，确保兼容性
      const pageHeader = `${softwareInfo.softwareName} ver ${softwareInfo.version}`;

      // 生成目录
      const generateTableOfContents = () => {
        const sections = [
          '1. 软件概述',
          '2. 系统架构',
          '3. 功能模块',
          '4. 技术实现',
          '5. 数据库设计',
          '6. 接口文档',
          '7. 部署说明',
          '8. 使用说明',
          '9. 代码清单',
          '10. 附录'
        ];

        // 动态计算页码，考虑实际内容长度
        let currentPage = 4; // 从第4页开始（封面、目录、项目信息后）
        return sections.map((section, index) => {
          const pageNum = currentPage + index * 2; // 每个章节大约占2页
          return `<p style="margin: 8px 0; padding-left: 20px; font-size: 12px; display: flex; align-items: baseline;">
            <span style="flex: 1;">${section}</span>
            <span style="flex: 0 0 auto; margin: 0 10px; border-bottom: 1px dotted #000; height: 1px; min-width: 100px;"></span>
            <span style="flex: 0 0 auto; font-weight: bold;">${pageNum}</span>
          </p>`;
        }).join('');
      };

      // 处理文本内容
      const formatText = (text: string) => {
        return text
          .replace(/\n/g, '<br>')
          .replace(/#{3}\s*([^#\n]+)/g, '<div class="subsection-title">$1</div>')
          .replace(/#{2}\s*([^#\n]+)/g, '<div class="section-title">$1</div>')
          .replace(/#{1}\s*([^#\n]+)/g, '<div style="font-size: 18px; font-weight: bold; margin: 25px 0; color: #222;">$1</div>');
      };

      // 生成代码清单
      const generateCodeListing = () => {
        if (codePages.length === 0) return '';

        let codeListing = '<div class="section-title">代码清单</div>';

        codePages.forEach((page, index) => {
          codeListing += `
            <div class="page-break"></div>
            <div class="subsection-title">${index + 1}. ${page.title}</div>
            <div style="margin: 15px 0; font-size: 12px;">
              <p style="margin: 5px 0;"><strong>文件类别：</strong>${getCategoryName(page.category)}</p>
              <p style="margin: 5px 0;"><strong>代码行数：</strong>${page.lineCount} 行</p>
              <p style="margin: 5px 0;"><strong>功能描述：</strong>${page.description}</p>
            </div>
            <div style="margin: 20px 0;">
              <p style="font-weight: bold; margin-bottom: 10px; font-size: 12px;">源代码内容：</p>
              <pre style="background-color: #f8f9fa; padding: 15px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 9px; font-family: 'Courier New', 'Consolas', monospace; white-space: pre-wrap; line-height: 1.4; overflow-wrap: break-word;">${page.content}</pre>
            </div>
          `;
        });

        return codeListing;
      };

      const getCategoryName = (category: string) => {
        const names = {
          backend: '后端代码',
          frontend: '前端代码',
          database: '数据库',
          config: '配置文件'
        };
        return names[category as keyof typeof names] || category;
      };

      // 创建完整的HTML文档
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${softwareInfo.softwareName}说明书</title>
  <style>
    @page {
      size: A4;
      margin: 2.54cm;
    }
    body {
      font-family: "宋体", SimSun, serif;
      font-size: 12px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }
    .header {
      text-align: center;
      font-size: 10px;
      border-bottom: 1px solid #000;
      padding-bottom: 5px;
      margin-bottom: 20px;
    }
    .cover-page {
      text-align: center;
      page-break-after: always;
      padding-top: 50px;
      position: relative;
      min-height: calc(100vh - 100px);
    }
    .cover-title {
      font-size: 48px;
      font-weight: bold;
      margin-top: 200px;
      margin-bottom: 60px;
      line-height: 1.2;
    }
    .cover-subtitle {
      font-size: 20px;
      font-weight: bold;
      line-height: 1.2;
    }
    .cover-footer {
      margin-top: 200px;
      text-align: left;
      font-size: 14px;
      line-height: 2;
      display: inline-block;
      margin-left: auto;
      margin-right: auto;
    }
    .toc-page {
      page-break-after: always;
      padding-top: 50px;
      min-height: 80vh;
    }
    .toc-title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 40px;
    }
    .toc-content {
      max-width: 600px;
      margin: 0 auto;
    }
    .content-page {
      padding-top: 20px;
    }
    .page-break {
      page-break-before: always;
    }
    .section-title {
      font-size: 16px;
      font-weight: bold;
      margin: 30px 0 20px 0;
      color: #333;
    }
    .subsection-title {
      font-size: 14px;
      font-weight: bold;
      margin: 20px 0 15px 0;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="header">${pageHeader}</div>
  
  <!-- 封面页 -->
  <div class="cover-page">
    <div class="cover-title">${softwareInfo.softwareName}</div>
    <div class="cover-subtitle">程序说明书</div>
    <div style="text-align: center;">
      <div class="cover-footer">
        申请人：${softwareInfo.developer}<br />
        申请单位：${softwareInfo.company}<br />
        单位地址：${softwareInfo.address}<br />
        完成日期：${softwareInfo.completionDate}
      </div>
    </div>
  </div>

  <!-- 目录页 -->
  <div class="toc-page">
    <div class="toc-title">目 录</div>
    <div class="toc-content">
      ${generateTableOfContents()}
    </div>
  </div>

  <!-- 内容页 -->
  <div class="content-page">
    ${formatText(documentContent)}
    
    <div class="page-break"></div>
    ${generateCodeListing()}
    
    <div class="page-break"></div>
    <div class="section-title">附录：项目架构信息</div>
    ${formatText(architectureSummary)}
  </div>
</body>
</html>`;

      // 创建Blob并下载
      const blob = new Blob([htmlContent], {
        type: 'application/msword;charset=utf-8'
      });

      const fileName = `${softwareInfo.softwareName}_v${softwareInfo.version}_完整说明书.doc`;
      saveAs(blob, fileName);

      showSnackbar('完整说明书导出成功！', 'success');
    } catch (error) {
      console.error('导出失败:', error);
      showSnackbar('导出失败，请重试', 'error');
    }
  };

  const handleViewCode = (page: CodePage) => {
    setSelectedPage(page);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPage(null);
  };

  const renderCodePages = () => {
    if (codePages.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CodeIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            暂无生成的代码
          </Typography>
          <Typography variant="body2" color="text.secondary">
            点击上方按钮开始生成代码文件
          </Typography>
        </Box>
      );
    }

    const categoryStats = codePages.reduce((acc, page) => {
      acc[page.category] = (acc[page.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryColors = {
      backend: 'success',
      frontend: 'primary',
      database: 'warning',
      config: 'info'
    } as const;

    const categoryNames = {
      backend: '后端代码',
      frontend: '前端代码',
      database: '数据库',
      config: '配置文件'
    };

    return (
      <Box>
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {Object.entries(categoryStats).map(([category, count]) => (
            <Chip
              key={category}
              label={`${categoryNames[category as keyof typeof categoryNames]} (${count})`}
              color={categoryColors[category as keyof typeof categoryColors]}
              variant="outlined"
              sx={{
                '& .MuiChip-label': {
                  fontSize: '14px'
                }
              }}
            />
          ))}
        </Box>

        <Grid container spacing={2}>
          {codePages.map((page) => (
            <Grid item xs={12} sm={6} md={4} key={page.id}>
              <Paper
                sx={{
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip
                    label={categoryNames[page.category]}
                    color={categoryColors[page.category]}
                    size="small"
                    sx={{
                      mr: 1,
                      '& .MuiChip-label': {
                        fontSize: '14px'
                      }
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {page.lineCount} 行
                  </Typography>
                </Box>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {page.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, flex: 1 }}
                >
                  {page.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewCode(page)}
                    sx={{ flex: 1 }}
                  >
                    查看代码
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  // 渲染架构信息（简化版）
  const renderArchitectureSummary = () => {
    if (!architectureSummary) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <AccountTreeIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            暂无架构信息
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            请先生成代码文件，系统会自动分析并展示项目架构信息
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setActiveTab(0)}
            startIcon={<CodeIcon />}
          >
            返回代码生成
          </Button>
        </Box>
      );
    }

    // 简单的markdown解析
    const lines = architectureSummary.split('\n');
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        elements.push(
          <Typography key={index} variant="h4" gutterBottom sx={{ color: 'primary.main', mt: 2, mb: 2 }}>
            {line.substring(2)}
          </Typography>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <Typography key={index} variant="h5" gutterBottom sx={{ color: 'primary.main', mt: 3, mb: 1 }}>
            {line.substring(3)}
          </Typography>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <Typography key={index} variant="h6" gutterBottom sx={{ color: 'text.primary', mt: 2, mb: 1 }}>
            {line.substring(4)}
          </Typography>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <Typography key={index} component="li" variant="body2" sx={{ mb: 0.5, ml: 2 }}>
            {line.substring(2)}
          </Typography>
        );
      } else if (line.trim()) {
        elements.push(
          <Typography key={index} variant="body1" paragraph>
            {line}
          </Typography>
        );
      }
    });

    return (
      <Paper sx={{ p: 3, backgroundColor: theme.palette.grey[50] }}>
        {elements}
      </Paper>
    );
  };

  // 渲染技术说明书（简化版）
  const renderDocumentation = () => {
    if (!documentContent) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <DescriptionIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            暂无技术说明书
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            请先生成代码文件，系统会自动创建技术说明书
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setActiveTab(0)}
            startIcon={<CodeIcon />}
          >
            返回代码生成
          </Button>
        </Box>
      );
    }

    return (
      <Paper sx={{ p: 3, backgroundColor: theme.palette.grey[50] }}>
        <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
          {documentContent}
        </Typography>
      </Paper>
    );
  };

  // 导出所有代码为ZIP（包含每个代码文件的单独DOC）
  const handleExportCodeZip = async () => {
    if (!softwareInfo || codePages.length === 0) {
      showSnackbar('请先生成代码文件', 'error');
      return;
    }

    try {
      const zip = new JSZip();

      const getCategoryName = (category: string) => {
        const names = {
          backend: '后端代码',
          frontend: '前端代码',
          database: '数据库',
          config: '配置文件'
        };
        return names[category as keyof typeof names] || category;
      };

      // 为每个代码文件创建单独的DOC文档
      codePages.forEach((page) => {
        const pageHeader = `${softwareInfo.softwareName} ver ${softwareInfo.version} - ${page.title}`;

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${page.title}</title>
  <style>
    @page {
      size: A4;
      margin: 2.54cm;
    }
    body {
      font-family: "宋体", SimSun, serif;
      font-size: 12px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }
    .header {
      text-align: center;
      font-size: 10px;
      border-bottom: 1px solid #000;
      padding-bottom: 5px;
      margin-bottom: 20px;
    }
    .title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin: 30px 0;
    }
    .info-section {
      margin: 20px 0;
    }
    .info-item {
      margin: 8px 0;
      font-size: 12px;
    }
    .code-section {
      margin: 30px 0;
    }
    .code-content {
      background-color: #f5f5f5;
      padding: 15px;
      border: 1px solid #ddd;
      font-size: 10px;
      font-family: 'Courier New', monospace;
      white-space: pre-wrap;
      margin: 10px 0;
      line-height: 1.3;
    }
  </style>
</head>
<body>
  <div class="header">${pageHeader}</div>
  
  <div class="title">${page.title}</div>
  
  <div class="info-section">
    <h3 style="font-size: 14px; font-weight: bold; margin: 15px 0;">文件信息</h3>
    <div class="info-item"><strong>文件名称：</strong>${page.title}</div>
    <div class="info-item"><strong>文件类别：</strong>${getCategoryName(page.category)}</div>
    <div class="info-item"><strong>代码行数：</strong>${page.lineCount} 行</div>
    <div class="info-item"><strong>文件描述：</strong>${page.description}</div>
    <div class="info-item"><strong>所属项目：</strong>${softwareInfo.softwareName} v${softwareInfo.version}</div>
    <div class="info-item"><strong>开发语言：</strong>${softwareInfo.developmentLanguage}</div>
    <div class="info-item"><strong>开发者：</strong>${softwareInfo.developer}</div>
  </div>
  
  <div class="code-section">
    <h3 style="font-size: 14px; font-weight: bold; margin: 15px 0;">源代码内容</h3>
    <div class="code-content">${page.content}</div>
  </div>
</body>
</html>`;

        // 添加到ZIP文件中
        const fileName = `${page.title.replace(/[<>:"/\\|?*]/g, '_')}.doc`;
        zip.file(fileName, htmlContent);
      });

      // 添加项目信息文件
      const projectInfo = `
项目信息
========
软件名称: ${softwareInfo.softwareName}
版本号: ${softwareInfo.version}
开发语言: ${softwareInfo.developmentLanguage}
平台: ${softwareInfo.platforms.join(', ')}
数据库: ${softwareInfo.database}
开发者: ${softwareInfo.developer}
公司: ${softwareInfo.company}
完成日期: ${softwareInfo.completionDate}
软件类型: ${softwareInfo.softwareType}
行业领域: ${softwareInfo.industry}

功能描述:
${softwareInfo.functionalDescription}

代码文件清单:
${codePages.map((page, index) => `${index + 1}. ${page.title} (${getCategoryName(page.category)}) - ${page.lineCount}行`).join('\n')}
`;
      zip.file('项目信息.txt', projectInfo);

      // 生成并下载ZIP文件
      const content = await zip.generateAsync({ type: 'blob' });
      const fileName = `${softwareInfo.softwareName}_v${softwareInfo.version}_代码文档包.zip`;
      saveAs(content, fileName);

      showSnackbar(`代码文档包导出成功！包含${codePages.length}个DOC文件`, 'success');
    } catch (error) {
      console.error('导出失败:', error);
      showSnackbar('导出失败，请重试', 'error');
    }
  };

  useEffect(() => {
    if (shouldGenerate && softwareInfo?.softwareName && softwareInfo?.functionalDescription && softwareInfo?.prompt && !isGenerating) {
      handleGenerate();
    }
  }, [shouldGenerate]);

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardContent sx={{ p: 0, height: '100%', '&:last-child': { pb: 0 } }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '14px' }}>
                  <CodeIcon />
                  代码生成
                  {codePages.length > 0 && (
                    <Chip
                      label={codePages.length}
                      size="small"
                      color="primary"
                      sx={{
                        minWidth: 20,
                        height: 16,
                        mr: 1,
                        marginTop: '5px',
                        marginBottom: '5px',
                        '& .MuiChip-label': {
                          fontSize: '14px'
                        }
                      }}
                    />
                  )}
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '14px' }}>
                  <AccountTreeIcon />
                  架构信息
                  {architectureSummary && (
                    <Chip
                      label="已生成"
                      size="small"
                      color="success"
                      sx={{
                        minWidth: 20,
                        height: 16,
                        mr: 1,
                        marginTop: '5px',
                        marginBottom: '5px',
                        '& .MuiChip-label': {
                          fontSize: '12px'
                        }
                      }}
                    />
                  )}
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '14px' }}>
                  <DescriptionIcon />
                  技术说明书
                  {documentContent && (
                    <Chip
                      label="已生成"
                      size="small"
                      color="success"
                      sx={{
                        minWidth: 20,
                        height: 16,
                        mr: 1,
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        '& .MuiChip-label': {
                          fontSize: '12px'
                        }
                      }}
                    />
                  )}
                </Box>
              }
            />
          </Tabs>
        </Box>

        <Box sx={{ height: 'calc(100% - 48px)', overflow: 'hidden' }}>
          {/* 代码生成标签页 */}
          {activeTab === 0 && (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* 生成控制面板 */}
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon color="primary" />
                    智能代码生成 - 带上下文关联
                  </Typography>
                  {/* <Chip 
                    label={pageConfig.environmentText}
                    color={pageConfig.minPages === 1 ? "warning" : "success"}
                    variant="outlined"
                  /> */}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {pageConfig.description}
                  {codePages.length === 0 && " 点击下方按钮开始生成具有完整上下文关联的代码文件。"}
                </Typography>

                {!isGenerating && codePages.length === 0 && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGenerate}
                    startIcon={<PlayArrowIcon />}
                    sx={{ mr: 2 }}
                    disabled={!softwareInfo}
                  >
                    生成项目代码及白皮书
                  </Button>
                )}

                {!isGenerating && codePages.length === 0 && (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleTestConnection}
                    startIcon={isTestingConnection ? <CircularProgress size={16} /> : <RefreshIcon />}
                    disabled={isTestingConnection}
                    sx={{ mr: 2 }}
                  >
                    {isTestingConnection ? '测试中...' : '测试API连接'}
                  </Button>
                )}

                {isGenerating && (
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {generationProgress.message}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={generationProgress.total > 0 ? (generationProgress.current / generationProgress.total) * 100 : 0}
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {generationProgress.current}/{generationProgress.total} - {generationProgress.currentPage}
                    </Typography>
                  </Box>
                )}

                {!isGenerating && codePages.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      onClick={handleGenerate}
                      startIcon={<RefreshIcon />}
                      disabled={!softwareInfo}
                    >
                      重新生成
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setActiveTab(1)}
                      startIcon={<AccountTreeIcon />}
                    >
                      查看架构信息
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setActiveTab(2)}
                      startIcon={<DescriptionIcon />}
                    >
                      查看说明书
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleExportDoc}
                      startIcon={<FileDownloadIcon />}
                      color="success"
                      disabled={!documentContent}
                    >
                      导出完整说明书DOC
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleExportCodeZip}
                      startIcon={<ArchiveIcon />}
                      color="success"
                      disabled={codePages.length === 0}
                    >
                      下载代码文档ZIP
                    </Button>
                  </Box>
                )}
              </Box>

              {/* 代码页面列表 */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {renderCodePages()}
              </Box>
            </Box>
          )}

          {/* 架构信息标签页 */}
          {activeTab === 1 && (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AccountTreeIcon color="primary" />
                  项目架构信息
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  以下是生成代码的架构信息和模块关联性，确保所有代码文件具有统一的结构和依赖关系。
                </Typography>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                {renderArchitectureSummary()}
              </Box>
            </Box>
          )}

          {/* 技术说明书标签页 */}
          {activeTab === 2 && (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon color="primary" />
                    技术说明书
                  </Typography>
                  {documentContent && (
                    <Button
                      variant="contained"
                      onClick={handleExportDoc}
                      startIcon={<FileDownloadIcon />}
                      color="success"
                      size="small"
                    >
                      导出DOC文档
                    </Button>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  基于生成的代码自动创建的详细技术说明书，符合软件著作权申报要求。
                </Typography>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                {renderDocumentation()}
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>

      {/* 代码查看对话框 */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { height: '80vh' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CodeIcon />
          {selectedPage?.title}
          <Chip
            label={`${selectedPage?.lineCount} 行`}
            size="small"
            color="primary"
            sx={{
              ml: 'auto',
              '& .MuiChip-label': {
                fontSize: '14px'
              }
            }}
          />
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2 }}>
          {selectedPage && (
            <Box
              component="pre"
              sx={{
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                margin: 0,
                backgroundColor: theme.palette.grey[50],
                padding: 2,
                borderRadius: 1,
                overflow: 'auto'
              }}
            >
              {selectedPage.content}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>关闭</Button>
        </DialogActions>
      </Dialog>

      {/* 消息提示 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default GenerationBoard;
