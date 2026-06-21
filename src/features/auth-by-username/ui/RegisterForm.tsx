import { Box, Alert, InputAdornment, IconButton } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/Person2Outlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { FormField, AppButton } from '@/shared';
import { useRegisterForm } from '../model/useRegisterForm';

interface RegisterFormProps {
  redirectTo?: string;
}

export function RegisterForm({ redirectTo }: RegisterFormProps) {
  const {
    values,
    fieldErrors,
    isPending,
    isError,
    error,
    showPwd,
    togglePwd,
    handleChange,
    handleSubmit,
  } = useRegisterForm(redirectTo);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}
    >
      <FormField
        label="Username"
        value={values.username}
        onChange={handleChange('username')}
        error={!!fieldErrors.username}
        helperText={fieldErrors.username}
        required
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <FormField
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange('email')}
        error={!!fieldErrors.email}
        helperText={fieldErrors.email}
        required
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <FormField
        label="Password"
        type={showPwd ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        error={!!fieldErrors.password}
        helperText={fieldErrors.password}
        required
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={togglePwd}
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {isError && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error?.message}
        </Alert>
      )}

      <AppButton
        type="submit"
        size="large"
        fullWidth
        loading={isPending}
        sx={{ py: 1.5, mt: 1 }}
      >
        {isPending ? 'Registering…' : 'Register'}
      </AppButton>
    </Box>
  );
}
