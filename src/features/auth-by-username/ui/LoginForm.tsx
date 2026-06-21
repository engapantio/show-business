import { Box, Alert, Typography, InputAdornment, IconButton } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/Person2Outlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { FormField, AppButton} from '@/shared';
import { useLoginForm } from '../model/useLoginForm';

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
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
  } = useLoginForm(redirectTo);

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
        loading={isPending}
        fullWidth
        sx={{ py: 1.5, mt: 1 }}
      >
        {isPending ? 'Logging in…' : 'Log in'}
      </AppButton>

      <Typography variant="caption" color="text.secondary" align="center">
        Demo: <strong>emilys</strong> / <strong>emilyspass</strong>
      </Typography>
    </Box>
  );
}
