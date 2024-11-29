import logo from "@/assets/campus_crew_logo.png";
import Image from "next/image";
const Navbar = () => {
    return (
        <div className="flex w-full flex-row items-center justify-between p-5">
            {/* Logo */}
            <div>
                <Image height={60} width={60} alt="Logo" src={logo} />
            </div>
            {/* Navigation Links */}
            <nav className="flex justify-center flex-row space-x-6">
                <a href="/" className="text-gray-700 font-thin">
                    Home
                </a>
                <a href="#" className="text-gray-700 font-thin">
                    Gallery
                </a>
                <a href="#" className="text-gray-700 font-thin">
                    Universities
                </a>
            </nav>

            <div></div>

        </div>
    );
}

export default Navbar