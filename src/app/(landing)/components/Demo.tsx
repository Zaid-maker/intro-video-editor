import { Icons } from "../../../../assets/Icons";

export default function Demo() {
    return (<>
          {/* Demo Section */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              See It In Action
            </span>
          </h2>
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b43f7]/30 to-purple-600/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative bg-gray-900 border-2 border-gray-800 rounded-3xl p-2 group-hover:border-[#8b43f7]/50 transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#8b43f7] to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icons.Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>)
}