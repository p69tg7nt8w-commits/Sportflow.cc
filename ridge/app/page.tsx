import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Modules from "@/components/Modules";
import Process from "@/components/Process";
import Offer from "@/components/Offer";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Modules />
      <Process />
      <Offer />
      <FinalCta />
      <Footer />
    </>
  );
}
