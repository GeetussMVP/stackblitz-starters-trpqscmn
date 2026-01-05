import Image from "next/image";

export default function ApieMus(){
  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
              Apie Mus
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-white/80">
              kokybė ir patirtis
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-3xl blur-3xl"/>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <div className="aspect-[16/9] relative">
                <Image src="/images/apie-mus/1.webp" alt="Mūsų komanda" fill className="object-cover"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="w-full py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-3xl blur-3xl"/>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <div className="aspect-square relative">
                  <Image src="/images/apie-mus/2.webp" alt="Įmonės istorija" fill className="object-cover"/>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
                Mūsų <span className="text-teal-300">istorija</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">
                Daugiau nei 15 metų patirties teikiant aukščiausios kokybės paslaugas visoje Lietuvoje. Mes tikime, kad kiekvienas projektas yra unikalus ir vertas išskirtinio dėmesio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
                Mūsų <span className="text-blue-300">vertybės</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-8">
                Profesionalumas, patikimumas ir kokybė – tai principai, kuriais vadovaujamės kiekviename projekte.
              </p>
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-2xl font-light text-white mb-2">Kokybė</h3>
                  <p className="text-white/60">Naudojame tik patikimiausius sprendimus</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-2xl font-light text-white mb-2">Patirtis</h3>
                  <p className="text-white/60">15+ metų rinkoje</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-2xl font-light text-white mb-2">Garantija</h3>
                  <p className="text-white/60">Pilna atsakomybė už savo darbą</p>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"/>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <div className="aspect-[16/9] relative">
                  <Image src="/images/apie-mus/3.webp" alt="Mūsų vertybės" fill className="object-cover"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-3xl blur-3xl"/>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                Pradėkime <span className="text-teal-300">kartu</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/70 font-light mb-8">
                Susisiekite su mumis ir aptarkime jūsų projektą
              </p>
              <a href="/kontaktai" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-light transition-colors inline-block">
                Susisiekti
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
