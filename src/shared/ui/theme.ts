import { createTheme } from '@mui/material/styles';

const green = '#2ad18a';
const grey = '#9da3ae';
const lightGrey = '#e8eaed';
const black = '#000000';
const white = '#ffffff';

export const theme = createTheme({
  palette: {
    primary: {
      main: green,
      contrastText: white,
    },
    text: {
      primary: black,
      secondary: grey,
    },
    background: {
      default: white,
      paper: white,
    },
    grey: {
      100: lightGrey,
      300: '#d7dae0',
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'var(--font-family)',
    h1: {
      fontFamily: 'var(--font-family)',
      fontWeight: 700,
      fontSize: '48px',
      lineHeight: '140%',
      color: black,
      '@media (max-width:900px)': {
        fontSize: '38px',
      },
      '@media (max-width:600px)': {
        fontSize: '30px',
      },
    },
    h2: {
      fontFamily: 'var(--font-family)',
      fontWeight: 700,
      fontSize: '22px',
      lineHeight: '140%',
      color: black,
    },
    h3: {
      fontFamily: 'var(--font-family)',
      fontWeight: 700,
      fontSize: '22px',
      lineHeight: '140%',
      color: black,
    },
    body1: {
      fontFamily: 'var(--font-family)',
      fontWeight: 400,
      fontSize: '17px',
      lineHeight: '160%',
      color: black,
    },
    body2: {
      fontFamily: 'var(--font-family)',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '140%',
      color: grey,
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontFamily: 'var(--font-family)',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '140%',
      color: green,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root {
          --font-family: "Inter", sans-serif;
          --second-family: "Poppins", sans-serif;
          --third-family: "League Gothic", sans-serif;
        }
        body, #root {
          min-height: 100%;
        }
        html {
        height: 100%;
        }
        body {
          margin: 0;
          background: #fff;
        }
        *, *::before, *::after {
          box-sizing: border-box;
        }
      `,
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontFamily: 'var(--font-family)',
          fontWeight: 600,
          boxShadow: 'none',
          fontSize: 14,
          paddingBlock: 8,
          paddingInline: 24,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: green,
          },
          '&:focus-visible': {
            outline: `2px solid #2ad18a`,
            outlineOffset: 2,
          },
        },
        notchedOutline: {
          borderColor: lightGrey,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-family)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-family)',
          fontWeight: 500,
          '&.Mui-selected': {
            backgroundColor: green,
            color: white,
            '&:hover': {
              backgroundColor: '#1fb876',
            },
          },
        },
      },
    },
  },
});
