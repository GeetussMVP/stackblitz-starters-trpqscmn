export default function ProfessionalInstallation() {
  return (
    <section className="w-full bg-transparent py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-row items-center gap-4 sm:gap-6 md:gap-8">
        {/* Left side - Text */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
            Profesionalus{' '}
            <span className="text-emerald-400">instaliavimas</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-semibold leading-tight">
            per visą Lietuvą!
          </p>
        </div>

        {/* Right side - Image */}
        <div className="flex-1 min-w-0">
          <div className="relative w-full" style={{ paddingBottom: '50%' }}>
            <img
              src="/images/landing/profesonalus-instaliavimas.jpg"
              alt="Professional installation service"
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl ring-2 ring-emerald-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}