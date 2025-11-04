// File: app/page.tsx
import Background from './components/Background/Background';
import LandingClient from './landing/LandingClient';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
    

      {/* ✅ Client-side interactive section */}
      <main className="relative z-10 px-6 py-10 text-white">
        <LandingClient />
      </main>
    </div>
  );
}