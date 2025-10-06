import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/db';
import Banner from '@/models/Banner';
import Footer from '@/models/Footer';
import Header from '@/models/Header';
import HowItWorks from '@/models/HowItWorks';
import Market from '@/models/Market';

export async function POST() {
	await connectToDatabase();

	await Promise.all([
		Market.deleteMany({}),
		Header.deleteMany({}),
		Footer.deleteMany({}),
		Banner.deleteMany({}),
		HowItWorks.deleteMany({}),
	]);

	await Market.create([
		{ code: 'MY', name: 'Malaysia', bannerFrom: 'MY', howItWorksFrom: 'MY' },
		{ code: 'SG', name: 'Singapore', headerFrom: 'MY', bannerFrom: 'SG', howItWorksFrom: 'MY' },
		{ code: 'AU', name: 'Australia', footerFrom: 'SG', bannerFrom: 'AU', howItWorksFrom: 'MY' },
	]);

	await Header.bulkWrite([
		{
			updateOne: {
				filter: { market: 'MY' },
				update: {
					$set: {
						market: 'MY',
						logo: '/flags/my.svg',
						menuItems: [
							{ label: 'Home', url: '/' },
							{ label: 'Products', url: '/products' },
							{ label: 'Contact', url: '/contact' },
						],
					},
				},
				upsert: true,
			},
		},
		{
			updateOne: {
				filter: { market: 'SG' },
				update: {
					$set: {
						market: 'SG',
						baseOf: 'MY',
						logo: '/flags/sg.svg',
						menuItems: [
							{ label: 'Home', url: '/' },
							{ label: 'Products', url: '/products' },
							{ label: 'Contact', url: '/contact' },
						],
					},
				},
				upsert: true,
			},
		},
		{
			updateOne: {
				filter: { market: 'AU' },
				update: {
					$set: {
						market: 'AU',
						logo: '/flags/au.svg',
						menuItems: [
							{ label: 'Home', url: '/' },
							{ label: 'Catalogue', url: '/products' },
							{ label: 'Support', url: '/contact' },
						],
					},
				},
				upsert: true,
			},
		},
	]);

	await Footer.create([
		{
			market: 'MY',
			links: [
				{ label: 'About', url: '/about' },
				{ label: 'Careers', url: '/careers' },
				{ label: 'Privacy', url: '/privacy' },
			],
			social: [
				{ platform: 'Facebook', url: 'https://facebook.com/multi-market-my' },
				{ platform: 'Instagram', url: 'https://instagram.com/multi-market-my' },
			],
			contact: { email: 'hello@my.example.com' },
		},
		{
			market: 'SG',
			links: [
				{ label: 'About', url: '/about' },
				{ label: 'Careers', url: '/careers' },
				{ label: 'Privacy', url: '/privacy' },
			],
			social: [
				{ platform: 'Facebook', url: 'https://facebook.com/multi-market-sg' },
				{ platform: 'Instagram', url: 'https://instagram.com/multi-market-sg' },
			],
			contact: { email: 'hello@sg.example.com' },
		},
		{
			market: 'AU',
			baseOf: 'SG',
			links: [
				{ label: 'About', url: '/about' },
				{ label: 'Careers', url: '/careers' },
				{ label: 'Privacy', url: '/privacy' },
				{ label: 'Made in Australia', url: '/made-in-australia' },
			],
			social: [
				{ platform: 'Facebook', url: 'https://facebook.com/multi-market-sg' },
				{ platform: 'Instagram', url: 'https://instagram.com/multi-market-sg' },
			],
			contact: { email: 'hello@sg.example.com' },
		},
	]);

	await Banner.create([
		{
			market: 'MY',
			image: '/media/my-hero.webp',
			headline: 'Mega Sale - Shop Now',
			button: { label: 'Shop Now', url: '/markets/my/shop' },
		},
		{
			market: 'SG',
			baseOf: 'MY',
			button: { label: 'Buy Now', url: '/markets/sg/shop' },
		},
		{
			market: 'AU',
			image: '/media/au-hero.webp',
			headline: 'Local Deals in Australia',
		},
	]);

	await HowItWorks.create([
		{
			market: 'MY',
			steps: [
				{ icon: '/media/icons/sign-up.png', title: 'Sign Up', description: 'Create your account' },
				{ icon: '/media/icons/select-plan.png', title: 'Select Plan', description: 'Choose your plan' },
				{ icon: '/media/icons/get-started.png', title: 'Get Started', description: 'Enjoy the service' },
			],
		},
		{
			market: 'SG',
			baseOf: 'MY',
		},
		{
			market: 'AU',
			baseOf: 'MY',
			steps: [
				{ icon: '/media/icons/sign-up.png', title: 'Sign Up', description: 'Create your account' },
				{ icon: '/media/icons/select-plan.png', title: 'Select Plan', description: 'Choose your plan', video: '/media/uploads/au-select-plan.mp4' },
				{ icon: '/media/icons/get-started.png', title: 'Get Started', description: 'Enjoy the service' },
			],
		},
	]);

	return NextResponse.json({ ok: true });
}


