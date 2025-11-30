export default function Hero() {
  return (
    <div className="relative w-full min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
            Pirmoji Kokybė
          </h1>
          <p className="text-3xl md:text-4xl lg:text-5xl font-light text-white/80">
            jūsų namuose
          </p>
        </div>

        <div className="relative w-full mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-3xl blur-3xl" />

          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <img 
              src="/images/landing/hero.jpg" 
              alt="Hero" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}