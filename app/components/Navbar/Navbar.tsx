import NavbarClient from './NavbarClient';
export default function Navbar() {
// Define static data only (server-safe)
const navLinks = [
    { href: '/', label: 'Pagrindinis' },
    { href: '/apie-mus', label: 'Apie mus' },
    { href: '/produktai', label: 'Produktai' },
    { href: '/kontaktai', label: 'Kontaktai' },
  ];
// Pass static props to the client-side interactive component
return <NavbarClient navLinks={navLinks} />;
}