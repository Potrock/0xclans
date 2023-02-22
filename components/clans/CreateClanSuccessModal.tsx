import { truncateAddress } from "@/utils/helpers";
import { Dialog, Transition } from "@headlessui/react";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import React, { Fragment, useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

type CreateClanSuccessModalProps = {
	clan: {
		hash: string;
		name: string;
		symbol: string;
	};
	show: boolean;
	setShow: any;
};

export const CreateClanSuccessModal = ({
	clan,
	show,
	setShow,
}: CreateClanSuccessModalProps) => {
	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={show} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto"
				initialFocus={cancelButtonRef}
				onClose={setShow}
			>
				<div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
							<div>
								<div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
									<CheckIcon
										className="w-6 h-6 text-green-600"
										aria-hidden="true"
									/>
								</div>
								<div className="mt-3 text-center sm:mt-5">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Your new clan is being created!
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											You can invite new users, and
											control your clan from the Clan
											Dashboard.
										</p>
										<p className="text-sm leading-relaxed text-gray-500">
											{" "}
											Check out the transaction:{" "}
											<Link
												href={
													"https://mumbai.polygonscan.com/tx/" +
													clan.hash
												}
											>
												{" "}
												{clan.hash && (
													<span className="text-blue-500">
														{truncateAddress(
															clan.hash
														)}
													</span>
												)}{" "}
											</Link>{" "}
										</p>
									</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
								<button
									type="button"
									className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
									onClick={() => setShow(false)}
								>
									Close
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
