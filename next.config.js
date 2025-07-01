/** @type {import('next').NextConfig} */
require('dotenv').config();
const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  
  hideSourceMaps: true,

  disableServerWebpackPlugin: true,
  disableEd: true,
  // This option will automatically provide performance monitoring for Next.js
  // data-fetching methods and API routes, making the manual wrapping of API
  // routes via `withSentry` redundant.
  autoInstrumentServerFunctions: true
};

const nextConfigWithOutSentry = {
  output: "standalone",
  reactStrictMode: true,
  basePath: "",

  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/styles": {
      transform: "@mui/styles/{{member}}",
    },
    "@mui/lab": {
      transform: "@mui/lab/{{member}}",
    },
  },

  // Add build optimization configuration
  swcMinify: false, // Use SWC for code compression
  compiler: {
    // Remove console and debugger
    removeConsole: process.env.NODE_ENV === "production",
    // Enable SWC compilation
    styledComponents: true,
  },

  // Optimize font loading
  optimizeFonts: true,

  // Optimize page loading
  poweredByHeader: false,
  generateEtags: process.env.NODE_ENV === "production",

  // Configure SSR caching strategy
  onDemandEntries: {
    // How long a page should be kept in memory
    maxInactiveAge: 15 * 1000,
    // Number of pages that should be kept in memory
    pagesBufferLength: 2,
  },

  webpack: (config, { dev, isServer }) => {
    Object.assign(config.resolve.alias, {
      "@": "./src/",
    });

    // Fix for AOS CSS syntax error
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes("_app")) return;
          one.issuer.and = [require.resolve("./pages/_app.tsx")];
        });
      }
    });

    return config;
  },
  images: {
    // Enable image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['mingruanzhu.aliensoft.com.cn'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // i18n: {
  //   locales: ["en-US", "zh-CN"],
  //   defaultLocale: "",
  //   localeDetection: false,
  // },
  // async redirects() {
  //   // Only enable redirects in production environment and when HOST is properly configured
  //   if (process.env.NODE_ENV === "production" && process.env.HOST && process.env.HOST !== 'localhost:3000' && process.env.HOST !== 'localhost') {
  //     return [
  //       {
  //         source: "/:path*",
  //         destination: `${process.env.HOST}/:path*`,
  //         permanent: false,
  //         locale: false,
  //       },
  //     ];
  //   }
  //   return [];
  // },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiEndpoint: process.env.API_ENDPOINT,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiEndpoint: process.env.API_ENDPOINT,
  },
  headers: async () => [
    {
      // Cache strategy for favicon and other static files
      source: "/:path(favicon.png|robots.txt|sitemap.xml)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, must-revalidate",
        },
      ],
    },
    {
      // Cache strategy for other paths
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, must-revalidate",
        },
      ],
    },
  ],
};

const nextConfig = process.env.TARGET ? withSentryConfig(
  nextConfigWithOutSentry,
  sentryWebpackPluginOptions
  ) : nextConfigWithOutSentry;

module.exports = nextConfig;
