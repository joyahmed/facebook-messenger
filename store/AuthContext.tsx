'use client'

import { SessionProvider } from 'next-auth/react';

interface AuthContextProps {
	children: React.ReactNode;
}

const AuthContext = ({ children }: AuthContextProps) => {
	return <SessionProvider>{children}</SessionProvider>;
};

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
	return <AuthContext>{children}</AuthContext>;
};

export { AuthContext, AuthProvider };
