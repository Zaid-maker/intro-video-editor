const testimonials = [
    { name: 'Alice', quote: 'My intro video looked amazing within minutes!' },
    { name: 'Bob', quote: 'So intuitive and fast—love the preview feature.' },
];

export function Testimonials() {
    return (
        <section className="py-16 px-4 bg-gray-100">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Loved by Creators</h3>
            <div className="max-w-3xl mx-auto space-y-8">
                {testimonials.map((t) => (
                    <blockquote key={t.name} className="text-center">
                        <p className="text-lg italic text-gray-700">“{t.quote}”</p>
                        <cite className="block mt-2 font-semibold text-gray-900">– {t.name}</cite>
                    </blockquote>
                ))}
            </div>
        </section>
    );
}
