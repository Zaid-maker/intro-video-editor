const features = [
    { title: 'Pick a Template', desc: 'Browse 20+ professionally designed intros.' },
    { title: 'Customize Live', desc: 'Edit text, colors, speed with live preview.' },
    { title: 'Render & Download', desc: 'Get high-quality MP4 effortlessly.' },
];

export function Features() {
    return (
        <section className="py-16 px-4 ">
            <h3 className="text-3xl font-bold text-center mb-12 text-white">How It Works</h3>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                {features.map((f) => (
                    <div key={f.title} className="p-6 bg-gray-50 rounded-lg shadow">
                        <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
                        <p className="text-white">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
