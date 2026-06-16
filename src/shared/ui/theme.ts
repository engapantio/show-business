import { createTheme, type Components, type Theme } from '@mui/material/styles';

const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: `
     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      html { min-width: 375px; scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
      body { min-width: 375px; }
      img, video, svg { display: block; max-width: 100%; height: auto; }
      a { text-decoration: none; color: inherit; }
    `,
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        minHeight: 44,
        paddingInline: 18,
        paddingBlock: 10,
        borderRadius: 999,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        fontSize: '0.9375rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '0.01em',
        textTransform: 'none',
        boxShadow: 'none',
        transition:
          'background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease, transform 180ms ease',
        '&:hover': {
          boxShadow: 'none',
        },
        '&:active': {
          transform: 'translateY(1px)',
        },
        '&.Mui-disabled': {
          opacity: 0.56,
          boxShadow: 'none',
        },
        '&.Mui-focusVisible': {
          boxShadow: '0 0 0 4px rgba(15, 118, 110, 0.18)',
        },
        variants: [
          {
            props: { variant: 'contained' },
            style: {
              border: '1px solid transparent',
            },
          },
          {
            props: { variant: 'contained', color: 'primary' },
            style: {
              backgroundColor: '#0f766e',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#115e59',
              },
              '&:active': {
                backgroundColor: '#134e4a',
              },
              '&.Mui-disabled': {
                backgroundColor: '#b7d6d1',
                color: 'rgba(255,255,255,0.9)',
              },
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              borderWidth: 1,
              borderStyle: 'solid',
              backgroundColor: 'transparent',
            },
          },
          {
            props: { variant: 'outlined', color: 'primary' },
            style: {
              borderColor: 'rgba(15, 118, 110, 0.28)',
              color: '#0f766e',
              '&:hover': {
                borderColor: '#0f766e',
                backgroundColor: 'rgba(15, 118, 110, 0.06)',
              },
              '&:active': {
                backgroundColor: 'rgba(15, 118, 110, 0.1)',
              },
            },
          },
          {
            props: { variant: 'text', color: 'primary' },
            style: {
              color: '#0f766e',
              '&:hover': {
                backgroundColor: 'rgba(15, 118, 110, 0.06)',
              },
              '&:active': {
                backgroundColor: 'rgba(15, 118, 110, 0.1)',
              },
            },
          },
          {
            props: { size: 'small' },
            style: {
              minHeight: 36,
              paddingInline: 14,
              paddingBlock: 8,
              fontSize: '0.875rem',
            },
          },
          {
            props: { size: 'medium' },
            style: {
              minHeight: 44,
            },
          },
          {
            props: { size: 'large' },
            style: {
              minHeight: 52,
              paddingInline: 22,
              paddingBlock: 12,
              fontSize: '1rem',
            },
          },
          {
            props: { fullWidth: true },
            style: {
              width: '100%',
            },
          },
        ],
      },
      startIcon: {
        marginRight: 8,
        '& > *:nth-of-type(1)': {
          fontSize: '1.1em',
        },
      },
      endIcon: {
        marginLeft: 8,
        '& > *:nth-of-type(1)': {
          fontSize: '1.1em',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 9999,
        backgroundColor: '#e6f4f5',
        color: '#01696f',
        fontSize: '0.75rem',
        fontWeight: 600,
        height: 26,
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#cedcd8' },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: '0 1px 2px rgba(40,37,29,0.06)',
        border: '1px solid #d4d1ca',
        borderRadius: 12,
        transition: 'box-shadow 180ms ease, transform 180ms ease',
        '&:hover': { boxShadow: '0 4px 12px rgba(40,37,29,0.08)', transform: 'translateY(-2px)' },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 9999,
        backgroundColor: '#ffffff',
        '& fieldset': { borderColor: '#d4d1ca' },
        '&:hover fieldset': { borderColor: '#01696f' },
        '&.Mui-focused fieldset': { borderColor: '#01696f' },
      },
      input: { padding: '10px 16px', fontSize: '0.875rem' },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #dcd9d5',
        boxShadow: '0 1px 2px rgba(40,37,29,0.06)',
        color: '#28251d',
      },
    },
  },
  MuiToolbar: {
    styleOverrides: { root: { minHeight: '64px !important' } },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: 16,
        paddingRight: 16,
        '@media (min-width: 768px)': { paddingLeft: 24, paddingRight: 24 },
        '@media (min-width: 1220px)': { paddingLeft: 32, paddingRight: 32 },
      },
      maxWidthLg: { maxWidth: '1200px !important' },
    },
  },
};

export const theme = createTheme({
  breakpoints: {
    values: { xs: 375, sm: 768, md: 1220, lg: 1440, xl: 1920 },
  },
  palette: {
    mode: 'light',
    primary:    { main: '#01696f', dark: '#0c4e54', light: '#cedcd8', contrastText: '#f9f8f4' },
    secondary:  { main: '#7a7974' },
    error:      { main: '#a12c7b' },
    success:    { main: '#437a22' },
    background: { default: '#f7f6f2', paper: '#ffffff' },
    text:       { primary: '#28251d', secondary: '#7a7974', disabled: '#bab9b4' },
    divider:    '#dcd9d5',
  },
  typography: {
    fontFamily: "'Work Sans', 'Helvetica Neue', sans-serif",
    h1: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, lineHeight: 1.15 },
    h2: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, lineHeight: 1.2  },
    h3: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, lineHeight: 1.25 },
    h4: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 },
    h5: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 },
    h6: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 },
    body1:   { fontSize: '1rem',      lineHeight: 1.6 },
    body2:   { fontSize: '0.9375rem', lineHeight: 1.6 },
    caption: { fontSize: '0.8125rem' },
    button:  { fontFamily: "'Work Sans', 'Helvetica Neue', sans-serif", fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 8 },
  components,
});