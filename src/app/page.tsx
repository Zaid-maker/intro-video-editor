import Hero from "./(landing)/components/Hero";

import { Footer } from "./(landing)/components/Footer";
import LandingPageNavbar from "./(landing)/components/LandingPageNavbar";
export default function Home() {
  return (
    <>
    <LandingPageNavbar />
    <main className="bg-[#111113]">
      <Hero />

      <Footer />
    </main>
    </>
  );
}
