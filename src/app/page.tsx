import { Hero } from "@/app/(landing)/components/Hero";
import { Features } from "@/app/(landing)/components/Features";
import { Testimonials } from "@/app/(landing)/components/Testimonials";
import { Pricing } from "@/app/(landing)/components/Pricing";
import { FAQ } from "@/app/(landing)/components/FAQ";
import { Footer } from "@/app/(landing)/components/Footer";

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
