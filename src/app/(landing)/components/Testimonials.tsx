import { testimonials } from "@/lib/data";
import { Icons } from "../../../../assets/Icons";

export default function Testimonials() {
	return (
		<>
			{/* Testimonials */}
			<section className="relative z-10 py-32 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-20">
						<h2 className="text-5xl md:text-6xl font-black mb-6">
							<span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
								Loved by Creators
							</span>
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-[#8b43f7]/50 transition-all duration-300"
							>
								<div className="flex items-center mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Icons.Star
											key={i}
											className="w-5 h-5 fill-yellow-400 text-yellow-400"
										/>
									))}
								</div>
								<p className="text-gray-300 mb-4 italic">
									"{testimonial.text}"
								</p>
								<div>
									<p className="text-white font-semibold">{testimonial.name}</p>
									<p className="text-gray-400 text-sm">{testimonial.role}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
