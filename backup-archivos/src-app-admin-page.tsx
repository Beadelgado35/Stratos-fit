'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('leggings');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Selecciona una imagen');
    setLoading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('products').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);

      const { error: insertError } = await supabase.from('products').insert([
        { name, price: parseFloat(price), category, image_url: publicUrl }
      ]);
      if (insertError) throw insertError;

      alert('¡Producto creado exitosamente!');
      setName('');
      setPrice('');
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-16">
        <h1 className="text-xl font-bold tracking-tight mb-6">Panel de Administración - Subir Producto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Nombre del Producto</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border border-neutral-200 p-2 rounded text-sm"/>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Precio ($)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full border border-neutral-200 p-2 rounded text-sm"/>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Categoría</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-neutral-200 p-2 rounded text-sm">
              <option value="leggings">Leggings</option>
              <option value="tops">Tops</option>
              <option value="conjuntos">Conjuntos</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Imagen</label>
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} required className="w-full text-sm"/>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded text-sm font-medium hover:bg-neutral-800 transition">
            {loading ? 'Subiendo...' : 'Guardar Producto'}
          </button>
        </form>
      </div>
    </div>
  );
}