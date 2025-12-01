import { Briefcase } from 'lucide-react';

const VersloKlijentai = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-[3rem] blur-3xl" />

          <div className="relative bg-white/10 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between p-12 lg:p-16 gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                  Verslo Klijentai
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl">
                  Spauskite čia kad susikurti verslo paskyrą
                </p>
                <a
                  href="/verslo-registracija"
                  className="inline-block bg-white/90 backdrop-blur-sm text-slate-900 px-8 py-4 rounded-2xl font-medium text-lg shadow-lg hover:bg-white hover:scale-105 transform transition-all duration-300 border border-white/30"
                >
                  Sukurti Verslo Paskyrą
                </a>
              </div>

              <div className="flex-shrink-0 lg:ml-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-full p-12 border border-white/20">
                    <Briefcase
                      className="w-32 h-32 text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VersloKlijentai;
