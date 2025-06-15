"use client";

import Image from "next/image";
import { FaShoppingCart, FaBell, FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { useState, useEffect } from "react";
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile();
    } else {
      setIsLoggedIn(false);
      setUserImage('');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:3001/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.profileImage) {
        setUserImage(data.profileImage);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    setUserImage('');
    router.push('/');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <header className="bg-[#e6e2e0] shadow-md text-gray-800 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-16 relative">
              {/* Replace '/logo.svg' with your logo path */}
              <Image src="/logo.svg" alt="Logo" layout="fill" objectFit="contain" />
            </div>
            <div className="flex flex-col leading-tight">
              
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6 text-[#FFAAAA]" />
            ) : (
              <HiMenu className="h-6 w-6 text-[#FFAAAA]" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block ml-auto mr-8">
            <ul className="flex space-x-12 text-base font-medium">
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
                <Link href="/categories" className="hover:text-[#8B7355] transition-colors duration-300">
                  FLORAL CATEGORIES
                </Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <div className="relative">
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
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowSignIn(true)}
                    className="px-4 py-2 bg-[#8B7355] text-white rounded-full hover:bg-[#6F5B3E] transition-colors duration-300 cursor=pointer"
                  >
                    SIGN IN
                  </button>
                )}
              </li>
            </ul>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F0EB] hover:bg-[#E8E0D8] transition-colors duration-300">
              <FaShoppingCart className="text-[#8B7355] text-xl" cursor="pointer" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F0EB] hover:bg-[#E8E0D8] transition-colors duration-300">
              <FaBell className="text-[#8B7355] text-xl" cursor="pointer" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 pb-4`}>
          <nav>
            <ul className="flex flex-col space-y-4 text-base font-medium">
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
                  href="/categories" 
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
          </nav>
          {/* Mobile Icons */}
          <div className="flex items-center space-x-4 mt-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F0EB] hover:bg-[#E8E0D8] transition-colors duration-300">
              <FaShoppingCart className="text-[#8B7355] text-xl" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F0EB] hover:bg-[#E8E0D8] transition-colors duration-300">
              <FaBell className="text-[#8B7355] text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Sign In/Up Modals */}
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
    </header>
  );
}
