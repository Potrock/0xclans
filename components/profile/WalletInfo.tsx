import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ClipboardIcon } from "@heroicons/react/24/outline";

export default function WalletInfo({ address }: { address: string }) {
	return (
		<div className="my-4">
			<div className="flex items-center justify-between w-full px-4 text-sm font-medium text-gray-900 bg-gray-800 rounded-md">
				<div>
					<span className="text-white">Wallet Address</span>
				</div>
				<div className="px-4 pt-4 pb-4 text-sm text-gray-300">
					<div className="inline-flex ">
						<p>{address}</p>
						<ClipboardIcon className="w-5 h-5 ml-2" />
					</div>
				</div>
			</div>
		</div>
	);
}
