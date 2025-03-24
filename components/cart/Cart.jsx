'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productSlice';
import Image from 'next/image';

export default function Cart() {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.products);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (items?.length > 0) {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
            const filteredItems = items
                .filter(item => savedCart[item.id])
                .map(item => ({ ...item, quantity: savedCart[item.id] || 1 }));
            setCartItems(filteredItems);
        }
    }, [items]);

    const updateLocalStorage = (updatedItems) => {
        const updatedCart = updatedItems.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {});
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleIncrease = (id) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedItems);
        updateLocalStorage(updatedItems);
    };

    const handleDecrease = (id) => {
        const updatedItems = cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedItems);
        updateLocalStorage(updatedItems);
    };

    const handleRemove = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
        updateLocalStorage(updatedItems);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (cartItems.length === 0) return (
        <div className='mt-8'>
            <h2 className='container text-xl md:text-3xl font-semibold antialiased text-center'>Your cart is empty</h2>
        </div>
    );

    return (
        <div className="mt-4 mb-4 sm:mt-16 sm:mb-8">
            <h2 className=' text-xl md:text-3xl font-semibold antialiased text-center'>Your cart</h2>
            <div className="flex flex-col gap-4 mt-8 sm:mt-16">
                {cartItems?.map((item) => (
                    <div key={item.id} className="flex flex-col p-4 sm:p-0 sm:flex-row items-center justify-between border border-gray-300 rounded-2xl overflow-hidden h-auto sm:h-[200px] cursor-pointer transition-all duration-300 hover:shadow-[0_4px_12px_0_rgba(255,255,255,0.2)] hover:border-pink-500">
                        <span className="flex-shrink-0 relative w-[200px] h-[200px]">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                style={{
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                }}
                                sizes="(max-width: 768px) 100vw, 200px"
                            />
                        </span>

                        <div className="flex flex-col justify-between p-4 sm:p-8 w-full h-full">
                            <h3 className="text-base md:text-xl  font-semibold line-clamp-1">{item.title}</h3>
                            <p className="text-gray-600 line-clamp-4">{item.description}</p>
                            <p className="text-pink-500 font-semibold text-end mt-auto">Price: ${(item.price ?? 0) * (item.quantity ?? 0)}</p>
                        </div>

                        <div className="flex flex-col justify-between items-center w-1/3 sm:w-1/5 p-0 sm:p-8 h-full">
                            <div className="flex flex-row items-center justify-between w-full">
                                <button onClick={() => handleDecrease(item.id)} className="cursor-pointer flex items-center justify-center text-xl px-2 py-1 w-8 h-8 bg-gray-200 rounded text-pink-500 hover:bg-gray-300">-</button>
                                <p className="text-white">{item.quantity}</p>
                                <button onClick={() => handleIncrease(item.id)} className="cursor-pointer flex items-center justify-center text-xl px-2 py-1 w-8 h-8 bg-gray-200 rounded text-pink-500 hover:bg-gray-300">+</button>
                            </div>
                            <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 cursor-pointer mt-auto">Remove</button>
                        </div>
                    </div>

                ))}
            </div>
            <div className="mt-8 flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
            </div>
        </div>
    );
}
