import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Divider,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { SoftwareInfo } from '@/types/software';

interface SideBarProps {
  onInfoChange?: (info: SoftwareInfo) => void;
  onGenerate?: (info: SoftwareInfo) => void;
}

const platformOptions = [
  'iOS',
  'Android', 
  'Windows PC',
  'Mac OS',
  'Linux',
  'Web浏览器',
  'Windows Server',
  'Linux Server',
  '嵌入式系统',
  '微信小程序',
  '支付宝小程序'
];

const languageOptions = [
  'Java',
  'Python',
  'JavaScript',
  'TypeScript',
  'C++',
  'C#',
  'Swift',
  'Kotlin',
  'Go',
  'PHP',
  'Ruby',
  'Vue.js',
  'React',
  'Node.js'
];

const databaseOptions = [
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Oracle',
  'SQL Server',
  'SQLite',
  'Firebase',
  'DynamoDB'
];

const softwareTypeOptions = [
  '应用软件',
  '系统软件',
  '支撑软件',
  '中间件',
  '嵌入式软件',
  '游戏软件',
  '移动应用'
];

const industryOptions = [
  '互联网',
  '金融',
  '教育',
  '医疗',
  '电商',
  '企业管理',
  '通信',
  '制造业',
  '交通运输',
  '政务',
  '娱乐',
  '其他'
];

const SideBar: React.FC<SideBarProps> = ({ onInfoChange, onGenerate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [softwareInfo, setSoftwareInfo] = useState<SoftwareInfo>({
    softwareName: '',
    version: '1.0.0',
    platforms: [],
    developmentLanguage: '',
    database: '',
    developer: '',
    company: '',
    contact: '',
    email: '',
    address: '',
    completionDate: new Date().toISOString().split('T')[0],
    publishDate: new Date().toISOString().split('T')[0],
    softwareType: '',
    industry: '',
    functionalDescription: '',
    prompt: ''
  });

  const handleInputChange = (field: keyof SoftwareInfo) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newInfo = { ...softwareInfo, [field]: event.target.value };
    setSoftwareInfo(newInfo);
    onInfoChange?.(newInfo);
  };

  const handleSelectChange = (field: keyof SoftwareInfo) => (
    event: SelectChangeEvent<string>
  ) => {
    const newInfo = { ...softwareInfo, [field]: event.target.value };
    setSoftwareInfo(newInfo);
    onInfoChange?.(newInfo);
  };

  const handlePlatformChange = (event: SelectChangeEvent<typeof softwareInfo.platforms>) => {
    const value = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
    const newInfo = { ...softwareInfo, platforms: value };
    setSoftwareInfo(newInfo);
    onInfoChange?.(newInfo);
  };

  const handleGenerate = () => {
    onGenerate?.(softwareInfo);
  };

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : 380,
        height: '100%',
        overflow: 'auto',
        p: 2,
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          软著申报信息
        </Typography>
        
        <Divider sx={{ mb: 3 }} />

        {/* 基本信息 */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
          基本信息
        </Typography>
        
        <TextField
          fullWidth
          label="软件名称*"
          value={softwareInfo.softwareName}
          onChange={handleInputChange('softwareName')}
          margin="normal"
          size="small"
          required
        />

        <TextField
          fullWidth
          label="版本号*"
          value={softwareInfo.version}
          onChange={handleInputChange('version')}
          margin="normal"
          size="small"
          placeholder="如：1.0.0"
          required
        />

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>软件平台*</InputLabel>
          <Select
            multiple
            value={softwareInfo.platforms}
            onChange={handlePlatformChange}
            input={<OutlinedInput label="软件平台*" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {platformOptions.map((platform) => (
              <MenuItem key={platform} value={platform}>
                {platform}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>开发语言*</InputLabel>
          <Select
            value={softwareInfo.developmentLanguage}
            onChange={handleSelectChange('developmentLanguage')}
            label="开发语言*"
          >
            {languageOptions.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>数据库</InputLabel>
          <Select
            value={softwareInfo.database}
            onChange={handleSelectChange('database')}
            label="数据库"
          >
            {databaseOptions.map((db) => (
              <MenuItem key={db} value={db}>
                {db}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="开发完成日期*"
          type="date"
          value={softwareInfo.completionDate}
          onChange={handleInputChange('completionDate')}
          margin="normal"
          size="small"
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          fullWidth
          label="首次发表日期"
          type="date"
          value={softwareInfo.publishDate}
          onChange={handleInputChange('publishDate')}
          margin="normal"
          size="small"
          InputLabelProps={{ shrink: true }}
        />

        <Divider sx={{ my: 3 }} />

        {/* 申请人信息 */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
          申请人信息
        </Typography>

        <TextField
          fullWidth
          label="开发者姓名*"
          value={softwareInfo.developer}
          onChange={handleInputChange('developer')}
          margin="normal"
          size="small"
          required
        />

        <TextField
          fullWidth
          label="公司/组织"
          value={softwareInfo.company}
          onChange={handleInputChange('company')}
          margin="normal"
          size="small"
        />

        <TextField
          fullWidth
          label="联系电话*"
          value={softwareInfo.contact}
          onChange={handleInputChange('contact')}
          margin="normal"
          size="small"
          required
        />

        <TextField
          fullWidth
          label="邮箱*"
          type="email"
          value={softwareInfo.email}
          onChange={handleInputChange('email')}
          margin="normal"
          size="small"
          required
        />

        <TextField
          fullWidth
          label="联系地址*"
          value={softwareInfo.address}
          onChange={handleInputChange('address')}
          margin="normal"
          size="small"
          multiline
          rows={2}
          required
        />

        <Divider sx={{ my: 3 }} />

        {/* 软件分类 */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
          软件分类
        </Typography>

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>软件类型*</InputLabel>
          <Select
            value={softwareInfo.softwareType}
            onChange={handleSelectChange('softwareType')}
            label="软件类型*"
          >
            {softwareTypeOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>行业领域*</InputLabel>
          <Select
            value={softwareInfo.industry}
            onChange={handleSelectChange('industry')}
            label="行业领域*"
          >
            {industryOptions.map((industry) => (
              <MenuItem key={industry} value={industry}>
                {industry}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        {/* 功能描述 */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
          功能描述
        </Typography>

        <TextField
          fullWidth
          label="软件主要功能*"
          value={softwareInfo.functionalDescription}
          onChange={handleInputChange('functionalDescription')}
          margin="normal"
          size="small"
          multiline
          rows={4}
          placeholder="请详细描述软件的主要功能、技术特点和创新点..."
          required
        />

        <TextField
          fullWidth
          label="AI生成提示词*"
          value={softwareInfo.prompt}
          onChange={handleInputChange('prompt')}
          margin="normal"
          size="small"
          multiline
          rows={3}
          placeholder="请输入用于AI生成代码的详细提示词..."
          required
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleGenerate}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            fontSize: '14px',
            color: '#ffffff',
            cursor: 'pointer',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
          }}
          disabled={!softwareInfo.softwareName || !softwareInfo.developer || !softwareInfo.functionalDescription}
        >
          生成项目代码及白皮书
        </Button>
      </Paper>
    </Box>
  );
};

export default SideBar;