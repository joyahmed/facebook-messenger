import { lazy } from 'react';
const AuthForm = lazy(() => import('./components/auth/AuthForm'));

const Home = () => {
	return (
		<>
			<AuthForm />
		</>
	);
};

export default Home;
