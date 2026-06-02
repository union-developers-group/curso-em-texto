'use client';

import { AuthService, OAuthProvider } from '@/services/auth';
import { createContext, useContext } from 'react';

// TODO: adicionar `user` e estado de autenticação quando o endpoint /me existir no backend
interface IAuthContext {
  login: (provider: OAuthProvider) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as IAuthContext);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const login = (provider: OAuthProvider) => {
    AuthService.signIn(provider);
  };

  const logout = () => {
    AuthService.signOut();
  };

  const value: IAuthContext = { login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
