import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;
};

export const Button = ({ className, children, ...props }: ButtonProps) => {
	return (
		<button
			{...props}
			type="button"
			className="items-center px-3 py-2 text-sm font-medium leading-4 text-center text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			{children}
		</button>
	);
};
