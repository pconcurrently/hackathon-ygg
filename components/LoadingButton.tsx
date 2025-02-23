import React from 'react';

interface LoadingButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading: boolean;
	text: string;
}

const LoadingButton = ({ isLoading, text, ...props }: LoadingButtonProps) => {
	return (
		<button
			type="submit"
			className={`p-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md ${
				isLoading ? 'opacity-50 cursor-not-allowed' : ''
			}`}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? 'Loading...' : text}
		</button>
	);
};

export default LoadingButton;
