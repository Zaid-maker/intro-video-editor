import Image from "next/image";
import { IMAGES } from "../../../../assets/Images";

// import {Icons} from "../../../assets/Icons"
export function Footer() {
    return (
        <footer className="relative bg-black z-10 border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
         
<Image
  src={IMAGES.logo}
  height={100}
  width={100}
  className="h-10 w-10 object-contain"
  alt="logo"
/>            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <span className="text-sm">© 2025 IntroGen. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    );
}
