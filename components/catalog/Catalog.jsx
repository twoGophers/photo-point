'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productSlice';
import Image from 'next/image';
import { StarRating } from 'react-flexible-star-rating';

export default function Catalog() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const { searchTerm } = useSelector((state) => state.search);
  const [sortOption, setSortOption] = useState('');
  const [cart, setCart] = useState({});

  const handleToCart = (id) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || {};
    if (currentCart[id]) {
      currentCart[id] += 1;
    } else {
      currentCart[id] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
    setCart(currentCart);
  };

  const sortedItems = () => {
    if (!items) return [];

    const filteredItems = items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOption) {
      case 'price_asc':
        return [...filteredItems].sort((a, b) => a.price - b.price);
      case 'price_desc':
        return [...filteredItems].sort((a, b) => b.price - a.price);
      case 'name_asc':
        return [...filteredItems].sort((a, b) => a.title.localeCompare(b.title));
      case 'name_desc':
        return [...filteredItems].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return filteredItems;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart)); 
      }
    }
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return (
    <div className='mt-8'>
      <h2 className='container  font-semibold antialiased text-center text-xl md:text-3xl'>Loading...</h2>
    </div>
  );

  if (error) return (
    <div className='mt-8'>
      <h2 className='container  font-semibold antialiased text-center text-xl md:text-3xl'>Error: {error}</h2>
    </div>
  );

  return (
    <div className='flex flex-col sm:mt-16'>
      <h2 className='font-semibold antialiased text-center text-xl md:text-3xl'>Catalog</h2>
      <div className="flex justify-end mb-4">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 mt-4 text-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 hover:shadow-md cursor-pointer"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option className='bg-[#0e0e0e]' value="">Sort by</option>
          <option className='bg-[#0e0e0e]' value="price_asc">Price: Low to High</option>
          <option className='bg-[#0e0e0e]' value="price_desc">Price: High to Low</option>
          <option className='bg-[#0e0e0e]' value="name_asc">Name: A to Z</option>
          <option className='bg-[#0e0e0e]' value="name_desc">Name: Z to A</option>
        </select>
      </div>

      <div className='mt-8 grid gap-6 3xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
        {sortedItems()?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col relative border border-gray-300 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_4px_12px_0_rgba(255,255,255,0.2)] hover:border-pink-500"
          >
            <div className="h-[200px] w-full flex justify-center items-center bg-white">
              <Image
                src={item.image}
                width={500}
                height={300}
                alt={item.title}
                className="object-contain h-full w-auto"
              />
            </div>

            <div className="flex flex-col p-4 flex-grow">
              <h3 className="text-base md:text-xl font-semibold antialiased w-full line-clamp-1">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-4 mt-2">{item.description}</p>
            </div>

            <div className="flex items-center justify-between p-4 mt-auto">
              <span className="text-xl font-semibold antialiased">${item.price}</span>
              <button
                onClick={() => handleToCart(item.id)}
                className={`ml-2 ${ cart[item.id] ? 'bg-blue-500 hover:bg-blue-600' : 'bg-pink-500 hover:bg-pink-600' } text-white rounded-lg px-4 py-2 transition-all duration-300 active:scale-95 cursor-pointer`}
              >
                {cart[item.id] ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            <div>
              <div className="absolute top-2 right-2 w-32">
                {item?.rating?.rate && (
                  <StarRating
                    initialRating={Math.round(item.rating.rate * 2) / 2}
                    isReadOnly={true}
                    isHoverEnabled={false}
                    isHalfRatingEnabled={true}
                  />
                )}
              </div>
              {item?.rating?.count && (
                <span className="absolute top-2 left-2 text-pink-500 border rounded p-1 bg-gray-200 text-xs">
                  {item.rating.count}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
