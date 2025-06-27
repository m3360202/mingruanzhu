"use client";

import React, { useState } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import SideBar from "@/components/SideBar";
import GenerationBoard from "@/views/GenerationBoard";
import { SoftwareInfo } from "@/types/software";

const SoftwareCopyrightPage: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [softwareInfo, setSoftwareInfo] = useState<SoftwareInfo | undefined>();

  const handleInfoChange = (info: SoftwareInfo) => {
    setSoftwareInfo(info);
  };

  const handleGenerate = (info: SoftwareInfo) => {
    setSoftwareInfo(info);
    // 这里可以添加额外的生成逻辑
  };

  return (
    <>
      <Head>
        <title>智慧树 软著代码+说明书生成系统 - ver 1.0.0</title>
        <meta name="description" content="中国软件著作权申报材料自动生成系统" />
        <meta name="keywords" content="软件著作权,代码生成,说明书,申报材料" />
      </Head>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            overflow: 'hidden',
            flexDirection: isMobile ? 'column' : 'row'
          }}
        >
          {/* 左侧边栏 - 软著信息表单 */}
          <Box
            sx={{
              width: isMobile ? '100%' : '38%',
              minWidth: isMobile ? 'auto' : '360px',
              maxWidth: isMobile ? 'none' : '420px',
              height: isMobile ? 'auto' : '100%',
              overflow: 'auto',
              borderRight: isMobile ? 'none' : 1,
              borderColor: 'divider',
              backgroundColor: '#fafafa'
            }}
          >
            <SideBar 
              onInfoChange={handleInfoChange}
              onGenerate={handleGenerate}
            />
          </Box>

          {/* 右侧主内容区 - 代码生成和说明书展示 */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0, // 防止flex子项溢出
              height: isMobile ? 'auto' : '100%',
              overflow: 'hidden',
              backgroundColor: '#ffffff'
            }}
          >
            <GenerationBoard 
              softwareInfo={softwareInfo}
              onGenerate={handleGenerate}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SoftwareCopyrightPage;
