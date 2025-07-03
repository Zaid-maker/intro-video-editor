import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Template from "./components/Template";

function Dashboard() {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Card 1 */}
        <div className="relative w-full lg:flex-[3] h-auto lg:h-96 rounded-lg bg-[#232327]">
          <Image
            width={100}
            height={100}
            src="/cardLines.webp"
            alt="Background lines"
            className="absolute inset-0 w-full h-48 object-cover opacity-20"
          />
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div className="flex justify-center mr-5  mb-0 lg:mb-4">
              <Image
                src="/file1.webp"
                alt="File icon"
                height={130}
                width={130}
              />
            </div>
            <div className="text-center lg:absolute lg:bottom-20 -lg:mt-0 -mt-6 left-32 lg:left-44 xl:left-[12rem] 2xl:left-[25rem]">
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
            <Image height={100}
              width={100} src="/cardshadow1.webp" alt="" />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col w-full lg:flex-[2] space-y-3">
          {/* Card 2 */}
          <div className="relative h-auto lg:h-48 rounded-lg bg-[#232327]">
<div className="relative z-10 p-4 sm:p-6 h-full flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
<Image
  height={100}
  width={100}
  src="/file2.webp"
  alt="File icon"
  className="w-20 h-20 sm:w-24 sm:h-24"
/>              <div className="text-center lg:text-left">
<div className="relative z-10 p-4 sm:p-6 h-full flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
<Image
  height={100}
  width={100}
  src="/file2.webp"
  alt="File icon"
  className="w-20 h-20 sm:w-24 sm:h-24"
/>              <div className="text-center lg:text-left">
                <h3 className="text-white text-lg font-semibold mb-1">
                  Create Your First Project
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Create your first project, discover tons of templates and generate any video you want.
                </p>
                {/* TODO: Add a form or Model to allow users to add name to there project. */}
                <Link href="/intro" passHref legacyBehavior>
                  <Button
                    className="bg-[#8B43F7] text-white text-sm font-medium rounded px-4 py-2 transition-colors duration-200 hover:bg-[#a366fa] cursor-pointer"
                  >
                    Create Project
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute bottom-0">
              <Image height={100}
                width={100} src="/cardshadow2.webp" alt="" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-auto lg:h-[179px] rounded-lg overflow-hidden bg-[#232327]">
            <div className="relative z-10 p-6 h-full flex flex-col lg:flex-row items-center gap-4">
              <div className="relative">
                <Image height={100}
                  width={100} src="/shape1.webp" alt="shape1" className="w-12 hidden lg:block absolute -top-5 rotate-[30deg] -left-[35px] h-12" />
                <Image height={100}
                  width={100} src="/shape2.webp" alt="shape2" className="w-[60px] hidden lg:block absolute -top-10 left-[6px] h-12" />
                <Image height={100}
                  width={100} src="/shape3.webp" alt="shape3" className="w-[45px] hidden lg:block absolute -top-8 rotate-[-6deg] left-[68px] h-[65px]" />
              <Image
  height={100}
  width={100}
  src="/file3.webp"
  alt="file3"
  className="w-28 h-24 sm:w-36 sm:h-28"
/>
              </div>
<div className="text-center sm:text-left  ml-3 -mt-2 sm:-mt-4">
                <h3 className="text-white  text-md font-semibold mb-1">
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
              <Image height={100}
                width={100} src="/cardshadow3.webp" alt="card-shadow-bg" />
            </div>
          </div>
        </div>
      </div>

      <Template />
    </>
  );
}

export default Dashboard;
