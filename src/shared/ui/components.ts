import type { Components, Theme } from '@mui/material';

export const components: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        minHeight: 44,
        paddingInline: 18,
        paddingBlock: 10,
        borderRadius: 999,
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.9375rem',
        fontWeight: 600,
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: '#2ad18a',
            color: '#fff',
            '&:hover': { backgroundColor: '#1fb876' },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: '#2ad18a',
            color: '#2ad18a',
            '&:hover': { borderColor: '#1fb876', backgroundColor: 'rgba(42,209,138,0.06)' },
          },
        },
      ],
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 500,
        '&.Mui-selected': {
          backgroundColor: '#2ad18a',
          color: '#fff',
          '&:hover': { backgroundColor: '#1fb876' },
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontFamily: '"Inter", sans-serif',
        borderRadius: 8,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#2ad18a',
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: '"Inter", sans-serif',
        '&.Mui-focused': { color: '#2ad18a' },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600&family=League+Gothic&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; background: #fff; }
    `,
  },
};
