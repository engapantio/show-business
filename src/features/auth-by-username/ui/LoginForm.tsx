import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/Person2Outlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import { useNavigate } from '@tanstack/react-router';
import { useLoginMutation } from '../model/use-login-mutation';

export function LoginForm() {
  const [username, setUsername] = useState<string>('emilys');
  const [password, setPassword] = useState<string>('emilyspass');
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const { mutate, isPending, isError, error } = useLoginMutation();
  // const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    mutate({ username, password });
    // navigate({ to: '/inspiration' });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}
    >
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
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
      <TextField
        label="Password"
        type={showPwd ? 'text' : 'password'}
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        required
        fullWidth
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
                  onClick={() => setShowPwd((v) => !v)}
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
          {error.message}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isPending}
        sx={{ py: 1.5 }}
      >
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>

      <Typography variant="caption" color="text.secondary" align="center">
        Demo: <strong>emilys</strong> / <strong>emilyspass</strong>
      </Typography>
    </Box>
  );
}
