import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#e6e2e0] border-t border-gray-200 pt-8 pb-4 text-[#171717] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo and tagline */}
          <div className="md:w-1/4 flex flex-col items-center md:items-start mb-6 md:mb-0">
            <Image src="/logo.png" alt="Logo" width={140} height={80} className="mb-2" />
            <div className="text-2xl font-medium text-[#8B7355] mt-2 mb-2 text-center md:text-left">
              Art with a floral<br />essence.
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#171717]">Follow us:</span>
              <a href="#" className="bg-gray-100 hover:bg-[#8B7355] hover:text-white p-2 rounded transition-colors" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="bg-gray-100 hover:bg-[#8B7355] hover:text-white p-2 rounded transition-colors" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="bg-gray-100 hover:bg-[#8B7355] hover:text-white p-2 rounded transition-colors" aria-label="Whatsapp"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Contact */}
          <div className="md:w-1/4 mb-6 md:mb-0">
            <div className="font-semibold text-lg mb-2 border-b-2 border-[#8B7355] inline-block pb-1">Contact</div>
            <div className="mt-2">
              <div className="mb-1">+971 558 995 257</div>
              <div className="mb-1">contact@saaraaflowers.com</div>
              <div className="mb-1">SAARAA FLOWERS TRADING L.L.C</div>
              <div className="mb-1">TRN: 104501376800003</div>
              <div>Licence No.: 1319836</div>
            </div>
          </div>

          {/* Categories */}
          <div className="md:w-1/5 mb-6 md:mb-0">
            <div className="font-semibold text-lg mb-2 border-b-2 border-[#8B7355] inline-block pb-1">Categories</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-[#8B7355]">Collection</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Flower bouquets</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Floral arrangements</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Gifts</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Occasions</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Monthly Floral Subscription</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Bouquet configuration / arrangement</a></li>
            </ul>
          </div>

          {/* Useful links */}
          <div className="md:w-1/5 mb-6 md:mb-0">
            <div className="font-semibold text-lg mb-2 border-b-2 border-[#8B7355] inline-block pb-1">Useful links</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-[#8B7355]">Our story</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Blog</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Contact</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">How to order</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Payment methods</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Flowers Delivery in Dubai</a></li>
            </ul>
          </div>

          {/* Info */}
          <div className="md:w-1/5">
            <div className="font-semibold text-lg mb-2 border-b-2 border-[#8B7355] inline-block pb-1">Info</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-[#8B7355]">Terms and conditions</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Privacy policy</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Return policy</a></li>
              <li><a href="#" className="hover:text-[#8B7355]">Cookie policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
