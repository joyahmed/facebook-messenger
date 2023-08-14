'use client';

import { ChangeEvent } from 'react';

interface InputProps {
	label: string;
	id: string;
	name: string;
	value: string;
	type: string;
	required?: boolean;
	disabled?: boolean;
	hasErrors: boolean;
	errors: string[];
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
	label,
	id,
	name,
	value,
	type,
	disabled,
	hasErrors,
	errors,
	onChange
}) => {
	return (
		<>
			<label
				className='
	        block
	        text-sm
	        font-medium
	        leading-6
	        text-white
	        '
				htmlFor={id}
			>
				{label}
			</label>

			<input
				id={id}
				type={type}
				name={name}
				value={value}
				autoComplete={id}
				disabled={disabled}
				onChange={onChange}
				className={`block w-full rounded-md border-0 px-2 py-1.5 				text-white bg-transparent shadow-sm ring-1 ring-inset 							ring-gray-300 placeholder:text-white focus:ring-2 							focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6						focus:outline-none mt-1
							${disabled ? 'opacity-50 cursor-default' : ''}
	 				 `}
			/>
			<span
				className={`${
					hasErrors
						? 'flex flex-col text-red-400 text-[14px] mt-2'
						: 'hidden'
				}`}
			>
				{errors?.map(error => (
					<span key={error} className='whitespace-pre-line'>
						{error}
					</span>
				))}
			</span>
		</>
	);
};

export default Input;
