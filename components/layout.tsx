import { Footer } from "./nav/Footer";
import { Navbar } from "./nav/Navbar";

export const Layout = ({ children }: any) => {
	return (
		<div className="min-h-screen text-white bg-gray-900">
			<Navbar />
			{children}
			{/* <Footer /> */}
		</div>
	);
};
