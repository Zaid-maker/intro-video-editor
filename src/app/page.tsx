import Hero from "./(landing)/components/Hero";

import { Footer } from "./(landing)/components/Footer";
import LandingPageNavbar from "./(landing)/components/LandingPageNavbar";
/**
 * Renders the main landing page layout with a navigation bar, hero section, and footer.
 *
 * Combines the `LandingPageNavbar`, `Hero`, and `Footer` components within a styled main section.
 */
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
