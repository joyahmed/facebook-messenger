import { useState } from 'react';

const useForm = <T extends Form>(initialForm: T) => {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState<FormErrors>({});

	const validatorFields: { [key: string]: ValidatorConfig } = {};

	const isValid = () => {
		const keys = Object.keys(errors);
		if (keys.length === 0) {
			return false;
		}
		return !keys.some(errorKey => {
			return errors[errorKey].length > 0;
		});
	};

	const handleChangeInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmitForm =
		(submitCallback: SubmitCallback<T>) => (e: React.FormEvent) => {
			e.preventDefault();
			for (const field in validatorFields) {
				if (form.hasOwnProperty(field)) {
					const config = validatorFields[field];
					checkValidity(config)();
				}
			}
			isValid() && submitCallback(form);
		};

	const validate = (
		ref: HTMLInputElement,
		validators: Validator[]
	) => {
		const config: ValidatorConfig = { element: ref, validators };
		validatorFields[ref.name] = config;

		ref.onblur = checkValidity(config);
		ref.oninput = () => {
			if (!errors[ref.name]) return;
			checkValidity(config);
		};
	};

	const checkValidity =
		({ element, validators }: ValidatorConfig) =>
		() => {
			setErrors(prevErrors => ({
				...prevErrors,
				[element.name]: []
			}));

			for (const validator of validators) {
				const message = validator(element)(form);

				if (!!message) {
					setErrors(prevErrors => ({
						...prevErrors,
						[element.name]: [
							...(prevErrors[element.name] || []),
							message
						]
					}));
				}
			}
		};

	return {
		handleChangeInput,
		handleSubmitForm,
		validate,
		errors,
		setErrors,
		form
	};
};

export default useForm;
