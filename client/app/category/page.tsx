'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
	{
		title: 'FLOWER BOUQUETS',
		description:
			'Custom-designed bouquets featuring fresh seasonal flowers for any occasion.',
		image: '/images/IMG_8492.jpg',
		link: '/category/flower-bouquets',
	},
	{
		title: 'VASE ARRANGEMENTS',
		description:
			'Elegant vase arrangements perfect for home decor or special events.',
		image: '/images/IMG_8496.jpg',
		link: '/category/vase-arrangements',
	},
	{
		title: 'FLOWERS FOR EVENTS',
		description:
			'Stunning floral designs for weddings, corporate events, and special occasions.',
		image: '/images/IMG_8494.jpg',
		link: '/category/flowers-for-events',
	},
	{
		title: 'FLORAL SUBSCRIPTION',
		description:
			'Regular flower deliveries to brighten your home or office.',
		image: '/images/IMG_8495.jpg',
		link: '/category/floral-subscription',
	},
	{
		title: 'BOX ARRANGEMENTS',
		description:
			'Beautiful blooms artfully arranged in luxury gift boxes.',
		image: '/images/IMG_8493.jpg',
		link: '/category/box-arrangements',
	},
	{
		title: 'BRIDAL BOUQUETS',
		description:
			'Exquisite bridal bouquets and wedding flower arrangements.',
		image: '/images/IMG_8497.jpg',
		link: '/category/bridal-bouquets',
	},
];

export default function CategoryPage() {
	return (
		<div className="min-h-screen bg-[#e6e2e0] py-16 px-4 sm:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-[1400px] mx-auto"
			>
				<h1 className="text-5xl md:text-6xl font-bold text-center mb-20">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4A4A4A] to-[#8B7355]">
						FLORAL COLLECTIONS
					</span>
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{categories.map((category, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="group relative"
						>
							<div className="relative overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-sm hover:shadow-[0_0_40px_rgba(139,115,85,0.15)] transition-all duration-500 before:absolute before:inset-0 before:bg-white/10 before:rounded-[2rem] before:translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-500">
								<div className="relative h-[420px]">
									<Image
										src={category.image}
										alt={category.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										priority={index < 2}
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
								</div>

								<div className="absolute inset-0 p-8 flex flex-col justify-end">
									<div className="relative z-10 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
										<span className="inline-block text-[#8B7355] bg-white/90 px-3 py-1 rounded-full text-sm font-medium mb-4">
											Collection {index + 1}
										</span>

										<h2 className="text-2xl font-bold text-white mb-3">
											{category.title}
										</h2>

										<p className="text-white/80 text-sm mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
											{category.description}
										</p>

										<Link
											href={category.link}
											className="inline-flex items-center gap-2 text-white relative overflow-hidden group/btn px-6 py-2 rounded-full bg-[#8B7355]/80 hover:bg-[#8B7355] transition-colors duration-300"
										>
											<span className="relative z-10">Explore Collection</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</Link>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Contact Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className="mt-32 text-center"
				>
					<div className="inline-flex items-center gap-8 bg-white/10 backdrop-blur-md rounded-full py-4 px-8">
						<span className="text-[#4A4A4A] font-medium">GET IN TOUCH</span>
						<div className="h-5 w-px bg-[#8B7355]/30" />
						<div className="flex items-center gap-8">
							<a
								href="tel:+971586378051"
								className="text-[#8B7355] hover:text-[#6F5B3E] transition-colors"
							>
								+971586378051
							</a>
							<div className="h-5 w-px bg-[#8B7355]/30" />
							<a
								href="https://www.saaraflowers.ae"
								className="text-[#8B7355] hover:text-[#6F5B3E] transition-colors"
							>
								WWW.SAARAFLOWERS.AE
							</a>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}
