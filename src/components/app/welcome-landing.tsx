import { useRouter } from "next/router"
import React from "react"
const WelcomeLanding = () => {
    const router = useRouter()
    return <div className="w-full md:w-2/4 flex flex-col gap-6 px-5 md:px-12 justify-center pb-8">
        <div className="text-4xl text-black font-semibold leading-relaxed">
            <span className="block">Empowering students,</span>
            <span className="block">building <span className="text-blue-500">communities,</span></span>
            <span className="block">shaping futures 🚀</span>
        </div>
        <div className="text-sm text-gray-500">
            At Campus Crew, we provide a platform where universities can connect, engage, and grow their student communities. Our mission is to empower institutions to create and manage student clubs effortlessly, fostering collaboration, creativity, and leadership among students. With Campus Crew, every university has the tools to build a vibrant campus culture and nurture the leaders of tomorrow.
        </div>
        <div onClick={() => {
            router.push('/joinus')
        }} className="px-5 py-2 w-fit text-blue-950 border-blue-950 bg-white rounded-full border-solid border hover:bg-blue-950 hover:text-white duration-300 cursor-pointer">
            <span>Join us now!</span>
        </div>
    </div>

}

export default WelcomeLanding