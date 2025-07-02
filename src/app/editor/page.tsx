import { Button } from "@/components/ui/button";
import { Play, SkipBack, SkipForward } from "lucide-react";
import { Icons } from "../../../assets/Icons";

export default function Editor() {
  return (
    <div className="relative bg-[#111113] h-[calc(100vh-7vh)] flex items-center justify-center p-4">
        <button className=" flex items-center justify-center space-x-2 text-white"><span className="bg-white/30 p-1 backdrop-blur-md text-white"><Icons.ArrowLeft className="size-4"/></span>Back</button>
      <div className="max-w-4xl w-full flex flex-col gap-6">
        {/* Video Area */}
        <div className="bg-[#111] rounded-2xl overflow-hidden shadow-lg">
          <div className="relative w-full aspect-video bg-black">
            {/* Placeholder for future Remotion/HTML5 Video */}
            <video
              className="w-full h-full object-cover"
              src="/placeholder-video.mp4"
              controls={false}
              autoPlay={false}
              muted
            />
            <div className="absolute top-4 left-4 w-5 h-5 border-2 border-[#8B43F7] rounded-full" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-semibold">Title 1</h2>
              <p className="text-sm">“Body text 1”</p>
            </div>
            <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-white text-xs font-medium">
              Guest
            </div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white">
              <h2 className="text-xl font-semibold">Title 2</h2>
              <p className="text-sm">“Body text 2”</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex justify-center items-center gap-4">
            <Button size="icon" variant="ghost" className="text-white">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className="bg-[#8B43F7] text-white hover:bg-[#8B43F7]/90"
            >
              <Play className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-white">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B43F7]"
              style={{ width: "25%" }} // Simulated 25% progress
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
