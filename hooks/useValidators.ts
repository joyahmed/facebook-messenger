export const makeUppercase = (text: string) =>
	text
		.split(/(?=[A-Z])/)
		.map(word => word[0].toUpperCase() + word.substring(1))
		.join(' ');

export const comparePassword: Validator =
	(element, fieldName) => (form: Form) => {
		if (element.value.length === 0) return '';

		const compareFieldValues = form[fieldName || ''];
		return element.value !== compareFieldValues
			? `${makeUppercase(
					element.name
			  )} should be same as ${makeUppercase(fieldName || '')}`
			: '';
	};

export const requiredValidator: Validator = element => form =>
	element.value.length === 0
		? `${makeUppercase(element.name)} is required`
		: '';

export const maxLengthValidator: Validator =
	(element, maxLength = 7) =>
	(form: Form) => {
		const inputLength = element.value.length;

		if (inputLength === 0 || inputLength < maxLength) return '';

		return `${makeUppercase(
			element.name
		)} should be less than ${maxLength} characters`;
	};

export const minLengthValidator: Validator =
	(element, minLength = 3) =>
	(form: Form) => {
		const inputLength = element.value.length;

		if (inputLength === 0 || inputLength >= minLength) return '';

		return `${makeUppercase(
			element.name
		)} should be at least ${minLength} characters`;
	};

export const firstUpperCaseLetter: Validator = element => (form: Form) => {
	const { value } = element;
	if (value.length === 0) return '';

	return value[0] !== value[0].toLocaleUpperCase()
		? `${makeUppercase(
				element.name
		  )} first letter should be uppercased`
		: '';
};

export const emailValidator: Validator = element => (form: Form) => {
	const { value } = element;

	if (value.length === 0) return '';

	const emailPattern =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!emailPattern.test(value.toLowerCase())) {
		return 'Invalid email format';
	}

	return '';
};

export const passwordValidator: Validator = element => (form: Form) => {
	const { value } = element;

	if (value.length === 0) return null;

	const passwordPattern =
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,20}$/;

	if (!passwordPattern.test(value)) {
		return `Password must meet the following requirements:
      - At least 8 - 20 characters
      - At least one uppercase letter
      - At least one lowercase letter
      - At least one digit
      - At least one special symbol (~\`!@#$%^&*()--+={}[]|\\:;"\'<>,.?/_)
      `;
	}

	return null;
};
