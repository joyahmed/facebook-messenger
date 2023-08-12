import React from 'react';
import AuthSocialButton from './AuthSocialButton';

const Providers = () => {
	return (
		<div className='flex mt-6 gap-2'>
			<AuthSocialButton
				{...{
					icon: '/providers/github.webp',
					width: 25,
					height: 25,
					altText: 'Github',
					onClick: () => {}
					// onClick: () => socialAction('github')
				}}
			/>
			<AuthSocialButton
				{...{
					icon: '/providers/google.webp',
					width: 25,
					height: 25,
					altText: 'Github',
					onClick: () => {}
					// onClick: () => socialAction('github')
				}}
			/>
		</div>
	);
};

export default Providers;
