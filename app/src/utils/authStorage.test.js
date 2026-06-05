import { describe, it, expect, beforeEach } from 'vitest';
import { saveAuth, getAuth, clearAuth, isTokenValid } from './authStorage';

describe('authStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('сохраняет и читает токен', () => {
    saveAuth('abc123', { email: 'a@b.ru', name: 'a' });
    expect(isTokenValid()).toBe(true);
    expect(getAuth().token).toBe('abc123');
    expect(getAuth().user.name).toBe('a');
  });

  it('очищает при logout', () => {
    saveAuth('abc123', { email: 'a@b.ru', name: 'a' });
    clearAuth();
    expect(isTokenValid()).toBe(false);
  });
});
