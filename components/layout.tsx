import { Footer } from "./nav/Footer";
import { Navbar } from "./nav/Navbar";

export const Layout = ({ children }: any) => {
	return (
		<div className="flex flex-col min-h-screen text-white bg-gray-900">
			<Navbar />
			<div className="w-11/12 mx-auto max-w-[1600px] flex flex-col flex-auto">
				{children}
			</div>
			{/* <Footer /> */}
		</div>
	);
};
