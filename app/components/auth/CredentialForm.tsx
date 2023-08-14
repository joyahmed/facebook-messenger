import useAuthItems from '@/hooks/useAuthItems';
import React, { ChangeEvent, FormEvent, lazy } from 'react';
const Button = lazy(() => import('../Button'));
const Input = lazy(() => import('./inputs/Input'));

interface CredentialFormProps {
	form: Form;
	validate: Validate;
	setErrors: SetErrors;
	handleSubmitForm: (
		submitCallback: SubmitCallback<AuthForm>
	) => (e: FormEvent<Element>) => void;
	onFormSubmit: (form: AuthForm) => void;
	errors: FormErrors;
	handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
	variant: Variant;
}

const CredentialForm = ({
	form,
	validate,
	setErrors,
	handleSubmitForm,
	onFormSubmit,
	errors,
	handleChangeInput,
	variant
}: CredentialFormProps) => {
	const { inputItems, isLoading } = useAuthItems(
		form,
		validate,
		setErrors
	);

	return (
		<form
			className='space-y-3 max-w-screen-sm'
			onSubmit={handleSubmitForm(onFormSubmit)}
		>
			{inputItems.map(item => (
				<div
					key={item.id}
					className={`${
						variant !== 'REGISTER' &&
						(item.name === 'name' || item.name === 'confirmPassword')
							? 'hidden'
							: 'flex flex-col'
					}`}
				>
					<Input
						{...{
							id: item.id,
							label: item.label,
							name: item.name,
              value: item.value,
              type: item.type,
							disabled: isLoading,
							hasErrors: errors[item.name]?.length > 0,
							errors: errors[item.name],
							onChange: handleChangeInput
						}}
					/>
				</div>
			))}

			<div className='pt-5'>
				<Button
					{...{
						disabled: isLoading,
						type: 'submit',
						onClick: handleSubmitForm(onFormSubmit)
					}}
					fullWidth
				>
					{variant === 'LOGIN' ? 'Sign in' : 'Sign up'}
				</Button>
			</div>
		</form>
	);
};

export default CredentialForm;
