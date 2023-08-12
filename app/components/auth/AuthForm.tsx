'use client';

import useAuthItems from '@/hooks/useAuthItems';
import useForm from '@/hooks/useForm';
import { initialAuth } from '@/store/initialState';
import { lazy } from 'react';
const Providers = lazy(() => import('./Providers'));
const AuthHeader = lazy(() => import('./AuthHeader'));
const CredentialForm = lazy(() => import('./CredentialForm'));

const AuthForm = () => {
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

	const onFormSubmit = (form: AuthForm) => {
		setIsLoading(true);

		if (variant === 'REGISTER') {
		}
		if (variant === 'LOGIN') {
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
