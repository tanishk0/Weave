import { Navbar } from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
export default function Home() {
  return (

    <div className="flex h-full flex-col">
      <div className="flex h-full w-full flex-1">
        <Navbar />
      </div>
      <HeroSection />
    </div>
  );
}
