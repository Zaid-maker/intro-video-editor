"use client"
import { useEffect, useState } from 'react';
import { Icons } from '../../../../assets/Icons';

import Link from 'next/link';
import CTA from './CTA';
import Demo from './Demo';
import Features from './Features';
import Testimonials from './Testimonials';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-[#8b43f7]/10 to-purple-600/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-600/10 to-[#8b43f7]/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>



      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className={`text-center max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-end px-4 py-1 bg-gradient-to-r from-[#8b43f7]/20 to-purple-600/20 rounded-full border border-[#8b43f7]/30 mb-8">
            <Icons.Zap className="w-4 h-4 mr-2 text-[#8b43f7]" />
            <span className="text-sm  text-gray-300">Create Professional Video Intros in Minutes</span>
          </div>

          <h1 className="lg:text-6xl text-4xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Craft Stunning
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#8b43f7] to-purple-600 bg-clip-text text-transparent">
              Video Intros
            </span>
          </h1>

          <p className="lg:text-xl text-lg  text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your content with cinematic intros. Choose from 20+ premium templates,
            customize in real-time, and download in 4K quality—all without any design experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative bg-gradient-to-r from-[#8b43f7] to-purple-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              <Link href="/dashboard" className="flex items-center">
                <Icons.Play className="w-5 h-5 mr-2" />
                Start Creating Now
                <Icons.ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b43f7] to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity -z-10" />
            </button>

            <button className="group px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-gray-700 hover:border-[#8b43f7] transition-all duration-300 hover:bg-[#8b43f7]/10">
              <span className="flex items-center">
                <Icons.MousePointer className="w-5 h-5 mr-2" />
                View Demo
              </span>
            </button>
          </div>


        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icons.ChevronDown className="w-8 h-8 text-gray-500" />
        </div>
      </section>

      <Features />
      <Demo />

      <Testimonials />

      <CTA />



    </div>
  );
}
