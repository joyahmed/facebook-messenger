'use client';

import useAuthItems from '@/hooks/useAuthItems';
import useForm from '@/hooks/useForm';
import { initialAuth } from '@/store/initialState';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { lazy, useEffect } from 'react';
import { toast } from 'react-hot-toast';
const Providers = lazy(() => import('./Providers'));
const AuthHeader = lazy(() => import('./AuthHeader'));
const CredentialForm = lazy(() => import('./CredentialForm'));

const AuthForm = () => {
	const session = useSession();
	const router = useRouter();
	const {
		form,
		handleChangeInput,
		handleSubmitForm,
		validate,
		errors,
		setErrors
	} = useForm<AuthForm>(initialAuth);

	const { variant, setIsLoading, toggleVariant } = useAuthItems(
		form,
		validate,
		setErrors
	);

	const onFormSubmit = async (form: AuthForm) => {
		setIsLoading(true);

		try {
			if (variant === 'REGISTER') {
				const registerResponse = await fetch('/api/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(form)
				});

				if (registerResponse.status === 201) {
					toast.success('Registration successful!');
					await signIn('credentials', form);
				} else {
					const errorMessage = await registerResponse.text();
					toast.error(`Registration failed: ${errorMessage}`);
				}
			}

			if (variant === 'LOGIN') {
				const loginResponse = await signIn('credentials', {
					...form,
					redirect: false
				});

				if (loginResponse?.error) {
					toast.error('Invalid credentials');
				} else if (loginResponse?.ok) {
					toast.success('Logged in!');
					router.push('/users');
				}
			}
		} catch (error) {
			console.error('An error occurred:', error);
			toast.error('Something went wrong!');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center h-full min-h-screen py-5 sm:px-6 lg:px-8'>
			<AuthHeader {...{ variant }} />
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-black border-[3.5px] border-blue-900/70 px-4 py-8 shadow	rounded-md sm:px-10 transition'>
					<CredentialForm
						{...{
							variant,
							form,
							validate,
							setErrors,
							handleChangeInput,
							handleSubmitForm,
							onFormSubmit,
							errors
						}}
					/>

					<div className='mt-6'>
						<div className='relative'>
							<div className='relatative flex justify-center text-center'>
								<span className='bg-black border-[1px] border-blue-800 hover:border-blue-900 transition	px-2 py-1 text-gray-300 rounded-md text-xs'>
									Or sign in with
								</span>
							</div>
						</div>

						<Providers />

						<div className='flex gap-2 justify-center text-sm mt-6 px-2      text-gray-300'>
							<div>
								{variant === 'LOGIN'
									? 'New to Messenger'
									: 'Already have an account?'}
							</div>
							<div
								onClick={toggleVariant}
								className='underline cursor-pointer'
							>
								{variant === 'LOGIN' ? 'Create an account' : 'Login'}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
