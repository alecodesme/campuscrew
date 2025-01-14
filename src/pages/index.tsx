import Navbar from "@/components/app/navbar/navbar";
import WelcomeLanding from "@/components/app/welcome-landing";
import Image from "next/image";
import ImagePeople from '@/assets/university_people.png'
import Statistics from "@/components/app/stadistics/stadistics";
import UniversityRow from "@/components/app/participants/participants";
import Footer from "@/components/app/footer/footer";

export default function Home() {
  return (
    <div className="w-full bg-white h-fit">
      <Navbar />
      <div className="flex flex-col md:flex-row md:w-full h-3/5">
        <WelcomeLanding />
        <Image src={ImagePeople} alt="unipeople" />
      </div>
      <Statistics />
      <UniversityRow />
      <Footer />
    </div>
  );
}
