'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function CheckoutPage() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const sum = cart.reduce((acc: number, item: any) => acc + item.price, 0);
    setTotal(sum);
  }, []);

  const handlePayPalRedirect = () => {
    const paypalEmail = "b3b4d3lg4do@gmail.com";
    const payUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalEmail)}&item_name=Compra+Ropa+Deportiva&amount=${total}&currency_code=USD`;
    window.location.href = payUrl;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold mb-4">Finalizar Compra</h1>
        <p className="text-2xl font-semibold mb-8">${total.toFixed(2)} USD</p>
        <button onClick={handlePayPalRedirect} className="w-full bg-[#0070ba] text-white py-3 rounded font-medium hover:bg-[#005ea6] transition">
          Pagar con PayPal
        </button>
      </div>
    </div>
  );
}