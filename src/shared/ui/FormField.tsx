import { Box, TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

type FormFieldProps = Omit<TextFieldProps, 'helperText'> & {
  helperText?: string;
};

export function FormField({ helperText, sx, ...rest }: FormFieldProps) {
  return (
    <Box sx={{ position: 'relative', pb: '20px', ...sx }}>
      <TextField
        {...rest}
        helperText={helperText}
        fullWidth
        slotProps={{
          ...rest.slotProps,
          formHelperText: {
            sx: {
              position: 'absolute',
              bottom: -20,
              left: 16,
              m: 0,
              pt: '2px',
            },
          },
        }}
      />
    </Box>
  );
}
