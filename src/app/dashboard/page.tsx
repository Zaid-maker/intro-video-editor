import Image from "next/image";
import Template from "./components/Template";

function Dashboard() {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Card 1 */}
        <div className="relative w-full lg:flex-[3] h-auto lg:h-96 rounded-lg bg-[#232327]">
          <Image
            src="/cardLines.webp"
            alt="Background lines"
            className="absolute inset-0 w-full h-48 object-cover opacity-20"
          />
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div className="flex justify-center mr-5  mb-0 lg:mb-4">
              <Image
                src="/file1.webp"
                alt="File icon"
              />
            </div>
            <div className="text-center lg:absolute lg:bottom-20 -lg:mt-0 -mt-6 lg:left-72 xl:left-[335px]">
              <h3 className="text-white text-2xl font-semibold mb-2">
                Start with your own file
              </h3>
              <p className="text-gray-300 lg:text-lg text-sm lg:w-96 mb-4">
                Upload your videos or images, select a template and see what brainstorm is capable to do.
              </p>
              <button className="px-4 py-2 bg-[#8B43F7] rounded-lg text-white text-xs font-medium">
                Browse files to upload your videos or images
              </button>
            </div>
            <div className="flex items-center mt-4 italic justify-center lg:ml-6">
              <span className="text-gray-500 text-sm text-center">
                JPG, PNG and Webp formats up to 5 MB.
              </span>
            </div>
          </div>
          <div className="absolute bottom-0">
            <Image src="cardshadow1.webp" alt="" />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col w-full lg:flex-[2] space-y-3">
          {/* Card 2 */}
          <div className="relative h-auto lg:h-48 rounded-lg bg-[#232327]">
            <div className="relative z-10 p-6 h-full flex flex-col lg:flex-row items-center gap-4">
              <Image src="/file2.webp" alt="File icon" className="w-24 h-24" />
              <div className="text-center lg:text-left">
                <h3 className="text-white text-lg font-semibold mb-1">
                  Create Your First Project
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Create your first project, discover tons of templates and generate any video you want.
                </p>
                <button className="px-4 py-2 rounded text-white text-sm font-medium bg-[#8B43F7]" >
                  Create Project
                </button>
              </div>
            </div>
            <div className="absolute bottom-0">
              <Image src="cardshadow2.webp" alt="" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-auto lg:h-[179px] rounded-lg overflow-hidden bg-[#232327]">
            <div className="relative z-10 p-6 h-full flex flex-col lg:flex-row items-center gap-4">
              <div className="relative">
                <Image src="/shape1.webp" alt="shape1" className="w-12 hidden lg:block absolute -top-5 rotate-[30deg] -left-[35px] h-12" />
                <Image src="/shape2.webp" alt="shape2" className="w-[60px] hidden lg:block absolute -top-10 left-[6px] h-12" />
                <Image src="/shape3.webp" alt="shape3" className="w-[45px] hidden lg:block absolute -top-8 rotate-[-12deg] left-[74px] h-[65px]" />
                <Image src="/file3.webp" alt="File icon" className="w-36 h-32 -ml-3" />
              </div>
              <div className="text-center lg:text-left lg:-ml-10 ml-0 -mt-4">
                <h3 className="text-white text-lg font-semibold mb-1">
                  Explore Templates and Start Kickstarting Your Project
                </h3>
                <p className="text-gray-300 lg:text-sm text-xs   mb-2">
                  Create your first project, discover tons of templates and generate any video you want.
                </p>
                <button className="px-4 py-2 rounded  text-white text-sm font-medium bg-[#8B43F7]">
                  Explore Project
                </button>
              </div>
            </div>
            <div className="absolute bottom-0">
              <Image src="cardshadow3.webp" alt="" />
            </div>
          </div>
        </div>
      </div>

      <Template />
    </>
  );
}

export default Dashboard;
