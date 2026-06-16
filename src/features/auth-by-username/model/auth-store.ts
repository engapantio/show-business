import { useState, useEffect } from 'react';
import type { AuthState } from './types';

let _state: AuthState = { token: null, user: null };
const _listeners = new Set<() => void>();

export function getAuthState(): AuthState {
  return _state;
}

export function setAuthState(next: AuthState): void {
  _state = next;
  _listeners.forEach((fn) => fn());
}

export function logout(): void {
  setAuthState({ token: null, user: null });
}

export function useAuthState(): AuthState {
  const [state, setState] = useState<AuthState>(_state);

  useEffect(() => {
    const sync = (): void => setState({ ..._state });
    _listeners.add(sync);
    return () => {
      _listeners.delete(sync);
    };
  }, []);

  return state;
}
