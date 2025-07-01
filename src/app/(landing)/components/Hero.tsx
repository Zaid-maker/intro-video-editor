import Link from 'next/link';

export function Hero() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-32 px-4 bg-gradient-to-br from-indigo-600 to-purple-700">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                Create Stunning Video Intros
            </h2>
            <p className="max-w-xl text-lg md:text-xl text-indigo-100 mb-8">
                Choose from 20+ templates, customize live, and download your intro—all in one tool.
            </p>
            <Link
                href="/intro"
                className="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
                Start Building
            </Link>
        </section>
    );
}


