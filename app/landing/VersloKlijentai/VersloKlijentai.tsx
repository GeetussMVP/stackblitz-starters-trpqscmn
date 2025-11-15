'use client';

import React from 'react';
import { Briefcase } from 'lucide-react';

const VersloKlijentai = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-emerald-400 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12">
            {/* Left side - Text content */}
            <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Verslo Klijentai
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
                Spauskite čia kad susikurti verslo paskyrą
              </p>
              <a
                href="/signup/business"
                className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-emerald-50 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                Sukurti Verslo Paskyrą
              </a>
            </div>

            {/* Right side - Icon */}
            <div className="flex-shrink-0 lg:ml-12">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
                <Briefcase 
                  className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 text-white drop-shadow-2xl" 
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VersloKlijentai;