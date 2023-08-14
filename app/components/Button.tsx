interface ButtonProps {
	type?: 'button' | 'submit' | 'reset' | undefined;
	fullWidth?: boolean;
	children?: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	secondary?: boolean;
	danger?: boolean;
	disabled?: boolean;
}

const Button = ({
	type,
	fullWidth,
	children,
	onClick,
	secondary,
	danger,
	disabled
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={`flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 transition
			${disabled && 'opacity-50 cursor-default'}
			${fullWidth && 'w-full'}
			${secondary ? 'text-gray-900' : 'text-white'}
			${
				danger
					? 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600 focus:outline-none'
					: 'bg-gray-900/30 hover:bg-black border-[1px] border-blue-900'
			}
    `}
		>
			{children}
		</button>
	);
};

export default Button;
