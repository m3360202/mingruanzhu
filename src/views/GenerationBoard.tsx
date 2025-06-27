import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Code as CodeIcon,
  Description as DescriptionIcon,
  BugReport as BugReportIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { SoftwareInfo, CodePage } from '@/types/software';

interface GenerationBoardProps {
  softwareInfo?: SoftwareInfo;
  onGenerate?: (info: SoftwareInfo) => void;
}

// 10页测试数据
const TEST_CODE_PAGES: CodePage[] = [
  {
    id: 1,
    title: '用户管理控制器',
    content: `# 用户管理控制器

\`\`\`java
package com.example.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.service.UserService;
import com.example.model.User;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
}
\`\`\``,
    lineCount: 52,
    isChecking: false,
    category: 'backend',
    description: 'RESTful API接口控制器，处理用户相关的HTTP请求'
  },
  {
    id: 2,
    title: '用户服务层',
    content: `# 用户服务层

\`\`\`java
package com.example.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.repository.UserRepository;
import com.example.model.User;
import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User createUser(User user) {
        validateUser(user);
        return userRepository.save(user);
    }
}
\`\`\``,
    lineCount: 68,
    isChecking: false,
    category: 'backend',
    description: '业务逻辑处理层，封装用户管理的核心业务逻辑'
  },
  {
    id: 3,
    title: '用户数据模型',
    content: `# 用户数据模型

\`\`\`java
package com.example.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false, unique = true, length = 255)
    private String email;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
\`\`\``,
    lineCount: 75,
    isChecking: false,
    category: 'backend',
    description: 'JPA实体类，定义用户数据结构和数据库映射关系'
  },
  {
    id: 4,
    title: '数据访问层',
    content: `# 数据访问层

\`\`\`java
package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.model.User;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    List<User> findByNameContaining(String name);
    
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmailCustom(@Param("email") String email);
}
\`\`\``,
    lineCount: 58,
    isChecking: false,
    category: 'backend',
    description: 'Spring Data JPA数据访问接口，提供数据库CRUD操作'
  },
  {
    id: 5,
    title: '系统配置类',
    content: `# 系统配置类

\`\`\`java
package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class SystemConfig {
    
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}
\`\`\``,
    lineCount: 63,
    isChecking: false,
    category: 'backend',
    description: 'Spring Boot系统配置，包含跨域设置和应用参数配置'
  },
  {
    id: 6,
    title: '前端用户管理页面',
    content: `# 前端用户管理页面

\`\`\`jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  Dialog,
  TextField,
  Typography
} from '@mui/material';
import { userService } from '../services/userService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('加载用户失败:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleSave = async (userData) => {
    try {
      if (selectedUser.id) {
        await userService.updateUser(selectedUser.id, userData);
      } else {
        await userService.createUser(userData);
      }
      loadUsers();
      setDialogOpen(false);
    } catch (error) {
      console.error('保存用户失败:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>用户管理</Typography>
      
      <Button 
        variant="contained" 
        onClick={() => handleEdit({})}
        sx={{ mb: 2 }}
      >
        新增用户
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>姓名</TableCell>
            <TableCell>邮箱</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(user)}>编辑</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UserManagement;
\`\`\``,
    lineCount: 71,
    isChecking: false,
    category: 'frontend',
    description: 'React用户管理界面组件，提供用户列表展示和编辑功能'
  },
  {
    id: 7,
    title: '前端API服务层',
    content: `# 前端API服务层

\`\`\`javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 用户相关API
export const userService = {
  getAllUsers: () => apiClient.get('/users'),
  getUserById: (id) => apiClient.get(\`/users/\${id}\`),
  createUser: (user) => apiClient.post('/users', user),
  updateUser: (id, user) => apiClient.put(\`/users/\${id}\`, user),
  deleteUser: (id) => apiClient.delete(\`/users/\${id}\`)
};

export default apiClient;
\`\`\``,
    lineCount: 59,
    isChecking: false,
    category: 'frontend',
    description: 'Axios HTTP客户端封装，处理前端与后端API的通信'
  },
  {
    id: 8,
    title: '前端路由配置',
    content: `# 前端路由配置

\`\`\`jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// 页面组件
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Login from './pages/Login';

// 主题配置
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// 路由守卫组件
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
\`\`\``,
    lineCount: 56,
    isChecking: false,
    category: 'frontend',
    description: 'React Router路由配置，定义应用的页面导航和访问控制'
  },
  {
    id: 9,
    title: '前端状态管理',
    content: `# 前端状态管理

\`\`\`javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 用户状态管理
export const useUserStore = create(
  persist(
    (set, get) => ({
      // 状态
      user: null,
      users: [],
      loading: false,
      error: null,

      // 动作
      setUser: (user) => set({ user }),
      
      setUsers: (users) => set({ users }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      // 异步操作
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
          });
          
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            set({ user: data.user, loading: false });
            return true;
          } else {
            throw new Error('登录失败');
          }
        } catch (error) {
          set({ error: error.message, loading: false });
          return false;
        }
      },
      
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null });
      },
      
      fetchUsers: async () => {
        set({ loading: true });
        try {
          const response = await fetch('/api/users');
          const users = await response.json();
          set({ users, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);

// 应用全局状态
export const useAppStore = create((set) => ({
  theme: 'light',
  sidebarOpen: true,
  notifications: [],
  
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  
  toggleSidebar: () => set((state) => ({ 
    sidebarOpen: !state.sidebarOpen 
  })),
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, id: Date.now() }]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
}));
\`\`\``,
    lineCount: 78,
    isChecking: false,
    category: 'frontend',
    description: 'Zustand状态管理，管理应用的全局状态和用户数据'
  },
  {
    id: 10,
    title: '数据库初始化脚本',
    content: `# 数据库初始化脚本

\`\`\`sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS user_management_system 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE user_management_system;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '用户姓名',
    email VARCHAR(255) NOT NULL UNIQUE COMMENT '用户邮箱',
    phone VARCHAR(20) COMMENT '联系电话',
    password VARCHAR(255) NOT NULL COMMENT '密码哈希',
    status TINYINT DEFAULT 1 COMMENT '用户状态：1-正常，0-禁用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB COMMENT='用户信息表';

-- 创建角色表
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT '角色名称',
    description TEXT COMMENT '角色描述',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='角色表';

-- 创建用户角色关联表
CREATE TABLE IF NOT EXISTS user_roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_role (user_id, role_id)
) ENGINE=InnoDB COMMENT='用户角色关联表';

-- 插入初始数据
INSERT INTO roles (name, description) VALUES 
('ADMIN', '系统管理员'),
('USER', '普通用户'),
('MANAGER', '管理员');

-- 插入测试用户
INSERT INTO users (name, email, password, status) VALUES 
('系统管理员', 'admin@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 1),
('张三', 'zhangsan@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 1),
('李四', 'lisi@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 1);

-- 分配角色
INSERT INTO user_roles (user_id, role_id) VALUES 
(1, 1), -- admin用户分配管理员角色
(2, 2), -- 张三分配普通用户角色
(3, 2); -- 李四分配普通用户角色
\`\`\``,
    lineCount: 67,
    isChecking: false,
    category: 'database',
    description: 'MySQL数据库初始化脚本，创建表结构和基础数据'
  }
];

