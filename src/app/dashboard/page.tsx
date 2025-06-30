import Link from "next/link";

const mockIntros = [
  { id: 1, name: "Product Launch Intro", updated: "2024-06-10" },
  { id: 2, name: "YouTube Channel Intro", updated: "2024-06-08" },
  { id: 3, name: "Course Welcome", updated: "2024-06-05" },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen font-sans bg-gradient-to-br from-slate-50 to-slate-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome! Manage your video intros and get started quickly.</p>
        <div className="flex gap-4 mb-8">
          <Link href="/intro">
            <button className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">Create New Intro</button>
          </Link>
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded shadow cursor-not-allowed" disabled>Import Intro (coming soon)</button>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Intros</h2>
          <ul className="divide-y">
            {mockIntros.map((intro) => (
              <li key={intro.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-medium">{intro.name}</span>
                  <span className="ml-2 text-xs text-gray-500">(Last edited: {intro.updated})</span>
                </div>
                <Link href={`/intro?id=${intro.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
} 