import { Footer } from "./nav/Footer";
import { Navbar } from "./nav/Navbar";

export const Layout = ({ children }: any) => {
	return (
		<div className="min-h-screen text-white bg-gray-900">
			<Navbar />
			<div className="flex flex-col w-11/12 mx-auto max-w-[1600px] grow shrink-0 basis-auto">
				{children}
			</div>
			{/* <Footer /> */}
		</div>
	);
};
