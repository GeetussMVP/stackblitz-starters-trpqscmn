export default function HeroSection() {
  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image - Full Width */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero/hero-background.png)' }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Hero Image - Full Width */}
        <div className="mb-6 w-full">
          <img 
            src="/images/hero/hero-image.jpg" 
            alt="Hero"
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Heading Text */}
        <div className="px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center drop-shadow-lg">
            Pirmoji Kokybė jūsų namuose
          </h1>
        </div>
      </div>
    </div>
  );
}