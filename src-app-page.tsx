'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  async function fetchProducts() {
    let query = supabase.from('products').select('*');
    if (category) query = query.eq('category', category);
    const { data } = await query;
    if (data) setProducts(data);
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto añadido al carrito');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input 
            type="text" 
            placeholder="Buscar ropa deportiva..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-neutral-200 px-4 py-2 rounded-full w-full md:w-80 text-sm focus:outline-none focus:border-black"
          />
          <div className="flex gap-2 text-sm">
            {['', 'leggings', 'tops', 'conjuntos'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full capitalize transition ${category === cat ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
              >
                {cat || 'Todos'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              <div className="aspect-[3/4] bg-neutral-100 overflow-hidden rounded-lg mb-3 relative">
                <img src={product.image_url} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-500"/>
              </div>
              <h3 className="font-medium text-sm text-neutral-800">{product.name}</h3>
              <p className="text-sm font-semibold mt-1">${product.price}</p>
              <button onClick={() => addToCart(product)} className="mt-3 w-full bg-black text-white text-xs py-2 rounded uppercase tracking-wider hover:bg-neutral-800 transition flex items-center justify-center gap-2">
                <ShoppingBag size={14}/> Agregar
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}