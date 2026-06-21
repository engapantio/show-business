import { useState, useEffect } from 'react';
import type { AuthState } from './types';

const STORAGE_KEY = 'show_business_auth';

function loadPersistedState(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthState) : { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
}

function persistState(state: AuthState): void {
  try {
    if (state.token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // localStorage unavailable — silent fail, session works in-memory
  }
}

let _state: AuthState = loadPersistedState();
const _listeners = new Set<() => void>();

export function getAuthState(): AuthState {
  return _state;
}

export function setAuthState(next: AuthState): void {
  _state = next;
  persistState(next);
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
