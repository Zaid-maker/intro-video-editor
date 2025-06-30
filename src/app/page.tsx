import { Hero } from "./(landing)/components/Hero";
import { Features } from "./(landing)/components/Features";
import { Testimonials } from "./(landing)/components/Testimonials";
import { Pricing } from "./(landing)/components/Pricing";
import { FAQ } from "./(landing)/components/FAQ";
import { Footer } from "./(landing)/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
