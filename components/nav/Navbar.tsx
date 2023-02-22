import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/0xclans-logo.png";

export const Navbar = () => {
	return (
		<nav className=" border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-gray-900">
			<div className="container flex flex-wrap items-center justify-between mx-auto">
				<Link href="/" className="flex items-center">
					<div className="flex">
						<Image
							src={logo}
							width={75}
							height={75}
							alt="0xClans Logo"
						/>
						<span className="self-center pl-4 text-2xl font-semibold text-transparent bg-gradient-to-r from-rose-400 to-yellow-300 bg-clip-text whitespace-nowrap">
							0xClans
						</span>
					</div>
				</Link>
				<button
					data-collapse-toggle="navbar-default"
					type="button"
					className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					aria-controls="navbar-default"
					aria-expanded="false"
				>
					<span className="sr-only">Open main menu</span>
					<svg
						className="w-6 h-6"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
				<div
					className="hidden w-full md:block md:w-auto"
					id="navbar-default"
				>
					<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-gray-900 dark:border-gray-700">
						<li>
							<Link
								href="/analytics"
								className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Analytics
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard"
								className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Dashboard
							</Link>
						</li>
						<li>
							<Link href="/profile">
								<span className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
									Profile
								</span>
							</Link>
						</li>
						<li>
							<Link
								href="/clans"
								className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Clans
							</Link>
						</li>
						{/* <li>
							<a
								href="#"
								className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Contact
							</a>
						</li> */}
					</ul>
				</div>
			</div>
		</nav>
	);
};
