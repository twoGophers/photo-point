import React from 'react'
import dynamic from 'next/dynamic';

const Cart = dynamic(() => import('@/components/cart/Cart'), {
  loading: () => (
    <div className='mt-8'>
      <h2 className='container text-3xl font-semibold antialiased text-center'>Loading...</h2>
    </div>
  ),
});

export default function page() {
  return (
    <div className='container'>
      <Cart />
    </div>
  )
}
