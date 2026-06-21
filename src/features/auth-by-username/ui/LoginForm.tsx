import { InputAdornment, IconButton } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/Person2Outlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { FormShell, FormField, } from '@/shared';
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
      <FormShell
        onSubmit={handleSubmit}
        isPending={isPending}
        isError={isError}
        error={error}
        submitLabel="Log in"
        pendingLabel="Logging in…"
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
      </FormShell>
  );
}