const GenerationBoard: React.FC<GenerationBoardProps> = ({ softwareInfo, onGenerate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [codePages] = useState<CodePage[]>(TEST_CODE_PAGES);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<CodePage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // 检查代码bug
  const checkBugs = async (page: CodePage) => {
    // 模拟AI检查过程
    await new Promise(resolve => setTimeout(resolve, 1500));
    const hasError = Math.random() > 0.7;
    const result = hasError 
      ? '发现潜在问题：建议添加异常处理'
      : '代码检查通过，未发现问题';
    
    alert(`检查结果: ${result}`);
  };

  // 查看代码详情
  const viewCode = (page: CodePage) => {
    setSelectedPage(page);
    setDialogOpen(true);
  };

  // 生成说明书
  const generateDocumentation = (info: SoftwareInfo) => {
    const doc = `
# ${info.softwareName} 软件说明书

## 1. 软件概述
**软件名称**: ${info.softwareName}
**版本号**: ${info.version}
**开发者**: ${info.developer}
**开发完成日期**: ${info.completionDate}

## 2. 运行环境
**支持平台**: ${info.platforms.join(', ')}
**开发语言**: ${info.developmentLanguage}
**数据库**: ${info.database}

## 3. 功能说明
${info.functionalDescription}

## 4. 技术架构
本软件采用现代化架构设计，具有以下特点：
- 模块化设计，便于维护和扩展
- 采用${info.developmentLanguage}开发，性能优异
- 支持多平台部署：${info.platforms.join('、')}
- 使用${info.database}数据库，数据存储安全可靠

## 5. 主要功能模块
1. 用户管理模块
2. 数据处理模块
3. 业务逻辑模块
4. 系统配置模块
5. 安全认证模块
    `;
    
    setDocumentContent(doc);
  };

  // 监听软件信息变化
  useEffect(() => {
    if (softwareInfo && softwareInfo.softwareName) {
      generateDocumentation(softwareInfo);
    }
  }, [softwareInfo]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // 渲染markdown内容
  const renderMarkdown = (content: string) => {
    return content
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background-color: #f5f5f5; padding: 16px; border-radius: 4px; overflow: auto; font-family: Monaco, Consolas, monospace; font-size: 13px; line-height: 1.4;"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code style="background-color: #f5f5f5; padding: 2px 4px; border-radius: 4px; font-family: Monaco, Consolas, monospace; font-size: 13px;">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 style="color: #1976d2; margin-top: 16px; margin-bottom: 8px;">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 style="color: #1976d2; margin-top: 16px; margin-bottom: 8px;">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 style="color: #1976d2; margin-top: 16px; margin-bottom: 8px;">$1</h3>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      p: isMobile ? 1 : 2
    }}>
      <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant={isMobile ? 'fullWidth' : 'standard'}
          >
            <Tab 
              icon={<CodeIcon />} 
              label={`代码文件 (${codePages.length}页)`}
              iconPosition="start"
            />
            <Tab 
              icon={<DescriptionIcon />} 
              label="软件说明书"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          {/* 代码列表 */}
          {activeTab === 0 && (
            <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
              <List>
                {codePages.map((page) => (
                  <ListItem
                    key={page.id}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {page.title}
                          </Typography>
                          <Chip 
                            label={page.category === 'frontend' ? '前端' : page.category === 'backend' ? '后端' : '数据库'} 
                            size="small" 
                            color={page.category === 'frontend' ? 'primary' : page.category === 'backend' ? 'success' : 'warning'}
                            variant="filled"
                          />
                          <Chip 
                            label={`${page.lineCount}行`} 
                            size="small" 
                            color="default" 
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {page.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            第{page.id}页 • {page.lineCount}行代码
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="查看代码">
                        <IconButton onClick={() => viewCode(page)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="检查Bug">
                        <IconButton onClick={() => checkBugs(page)}>
                          <BugReportIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* 说明书 */}
          {activeTab === 1 && (
            <Box sx={{ height: '100%', overflow: 'auto', p: 3 }}>
              {documentContent ? (
                <Box>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                      软件说明书
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => alert('PDF下载功能开发中...')}
                    >
                      下载PDF
                    </Button>
                  </Box>
                  <Paper elevation={0} sx={{ p: 3, backgroundColor: '#fafafa' }}>
                    <Typography 
                      component="pre" 
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        lineHeight: 1.6
                      }}
                    >
                      {documentContent}
                    </Typography>
                  </Paper>
                </Box>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%'
                }}>
                  <DescriptionIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                    说明书将在填写软件信息后自动创建
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Paper>

      {/* 代码查看对话框 - Markdown格式 */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { height: '80vh' }
        }}
      >
        <DialogTitle>
          <Typography variant="h6">{selectedPage?.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedPage?.lineCount}行代码
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              height: '100%',
              overflow: 'auto'
            }}
            dangerouslySetInnerHTML={{
              __html: selectedPage?.content ? renderMarkdown(selectedPage.content) : ''
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            关闭
          </Button>
          <Button 
            variant="contained" 
            onClick={() => selectedPage && checkBugs(selectedPage)}
          >
            检查Bug
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GenerationBoard;
