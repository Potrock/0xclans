import { Label, Spinner, TextInput } from "flowbite-react";
import { Button } from "../elements/Button";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import ClanFactoryClones from "contracts/ClanFactoryClones.json";
import { useEffect, useState } from "react";
import { CreateClanSuccessModal } from "./CreateClanSuccessModal";

export const CreateClan = () => {
	const [name, setName] = useState<string>("");
	const [symbol, setSymbol] = useState<string>("");
	const [showModal, setShowModal] = useState<boolean>(false);

	const { config } = usePrepareContractWrite({
		address: ClanFactoryClones.address as `0x${string}`,
		abi: ClanFactoryClones.abi,
		functionName: "createClan",
		args: [name, symbol],
	});

	const { data, writeAsync, isLoading, isSuccess } = useContractWrite(config);

	const doWrite = async () => {
		if (writeAsync) await writeAsync();
	};

	useEffect(() => {
		if (isSuccess) {
			setShowModal(true);
		}
	}, [isSuccess]);

	return (
		<div className="">
			<CreateClanSuccessModal
				clan={{
					name: name,
					symbol: symbol,
					hash: data?.hash as string,
				}}
				show={showModal}
				setShow={setShowModal}
			/>
			<form className="flex flex-col gap-4">
				<div>
					<div className="block mb-2 text-white">
						<Label
							color={"white"}
							htmlFor="name"
							value="Clan Name"
						/>
					</div>
					<TextInput
						id="clan-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<div className="block mb-2">
						<Label
							color={"white"}
							htmlFor="symbol"
							value="Clan Symbol"
						/>
					</div>
					<TextInput
						id="clan-symbol"
						value={symbol}
						onChange={(e) => setSymbol(e.target.value)}
					/>
				</div>
				<Button onClick={doWrite}>
					{isLoading && (
						<div className="text-center">
							<Spinner />
						</div>
					)}
					{!isLoading && "Create Clan"}
				</Button>
			</form>
		</div>
	);
};
