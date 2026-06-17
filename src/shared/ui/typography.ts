import type { TypographyVariantsOptions } from '@mui/material';

export const typography: TypographyVariantsOptions = {
  fontFamily: '"Inter", sans-serif',
  h1: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700,
    fontSize: '2.75rem', // ~44px
    lineHeight: 1.2,
    color: '#000',
  },
  h2: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700,
    fontSize: '1.375rem', // 22px
    lineHeight: 1.4,
    color: '#000',
  },
  h3: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700,
    fontSize: '1.75rem',
    lineHeight: 1.3,
    color: '#000',
  },
  body1: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 400,
    fontSize: '1.0625rem', // 17px
    lineHeight: 1.6,
    color: '#000',
  },
  body2: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 500,
    fontSize: '1rem', // 16px
    lineHeight: 1.4,
    color: '#9da3ae',
    textTransform: 'uppercase' as const,
  },
  subtitle1: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.4,
    color: '#2ad18a',
    textTransform: 'uppercase' as const,
  },
  button: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    textTransform: 'none' as const,
  },
};
