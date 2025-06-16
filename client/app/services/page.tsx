'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const services = [
	{
		title: 'FLORAL ARRANGEMENTS OR MAKE YOUR OWN BOUQUET',
		description:
			'We design stunning floral arrangements for all occasions. Each bouquet is handcrafted with premium fresh flowers, tailored to your preferences and delivered with elegance.',
		image: '/images/IMG_8492.jpg',
		link: '/create',
	},
	{
		title: 'EVENT PLANING',
		description:
			'Our expert team offers all of floral arrangements for weddings, parties, corporate functions, and more with your dream floral theme.',
		image: '/images/IMG_8493.jpg',
		link: '/book',
	},
	{
		title: 'SAME DAY DELIVERY',
		description:
			'Forgot a special occasion or need flowers urgently? We\'ve got you covered. Our efficient same-day delivery service within Dubai ensures your flowers arrive fresh and on time, even for last-minute surprises.',
		image: '/images/IMG_8494.jpg',
		link: '/order',
	},
	{
		title: 'SUBSCRIPTION PLAN',
		description:
			'Brighten your home or workspace with our flower subscription service. Choose from weekly or monthly plans and receive beautifully arranged fresh blooms delivered regularly, with options to customize based on your style and needs.',
		image: '/images/IMG_8495.jpg',
		link: '/subscription',
	},
];

export default function Services() {
	return (
		<div className='min-h-screen bg-[#e6e2e0] py-16 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-4xl md:text-5xl font-bold text-center mb-16 text-[#4A4A4A]'
				>
					Our Services
				</motion.h1>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
					{services.map((service, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.2 }}
							className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
						>
							<div className='relative h-80 w-full'>
								<Image
									src={service.image}
									alt={service.title}
									fill
									className='object-cover transition-transform duration-300 group-hover:scale-110'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-80' />
							</div>

							<div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
								<h3 className='text-2xl font-semibold mb-3 tracking-wide'>
									{service.title}
								</h3>
								<p className='text-sm text-gray-200 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0'>
									{service.description}
								</p>
							</div>

							<div className='absolute top-4 right-4'>
								<span className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm'>
									<motion.svg
										whileHover={{ scale: 1.2 }}
										className='w-6 h-6 text-white'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 6v6m0 0v6m0-6h6m-6 0H6'
										/>
									</motion.svg>
								</span>
							</div>
						</motion.div>
					))}
				</div>

				{/* Contact Section with enhanced styling */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className='mt-20 text-center bg-white/30 backdrop-blur-sm rounded-xl p-8 shadow-lg'
				>
					<h2 className='text-2xl font-semibold mb-4 text-[#4A4A4A]'>
						Get in Touch
					</h2>
					<div className='space-y-2'>
						<a
							href='mailto:WWW.SAARAFLOWERS.AE'
							className='block text-lg text-[#4A4A4A] hover:text-[#8B7355] transition-colors duration-300'
						>
							WWW.SAARAFLOWERS.AE
						</a>
						<a
							href='tel:+971586378051'
							className='block text-lg text-[#4A4A4A] hover:text-[#8B7355] transition-colors duration-300'
						>
							+971586378051
						</a>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
