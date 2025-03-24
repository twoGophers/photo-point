'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Icon from "../icon/Icon";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/slices/searchSlice';

export default function Header() {

  const [searchTerm, setSearchTermLocal] = useState("");
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [cart, setCart] = useState({});


  const handleSearch = useCallback((e) => {
    setSearchTermLocal(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  }, [dispatch]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log("Search triggered: ", searchTerm);
    }
  }, [searchTerm]);

  const isActive = (link) => pathname === link;

  return (
    <header className="container flex flex-col items-end">
      <div>
        <Link className={`mr-8 ${isActive('/') ? 'text-pink-500' : ''}`} href={'/'}>Home</Link>
        <Link className={`${isActive('/cart') ? 'text-pink-500' : ''}`} href={'/cart'}>Cart</Link>
      </div>

      <div className="relative mt-4">
        <span className="absolute inset-y-0 left-3 flex items-center">
          <Icon name="search" />
        </span>
        <input
          className="pl-10 pr-4 py-1 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyPress}
          aria-label="Search input"
        />
      </div>
    </header>
  );
}
