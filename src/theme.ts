import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Italiana, KoHo } from 'next/font/google';

// Setup Google Fonts with next/font
export const italiana = Italiana({ 
  weight: ['400'], 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-italiana',
});

export const koho = KoHo({ 
  weight: ['400', '500'], 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-koho',
});

// declare module '@mui/material/styles' {
//   interface BreakpointOverrides {
//     // xs: false; // removes the `xs` breakpoint
//     // xl: false;
//     mobile: true;
//   }
// }

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#000'
    },
    text: {
      primary: '#000',
      secondary: '#666F8D'
    }
  },
  spacing: (factor: number) => `${0.8 * factor}rem`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 0,
      md: 768,
      lg: 1024,
      xl: 1920
    }
  },
  typography: {
    htmlFontSize: 10,
    fontWeightLight: 400,
    fontWeightMedium: 400,
    fontWeightRegular: 400,
    fontWeightBold: 500,
    fontFamily: `var(--font-koho)`,
    h1: { fontWeight: 'bold' },
    h2: { fontWeight: 'bold' },
    h3: { fontWeight: 'bold' },
    h4: { fontWeight: 'bold' },
    h5: { fontWeight: 'bold' },
    h6: { fontWeight: 'bold' },
    body1: {
      lineHeight: 2,
      fontSize: '14px'
    },
    subtitle1: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: '14px'
    },
    button: {
      fontSize: '14px'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: `var(--font-koho)`
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          borderRadius: 28,
          fontSize: '14px'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            fontSize: '14px'
          },
          '& .MuiInputLabel-root': {
            fontSize: '12px'
          },
          '& .MuiFormHelperText-root': {
            fontSize: '12px'
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: '14px'
        },
        select: {
          fontSize: '14px'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '12px'
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '12px'
        }
      }
    }
  }
});

export default responsiveFontSizes(theme);

export const stlTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        light: '#66D08E',
        main: '#348A55'
      },
      secondary: {
        main: '#FFD363'
      },
      info: {
        main: '#FFFFFF'
      },
      success: {
        light: '#57DE56',
        main: '#348A55',
        dark: '#526F66'
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#535363'
      }
    },
    typography: {
      fontFamily: [
        '"Poppins"',
        'Microsoft YaHei',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      h1: {
        fontSize: '5.6rem',
        fontWeight: 'bold'
      },
      h2: {
        fontSize: '4.8rem',
        fontWeight: 'bold'
      },
      h3: {
        fontSize: '4rem',
        fontWeight: 'bold'
      },
      h4: {
        fontSize: '3.2rem',
        fontWeight: 'bold'
      },
      h5: {
        fontSize: '2.4rem',
        fontWeight: 'bold'
      },
      h6: {
        fontSize: '2rem',
        fontWeight: 'bold'
      },
      subtitle1: {
        fontSize: '1.8rem',
        fontWeight: 'bold'
      },
      subtitle2: {
        fontSize: '1.6rem',
        fontWeight: 'bold'
      },
      body1: {
        fontSize: '1.6rem'
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 425,
        md: 768,
        lg: 1024,
        xl: 1440
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Poppins';  
            font-style: normal;
            font-display: swap;
            font-weight: 600;
            src: local('Poppins-SemiBold'), local('Poppins-SemiBold'), url('/fonts/Poppins-SemiBold.ttf') format('ttf');
          }

          @font-face {
            font-family: 'Poppins';  
            font-style: normal;
            font-display: swap;
            font-weight: 500;
            src: local('Poppins-Regular'), local('Poppins-Regular'), url('/fonts/Poppins-Bold.ttf') format('ttf');
          }
  
          @font-face {
            font-family: 'Poppins';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Poppins-Bold'), local('Poppins-Bold'), url('/fonts/Poppins-Regular.ttf') format('ttf');
          }
        `
      }
    }
  })
);

export const braTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#B6DBD1'
    },
    text: {
      primary: '#5E6272',
      secondary: '#12022F'
    }
  },
  spacing: (factor: number) => `${0.8 * factor}rem`,
  typography: {
    htmlFontSize: 10,
    fontWeightLight: 400,
    fontWeightMedium: 400,
    fontWeightRegular: 400,
    fontWeightBold: 500,
    fontFamily: [
      'Moderate',
      'Microsoft YaHei',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    h1: {
      fontWeight: 'bold'
    },
    h2: {
      fontWeight: 'bold'
    },
    h3: {
      fontWeight: 'bold'
    },
    h4: {
      fontSize: '2.4rem',
      fontWeight: 'bold',
      lineHeight: '3rem'
    },
    h5: {
      color: '#333333',
      fontSize: '2rem',
      fontWeight: 'bold',
      lineHeight: '4rem'
    },
    h6: {
      fontWeight: 'bold',
      lineHeight: '2.4rem'
    },
    body1: {
      fontSize: '1.6rem',
      lineHeight: '2rem'
    },
    body2: {
      fontSize: '1.4rem',
      lineHeight: '2rem'
    },
    subtitle1: {
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    subtitle2: {
      fontSize: '1.6rem'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Moderate';  
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Moderate-Regular'), local('Moderate-Regular'), url('/fonts/Moderat-Bold.woff2') format('woff2');
        }

        @font-face {
          font-family: 'Moderate';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Moderate-Bold'), local('Moderate-Bold'), url('/fonts/Moderat-Regular.woff2') format('woff2');
        }
      `
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          borderRadius: 28
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20
        }
      }
    }
  }
});
