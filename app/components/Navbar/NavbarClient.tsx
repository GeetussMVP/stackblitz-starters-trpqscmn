"use client";

import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type NavLink = { href: string; label: string };
type NavbarClientProps = { navLinks: NavLink[] };

export default function NavbarClient({ navLinks }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartShake, setCartShake] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const handleCheckout = () => {
    setCartShake(true);
    setTimeout(() => setCartShake(false), 800);
    router.push('/checkout');
  };

  const navClass = mounted && scrolled ? 'bg-black shadow-lg' : 'bg-black';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass} text-white`}>

      {/* TOP ROW */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 py-4">

          {/* LEFT */}
          <div className="flex items-center h-full space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Meniu"
              className="md:hidden p-2 text-white transition-transform duration-200 hover:scale-110"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
            <Link
              href="/prisijungti"
              className="hidden md:flex items-center text-sm font-medium text-white hover:text-emerald-400 transition-colors duration-200 whitespace-nowrap h-full"
            >
              Užsiregistruoti / Prisijungti
            </Link>
          </div>

          {/* CENTER — Logo */}
          <div className="flex items-center justify-center flex-1 h-full">
            <Link href="/" className="flex items-center justify-center h-full">
              <Image
                src="/images/logo/logo.png"
                alt="Logo"
                width={300}
                height={120}
                className="h-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center h-full space-x-4">
            <button aria-label="Paieška" className="p-2 transition-transform hover:scale-110">
              <FaSearch size={20} />
            </button>
            <button
              aria-label="Krepšelis"
              onClick={handleCheckout}
              className={`p-2 transition-transform ${cartShake ? 'animate-shake' : 'hover:scale-110'}`}
            >
              <FaShoppingCart size={20} />
            </button>
          </div>

        </div>
      </div>

      {/* SECOND ROW — Nav Links */}
      <div className="hidden md:flex justify-center space-x-8 py-3 bg-black">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="relative group">
            <span
              className={`font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-emerald-400'
                  : 'text-white group-hover:text-emerald-400'
              }`}
            >
              {link.label}
            </span>
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all duration-300 ${
                isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </Link>
        ))}
      </div>

      {/* MOBILE NAV */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm shadow-lg border-t border-gray-700">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded transition-colors duration-200 font-medium ${
                  isActive(link.href)
                    ? 'bg-emerald-900 text-emerald-400'
                    : 'text-white hover:bg-gray-800 hover:text-emerald-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

    </nav>
  );
}
