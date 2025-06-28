import { Navbar } from './(landing)/components/Navbar';
import { Hero } from './(landing)/components/Hero';
import { Features } from './(landing)/components/Features';
import { Testimonials } from './(landing)/components/Testimonials';
import { Footer } from './(landing)/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
