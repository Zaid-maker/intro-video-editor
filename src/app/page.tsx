import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <nav className="container mx-auto flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold">MyRemotion</h1>
        <Link href="/login" className="px-4 py-2 bg-white text-indigo-700 rounded-lg">Login</Link>
      </nav>

      <section className="container mx-auto text-center py-20 space-y-6">
        <h2 className="text-5xl font-extrabold">Create Stunning Video Intros</h2>
        <p className="text-xl max-w-2xl mx-auto">Customize from 20+ templates, preview live, and download your final video — all in one place.</p>
        <Link href="/intro" className="px-6 py-4 bg-white text-indigo-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition">Get Started</Link>
      </section>

      <section className="bg-white text-gray-800 py-16">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 shadow rounded-lg">
            <h3 className="text-2xl font-semibold">Choose a Template</h3>
            <p>Select from a wide variety of pre‑made intros tailored to your brand.</p>
          </div>
          <div className="p-6 shadow rounded-lg">
            <h3 className="text-2xl font-semibold">Customize Live</h3>
            <p>Edit text, colors, speed and preview instantly in your browser.</p>
          </div>
          <div className="p-6 shadow rounded-lg">
            <h3 className="text-2xl font-semibold">Render & Download</h3>
            <p>Render in high-quality MP4 and download with a single click.</p>
          </div>
        </div>
      </section>

      <footer className="container mx-auto text-center py-6">
        © {new Date().getFullYear()} MyRemotion — Empowering creators everywhere
      </footer>
    </main>
  );
}
