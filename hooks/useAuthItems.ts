import {
	emailValidator,
	minLengthValidator,
	passwordValidator,
	requiredValidator
} from '@/hooks/useValidators';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useAuthItems = (
	form: Form,
	validate: Validate,
	setErrors: SetErrors
) => {
	const { name, email, password, confirmPassword } = form;
	const [variant, setVariant] = useState<Variant>('LOGIN');
	const [isLoading, setIsLoading] = useState(false);

	const toggleVariant = useCallback(() => {
		setErrors({});
		variant === 'LOGIN'
			? setVariant('REGISTER')
			: setVariant('LOGIN');
	}, [variant, setErrors]);

	const inputItems = useMemo(() => {
		return [
			{
				id: 'name',
				label: 'Name',
				name: 'name',
				value: name,
				type: 'text',
				validators: [minLengthValidator, requiredValidator]
			},

			{
				id: 'email',
				type: 'email',
				name: 'email',
				value: email,
				label: 'Email address',
				validators: [requiredValidator, emailValidator]
			},
			{
				id: 'password',
				label: 'Password',
				type: 'password',
				name: 'password',
				value: password,
				validators: [requiredValidator, passwordValidator]
			},
			{
				id: 'confirmPassword',
				label: 'Confirm Password',
				type: 'confirmPassword',
				name: 'confirmPassword',
				value: confirmPassword,
				validators: [requiredValidator, passwordValidator]
			}
		];
	}, [email, name, password, confirmPassword]);

	useEffect(() => {
		for (const input of inputItems) {
			const inputElement = document.getElementById(
				input.name
			) as HTMLInputElement;
			if (inputElement) {
				validate(inputElement, input.validators);
			}
		}
	}, [inputItems, validate]);

	return {
		inputItems,
		variant,
		isLoading,
		setIsLoading,
		toggleVariant
	};
};

export default useAuthItems;
