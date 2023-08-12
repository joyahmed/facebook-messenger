interface Form {
	[key: string]: string;
}

interface FormErrors {
	[key: string]: string[];
}

interface AuthForm extends Form {
	name: string;
	email: string;
	password: string;
}

interface SubmitCallback<T extends Form> {
	(f: T): any;
}

interface Validator {
	(element: HTMLInputElement, ...rest: any[]): (
		form: Form
	) => string | null;
}

interface ValidatorConfig {
	element: HTMLInputElement;
	validators: Validator[];
}

interface InputProps {
	label: string;
	id: string;
	name: string;
	value: string;
	type?: string;
	required?: boolean;
	disabled?: boolean;
	hasErrors: boolean;
	errors: string[];
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

type Variant = 'LOGIN' | 'REGISTER';

interface Validate {
	(ref: HTMLInputElement, validators: Validator[]): void;
}

interface SetErrors {
  (value: SetStateAction<FormErrors>): void;
}
