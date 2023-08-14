import { AuthProvider } from '@/store/AuthContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterComponent from './components/ToasterComponent';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Messenger Clone',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthProvider>
					<ToasterComponent />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
