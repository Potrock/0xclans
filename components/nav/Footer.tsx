export const Footer = () => {
	return (
		<footer className="p-4 bg-gray-900 rounded-lg shadow md:flex md:items-center md:p-6">
			<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© 2023{" "}
				<a href="https://0xclans.xyz" className="hover:underline">
					0xClans
				</a>
				. All Rights Reserved.
			</span>
			<ul className="flex flex-wrap items-center self-center justify-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
				<li>
					<a href="#" className="mr-4 hover:underline md:mr-6 ">
						Twitter
					</a>
				</li>
				<li>
					<a href="#" className="mr-4 hover:underline md:mr-6">
						Github
					</a>
				</li>
				{/* <li>
					<a href="#" className="mr-4 hover:underline md:mr-6">
						Licensing
					</a>
				</li> */}
				<li>
					<a href="#" className="hover:underline">
						Contact
					</a>
				</li>
			</ul>
		</footer>
	);
};
