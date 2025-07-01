// import Link from 'next/link';

// export function Hero() {
//     return (
//         <section className="flex flex-col items-center justify-center text-center py-32 px-4 bg-gradient-to-br from-indigo-600 to-purple-700">
//             <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
//                 Create Stunning Video Intros
//             </h2>
//             <p className="max-w-xl text-lg md:text-xl text-indigo-100 mb-8">
//                 Choose from 20+ templates, customize live, and download your intro—all in one tool.
//             </p>
//             <Link
//                 href="/intro"
//                 className="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition"
//             >
//                 Start Building
//             </Link>
//         </section>
//     );
// }



export function Hero() {
    return (
        <div className="flex w-full items-stretch gap-6 p-6 ">
            {/* Card 1 */}
            <div className="relative flex-[3] w-96 h-96 rounded-lg  bg-[#232327]"     >
                <img
                    src="/cardLines.webp"
                    alt="Background lines"
                    className="absolute inset-0 w-full h-48 object-cover opacity-20"
                />
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div className="flex  justify-center mb-4">
                        <img
                            src="/file1.webp"
                            alt="File icon"
                            className="h-44 w-40"
                        />
                    </div>
                    <div className="text-center absolute bottom-20   left-72">
                        <h3 className="text-white text-2xl font-semibold mb-2">
                            Start with your own file
                        </h3>
                        <p className="text-gray-300 text-lg w-96 mb-4">
                            Upload your videos or images, select a template and see what brainstorm is capable to do.
                        </p>
                        <button
                            className="px-4 py-2 bg-[#8B43F7] rounded-lg text-white text-sm font-medium"

                        >
                            Browse files to upload your videos or images
                        </button>

                    </div>
                    <div className=' flex items-center ml-6 italic justify-center'>
                        <span className='text-gray-500 text-sm'>
                            JPG, PNG and Webp formats upto 5 MB.
                        </span>
                    </div>
                </div>
                <div className="absolute bottom-0 "><img src="cardshadow1.webp" alt="" /></div>
            </div>
            <div className="flex flex-col flex-[2] space-y-3">

                {/* Card 2 */}
                <div className="relative h-48 rounded-lg bg-[#232327]">

                    <div className="relative z-10 p-6 h-full flex items-center gap-4">
                        <img src="/file2.webp" alt="File icon" className="w-24 h-24" />
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-1">
                                Create Your First Project
                            </h3>
                            <p className="text-gray-300 text-sm mb-2">
                                Create your first project, discover tons of templates and generate any video you want.
                            </p>
                            <button
                                className="px-4 py-2 rounded text-white text-sm font-medium"
                                style={{ backgroundColor: '#8B43F7' }}
                            >
                                Create Project
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 "><img src="cardshadow2.webp" alt="" /></div>

                </div>

                {/* Card 3 */}
                <div className="relative h-48 rounded-lg overflow-hidden bg-[#232327]">

                    <div className="relative z-10 p-6 h-full flex items-center gap-4">

                        <img src="/shape1.webp" alt="File icon" className="w-12 absolute top-3 rotate-[30deg] -left-[3px] h-12" />
                        <img src="/shape2.webp" alt="File icon" className="w-[55px] absolute -top-2 left-[36px] h-12" />
                        <img src="/shape3.webp" alt="File icon" className="w-[45px] absolute -top-1 left-[94px]  h-[65px]   " />
                        <div className=' relative'>

                            <img src="/file3.webp" alt="File icon" className="w-32 h-32" />
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-1">
                                Explore Templates and Start Kickstarting Your Project
                            </h3>
                            <p className="text-gray-300 text-sm mb-2">
                                Create your first project, discover tons of templates and generate any video you want.
                            </p>
                            <button
                                className="px-4 py-2 rounded text-white text-sm font-medium"
                                style={{ backgroundColor: '#8B43F7' }}
                            >
                                Explore Project
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 "><img src="cardshadow3.webp" alt="" /></div>

                </div>
            </div>

        </div>
    )
}