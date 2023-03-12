import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;
	loading?: boolean;
};

export const Button = ({
	className,
	children,
	loading,
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			type="button"
			className="items-center px-3 py-2 text-sm font-medium leading-4 text-center text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			{loading && (
				<svg
					fill="none"
					className="w-8 h-8 animate-spin"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clip-rule="evenodd"
						d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
						fill="currentColor"
						fill-rule="evenodd"
					/>
				</svg>
			)}
			{!loading && children}
		</button>
	);
};
