// File: app/page.tsx
import LandingClient from './landing/LandingClient';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <main className="relative z-10 text-white">
        <LandingClient />
        
      </main>
    </div>
  );
}