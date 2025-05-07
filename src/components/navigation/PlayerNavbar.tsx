"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PlayerNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#152B59] text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 bg-[#D6AD60] rounded-md flex items-center justify-center">
              <span className="text-[#152B59] font-bold">♞</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Chess League</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/leagues" className="text-white/90 hover:text-white hover:underline underline-offset-4">
              Leagues
            </Link>
            <Link href="/tournaments" className="text-white/90 hover:text-white hover:underline underline-offset-4">
              Tournaments
            </Link>
            <Link href="/matches" className="text-white/90 hover:text-white hover:underline underline-offset-4">
              My Matches
            </Link>
            <Link href="/profile" className="text-white/90 hover:text-white hover:underline underline-offset-4">
              Profile
            </Link>
            <Link href="/login" className="px-4 py-2 border border-[#D6AD60] text-[#D6AD60] rounded-md hover:bg-[#D6AD60]/10 transition-colors">
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 border-t border-[#D6AD60]/20 space-y-3">
          <Link href="/leagues" className="block py-2 text-white hover:text-[#D6AD60]">
            Leagues
          </Link>
          <Link href="/tournaments" className="block py-2 text-white hover:text-[#D6AD60]">
            Tournaments
          </Link>
          <Link href="/matches" className="block py-2 text-white hover:text-[#D6AD60]">
            My Matches
          </Link>
          <Link href="/profile" className="block py-2 text-white hover:text-[#D6AD60]">
            Profile
          </Link>
          <Link href="/login" className="block py-2 mt-4 w-full text-center px-4 border border-[#D6AD60] text-[#D6AD60] rounded-md hover:bg-[#D6AD60]/10 transition-colors">
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
} 