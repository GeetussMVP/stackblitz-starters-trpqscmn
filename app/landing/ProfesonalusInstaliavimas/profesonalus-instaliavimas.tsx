export default function ProfessionalInstallation() {
  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 leading-tight">
              Profesionalus{' '}
              <span className="text-teal-300">instaliavimas</span>
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white/80 font-light">
              per visą Lietuvą!
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-3xl blur-3xl" />

            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <div className="aspect-video relative">
                <img
                  src="/images/landing/installation.jpeg"
                  alt="Professional installation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
