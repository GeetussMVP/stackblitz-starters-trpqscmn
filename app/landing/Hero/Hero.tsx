export default function Hero({ imageHeight = 450 }) {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start bg-black px-6 pb-20">

      {/* Small gap before image */}
      <div className="mt-4" />

      {/* Image */}
      <img
        src="/images/landing/hero2.png"
        alt="Hero"
        style={{ height: `${imageHeight}px` }}
        className="w-auto max-w-full object-cover mb-12"
      />

      {/* Text Section */}
      <div className="text-center mb-4">
        <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight">
          Pirmoji Kokybė
        </h1>
        <p className="text-3xl md:text-4xl font-light text-white/80 mb-4">
          jūsų namuose
        </p>

        {/* Arrow under the title */}
        <span className="animate-bounce text-white text-4xl mt-6 block">↓</span>
      </div>
    </div>
  );
}
