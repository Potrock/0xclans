import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export default function LinkedAccounts({ accounts }: any) {
	return (
		<div className="mt-8">
			<h2 className="text-lg font-medium leading-6 text-gray-200">
				Linked Accounts
			</h2>
			<div className="mt-4 overflow-hidden bg-gray-800 rounded-lg shadow-lg">
				<div className="px-4 py-5 sm:p-4">
					<div className="grid grid-cols-1 gap-4">
						{accounts.map((account: any) => (
							<div key={account.platform} className="flow-root">
								<Disclosure>
									{({ open }) => (
										<Fragment>
											<div className="">
												<div className="flex items-center justify-between">
													<Disclosure.Button className="flex items-center justify-between w-full text-gray-300">
														<span className="font-medium uppercase">
															{account.platform}
														</span>
														<ChevronUpIcon
															className={`${
																open
																	? "transform rotate-180"
																	: ""
															} w-5 h-5`}
															aria-hidden="true"
														/>
													</Disclosure.Button>
												</div>
												<Transition
													show={open}
													enter="transition-opacity duration-100"
													enterFrom="opacity-0"
													enterTo="opacity-100"
													leave="transition-opacity duration-75"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
												>
													<Disclosure.Panel
														className="pt-4 text-sm text-gray-500"
														static
													>
														<div className="flex items-center gap-2">
															<span className="font-medium">
																UUID:
															</span>
															<span>
																{account.uuid}
															</span>
														</div>
													</Disclosure.Panel>
												</Transition>
											</div>
										</Fragment>
									)}
								</Disclosure>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
