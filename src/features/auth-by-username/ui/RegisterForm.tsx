import { InputAdornment, IconButton } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/Person2Outlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { FormShell, FormField } from '@/shared';
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
    <FormShell
      onSubmit={handleSubmit}
      isPending={isPending}
      isError={isError}
      error={error}
      submitLabel="Register"
      pendingLabel="Registering…"
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
    </FormShell>
  );
}
