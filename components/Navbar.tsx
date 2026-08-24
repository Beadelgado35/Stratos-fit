import Link from 'next/link';
import { ShoppingBag, User, Search, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-widest text-lg uppercase">
          Aura Fit
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-neutral-600">
          <Link href="/?category=leggings" className="hover:text-black transition">Leggings</Link>
          <Link href="/?category=tops" className="hover:text-black transition">Tops</Link>
          <Link href="/?category=conjuntos" className="hover:text-black transition">Conjuntos</Link>
        </nav>
        <div className="flex items-center gap-5">
          <Link href="/orders" className="text-neutral-600 hover:text-black"><Search size={20}/></Link>
          <Link href="/cart" className="text-neutral-600 hover:text-black relative"><ShoppingBag size={20}/></Link>
          <Link href="/login" className="text-neutral-600 hover:text-black"><User size={20}/></Link>
          <Link href="/admin" className="text-neutral-400 hover:text-black" title="Admin"><ShieldAlert size={20}/></Link>
        </div>
      </div>
    </header>
  );
}