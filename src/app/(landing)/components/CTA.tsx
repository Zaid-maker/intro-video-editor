import { Icons } from "../../../../assets/Icons";

export default function CTA() {
	return (
		<>
			<section className="relative z-10 py-32 px-6 bg-gradient-to-b from-black to-gray-900">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-5xl md:text-6xl font-black mb-8">
						<span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							Ready to Create?
						</span>
					</h2>
					<p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
						Join thousands of creators who've elevated their content with
						professional video intros
					</p>
					<button className="group relative bg-gradient-to-r from-[#8b43f7] to-purple-600 px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
						<span className="flex items-center">
							Start Creating for Free
							<Icons.ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
						</span>
						<div className="absolute inset-0 bg-gradient-to-r from-[#8b43f7] to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity -z-10" />
					</button>
				</div>
			</section>
		</>
	);
}
