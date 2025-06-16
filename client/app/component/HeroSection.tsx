import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="min-h-screen flex items-center bg-[#e6e2e0] pt-4 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-stretch">
          {/* Left side with text content */}
          <div className="w-full lg:w-5/12 flex items-center justify-center lg:justify-start">
            <div className="py-4 lg:py-16 w-full max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wider text-gray-900 text-center lg:text-left">
                SAARAA FLOWERS
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-gray-900 text-center lg:text-left">
                Elegant flowers for your special MOMENTS
              </p>
              {/* Button layout */}
              <div className="flex flex-col items-center lg:items-start w-full space-y-4">
                {/* Top row: two buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
                  <Link 
                    href="/category"
                    className="w-56 py-3 text-center bg-[#8B7355] text-white hover:bg-[#6F5B3E] transition-colors duration-300 rounded text-sm font-medium"
                  >
                    ORDER FLOWERS
                  </Link>
                  <Link 
                    href="/book-event"
                    className="w-56 py-3 text-center bg-[#8B7355] text-white hover:bg-[#6F5B3E] transition-colors duration-300 rounded text-sm font-medium"
                  >
                    BOOK AN EVENT
                  </Link>
                </div>
                {/* Bottom row: two buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
                  <Link 
                    href="/create-bouquet"
                    className="w-56 py-3 text-center bg-[#8B7355] text-white hover:bg-[#6F5B3E] transition-colors duration-300 rounded text-sm font-medium"
                  >
                    CREATE YOUR OWN BOUQUET
                  </Link>
                  <Link 
                    href="/budget-calculator"
                    className="w-56 py-3 text-center bg-[#BE5B50] text-white hover:bg-[#A64B41] transition-colors duration-300 rounded text-sm font-medium"
                  >
                    BUDGET CALCULATOR
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Right side with images */}
          <div className="w-full mb-8 lg:mb-0 lg:w-7/12 flex justify-center items-center">
            <div className="hidden lg:grid grid-cols-3 grid-rows-3 gap-2 w-full h-[500px] max-w-3xl">
              {/* Large vertical image (left) */}
              <div className="row-span-3 col-span-1">
                <img
                  src="/images/IMG_8492.jpg"
                  alt="Main bouquet"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {/* Top right images */}
              <div className="col-span-1 row-span-1">
                <img
                  src="/images/IMG_8497.jpg"
                  alt="Bouquet 1"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="col-span-1 row-span-1">
                <img
                  src="/images/IMG_8496.jpg"
                  alt="Bouquet 2"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {/* Middle right images */}
              <div className="col-span-1 row-span-1">
                <img
                  src="/images/IMG_8494.jpg"
                  alt="Bouquet 3"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="col-span-1 row-span-1">
                <img
                  src="/images/IMG_8493.jpg"
                  alt="Bouquet 4"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {/* Bottom right image */}
              <div className="col-span-2 row-span-1">
                <img
                  src="/images/IMG_8495.jpg"
                  alt="Bouquet 5"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            {/* Show a single main image on mobile/tablet */}
            <div className="lg:hidden w-full max-w-md flex justify-center">
              <img
                src="/images/IMG_8492.jpg"
                alt="Main bouquet"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
