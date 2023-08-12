import Image from 'next/image';
import { FC } from 'react';

interface AuthSocialButtonProps {
	icon: string;
	onClick: () => void;
	altText: string;
	width: number;
	height: number;
}

const AuthSocialButton: FC<AuthSocialButtonProps> = ({
	icon,
	onClick,
	altText,
	width,
	height
}) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className='inline-flex justify-center w-full rounded-md bg-gray-900/70 backdrop-blur-sm px-4 py-2 shadow-sm ring-1 ring-inset hover:bg-black/90
      focus:outline-offset-0 focus:ring-blue-900 transition
      '
		>
			<Image src={icon} alt={altText} width={width} height={height} />
		</button>
	);
};

export default AuthSocialButton;
