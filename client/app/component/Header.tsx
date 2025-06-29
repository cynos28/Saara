"use client";

import Image from "next/image";
import { FaShoppingCart, FaBell, FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { useState, useEffect } from "react";
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import CartModal from './CartModal';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [showCart, setShowCart] = useState(false);
  const { totalItems } = useCart();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const checkLoginStatus = () => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;

      const response = await fetch('http://localhost:3001/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.profileImage) {
          setUserImage(data.profileImage);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserImage('');
    router.push('/');
    
    // Force page refresh to update all components with new auth state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <header className="bg-[#e6e2e0] shadow-md text-gray-800 py-2 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Adjusted size */}
          <Link href="/" className="flex items-center">
            <div className="w-24 h-14 relative rounded-lg ">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation - Right aligned */}
          <div className="hidden lg:flex items-center justify-end flex-1">
            <nav className="mr-8">
              <ul className="flex items-center space-x-12">
                <li>
                  <Link href="/" className="hover:text-[#8B7355] transition-colors duration-300">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-[#8B7355] transition-colors duration-300">
                    SERVICES
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#8B7355] transition-colors duration-300">
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link href="/category" className="hover:text-[#8B7355] transition-colors duration-300">
                    FLORAL CATEGORIES
                  </Link>
                </li>
              </ul>
            </nav>

            {/* User/Auth and Icons Section */}
            <div className="flex items-center space-x-6">
              {isLoggedIn ? (
                <div 
                  onClick={handleProfileClick}
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-[#8B7355]" />
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setShowSignIn(true)}
                  className="px-4 py-2 bg-[#8B7355] text-white rounded-full hover:bg-[#6F5B3E] transition-colors duration-300"
                >
                  SIGN IN
                </button>
              )}
              
              {/* Icons */}
              <button 
                onClick={() => setShowCart(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F0EB] hover:bg-[#E8E0D8] relative"
              >
                <FaShoppingCart className="text-[#8B7355] text-xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8B7355] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F0EB] hover:bg-[#E8E0D8]">
                <FaBell className="text-[#8B7355] text-xl" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6 text-[#8B7355]" />
            ) : (
              <HiMenu className="h-6 w-6 text-[#8B7355]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu - Improved styling */}
        <div 
          className={`lg:hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-300`}
        >
          <nav className="mt-4 pt-4 border-t border-gray-200">
            <ul className="flex flex-col space-y-6 pb-6">
              <li>
                <Link 
                  href="/" 
                  className="block hover:text-[#8B7355] transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="block hover:text-[#8B7355] transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SERVICES
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="block hover:text-[#8B7355] transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link 
                  href="/category" 
                  className="block hover:text-[#8B7355] transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FLORAL CATEGORIES
                </Link>
              </li>
              {isLoggedIn ? (
                <li>
                  <div 
                    onClick={handleProfileClick}
                    className="block px-4 py-2 text-center cursor-pointer"
                  >
                    My Profile
                  </div>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="block px-4 py-2 bg-[#8B7355] text-white rounded-full hover:bg-[#6F5B3E] transition-colors duration-300 text-center w-full"
                  >
                    SIGN IN
                  </button>
                </li>
              )}
            </ul>
            
            {/* Mobile Icons */}
            <div className="flex justify-center space-x-6 mt-6 pb-4 border-t border-gray-200 pt-6">
              <button 
                onClick={() => setShowCart(true)}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F5F0EB] hover:bg-[#E8E0D8] transition-colors duration-300 relative"
              >
                <FaShoppingCart className="text-[#8B7355] text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8B7355] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F5F0EB] hover:bg-[#E8E0D8] transition-colors duration-300">
                <FaBell className="text-[#8B7355] text-2xl" />
              </button>
            </div>
          </nav>
        </div>

        {/* Sign In/Up Modals */}
        {showSignIn && (
          <SignIn 
            onClose={() => setShowSignIn(false)} 
            onSwitchToSignUp={() => {
              setShowSignIn(false);
              setShowSignUp(true);
            }}
          />
        )}
        {showSignUp && (
          <SignUp 
            onClose={() => setShowSignUp(false)}
            onSwitchToSignIn={() => {
              setShowSignUp(false);
              setShowSignIn(true);
            }}  
          />
        )}

        {/* Cart Modal */}
        <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
      </div>
    </header>
  );
}
   