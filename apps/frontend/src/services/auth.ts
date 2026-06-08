import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { api } from '@/services/api';

export type OAuthProvider = 'google' | 'github';

export const TOKEN_COOKIE_KEY = 'curso-em-texto.token';

const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

export const AuthService = {
  signIn: (provider: OAuthProvider) => {
    window.location.href = `${api.defaults.baseURL}/auth/${provider}`;
  },

  signOut: () => {
    destroyCookie(null, TOKEN_COOKIE_KEY, { path: '/' });
  },

  getToken: () => {
    const cookies = parseCookies();

    return cookies[TOKEN_COOKIE_KEY] ?? null;
  },

  saveToken: (token: string) => {
    setCookie(null, TOKEN_COOKIE_KEY, token, {
      maxAge: TOKEN_MAX_AGE,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  },
};
