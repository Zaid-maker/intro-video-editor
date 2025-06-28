import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="py-6 px-4 md:px-8 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">MyRemotion</h1>
            <Link href="/intro" className="rounded bg-white text-indigo-700 px-4 py-2 hover:bg-gray-100">
                Get Started
            </Link>
        </nav>
    );
}
