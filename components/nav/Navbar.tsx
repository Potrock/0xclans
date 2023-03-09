import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/0xclans-logo.png";
import { Disclosure } from "@headlessui/react";
import {
	ArrowRightCircleIcon,
	ArrowRightIcon,
	Bars3Icon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import { useProvider } from "wagmi";
import { useRouter } from "next/router";

const navigation = [
	{ name: "Analytics", href: "/analytics", current: false },
	{ name: "Dashboard", href: "/dashboard", current: false },
	{ name: "Clans", href: "/clans", current: false },
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
	const provider = useProvider();

	const router = useRouter();

	const [search, setSearch] = useState<string>("");

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	const handleSearch = async (e: any) => {
		e.preventDefault();
		// Check if the target is a contract or a wallet address
		// If it's a contract, redirect to the clan page
		// If it's a wallet address, redirect to the profile page
		// const code = await provider.getCode(search);
		// if (code === "0x") {
		// 	// It's a wallet address
		router.push(`/profiles/${search}`);
		// } else {
		// 	// It's a contract
		// 	router.push(`/clans/${search}`);
	};
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">
										Open main menu
									</span>
									{open ? (
										<XMarkIcon
											className="block w-6 h-6"
											aria-hidden="true"
										/>
									) : (
										<Bars3Icon
											className="block w-6 h-6"
											aria-hidden="true"
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className="flex items-center justify-center flex-1 ml-auto sm:items-stretch sm:justify-start">
								<div className="flex items-center flex-shrink-0">
									<Link href="/">
										<Image
											className="block w-auto h-10 lg:hidden"
											src={logo}
											alt="0xClans"
										/>
										<Image
											className="hidden w-auto h-10 lg:block"
											src={logo}
											alt="0xClans"
										/>
									</Link>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex ml-auto space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"px-3 py-2 rounded-md text-md font-medium"
												)}
												aria-current={
													item.current
														? "page"
														: undefined
												}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
								<>
									<form
										className="hidden w-5/12 px-3 py-1 ml-auto mr-2 text-gray-300 placeholder-gray-500 bg-gray-900 border border-gray-600 rounded-md appearance-none md:flex focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										onSubmit={handleSearch}
									>
										<input
											className="w-full h-full px-3 py-2 text-gray-300 placeholder-gray-500 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
											placeholder="Search for an Address"
											onChange={(e) => {
												handleSearchChange(e);
											}}
										/>
										<button onClick={handleSearch}>
											<ArrowRightCircleIcon className="w-5 h-5" />
										</button>
									</form>
								</>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block px-3 py-2 rounded-md text-base font-medium"
									)}
									aria-current={
										item.current ? "page" : undefined
									}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
