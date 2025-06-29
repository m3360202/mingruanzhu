import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

interface NavBarProps {
  activePage?: string;
}

const NavBar: React.FC<NavBarProps> = ({ activePage }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { name: '首页', path: '/', key: 'home', icon: <HomeIcon /> },
    { name: '探索', path: '/explore', key: 'explore', icon: <ExploreIcon /> },
    { name: '工作台', path: '/dashboard', key: 'dashboard', icon: <DashboardIcon /> }
  ];

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
          >
            智慧树软著
          </Typography>
        </Link>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', gap: isMobile ? 1 : 2 }}>
          {navItems.map((item) => (
            <Link key={item.key} href={item.path} style={{ textDecoration: 'none' }}>
              <Button
                startIcon={!isMobile ? item.icon : undefined}
                sx={{
                  color: activePage === item.key ? theme.palette.primary.main : '#666',
                  fontWeight: activePage === item.key ? 'bold' : 'normal',
                  backgroundColor: activePage === item.key ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                  borderRadius: 2,
                  px: isMobile ? 1 : 2,
                  minWidth: isMobile ? 'auto' : 'initial',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                    color: theme.palette.primary.main
                  }
                }}
              >
                {isMobile ? item.icon : item.name}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar; 