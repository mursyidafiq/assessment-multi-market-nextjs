import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/db';
import MarketModel from '@/models/Market';

export async function GET() {
	await connectToDatabase();
	const markets = await MarketModel.find({}, { code: 1, name: 1, _id: 0 }).lean();
	return NextResponse.json({ markets });
}


export async function POST(req: Request) {
	await connectToDatabase();
	const body = await req.json().catch(() => null);
	if (!body) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });

	const { code, name, headerFrom, footerFrom, bannerFrom, howItWorksFrom } = body;
	if (!code || !name) return NextResponse.json({ error: 'code and name are required' }, { status: 400 });

	type NormalizedMarket = {
		code: string;
		name: string;
		headerFrom?: string;
		footerFrom?: string;
		bannerFrom?: string;
		howItWorksFrom?: string;
	};
	const normalized: NormalizedMarket = { code: String(code).toUpperCase(), name: String(name) };
	if (headerFrom) normalized.headerFrom = String(headerFrom).toUpperCase();
	if (footerFrom) normalized.footerFrom = String(footerFrom).toUpperCase();
	if (bannerFrom) normalized.bannerFrom = String(bannerFrom).toUpperCase();
	if (howItWorksFrom) normalized.howItWorksFrom = String(howItWorksFrom).toUpperCase();


	const res = await MarketModel.findOneAndUpdate({ code: normalized.code }, { $set: normalized }, { upsert: true, new: true }).lean();
	return NextResponse.json({ market: res });
}


export async function PATCH(req: Request) {
	await connectToDatabase();
	const body = await req.json().catch(() => null);
	if (!body) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });

	const { code } = body;
	if (!code) return NextResponse.json({ error: 'code is required' }, { status: 400 });
	const normCode = String(code).toUpperCase();

	const allowed: Partial<{
		name: string;
		headerFrom: string;
		footerFrom: string;
		bannerFrom: string;
		howItWorksFrom: string;
	}> = {};
	if (body.name) allowed.name = String(body.name);
	if (body.headerFrom) allowed.headerFrom = String(body.headerFrom).toUpperCase();
	if (body.footerFrom) allowed.footerFrom = String(body.footerFrom).toUpperCase();
	if (body.bannerFrom) allowed.bannerFrom = String(body.bannerFrom).toUpperCase();
	if (body.howItWorksFrom) allowed.howItWorksFrom = String(body.howItWorksFrom).toUpperCase();

	if (Object.keys(allowed).length === 0) return NextResponse.json({ error: 'No updatable fields' }, { status: 400 });

	const updated = await MarketModel.findOneAndUpdate({ code: normCode }, { $set: allowed }, { new: true }).lean();
	if (!updated) return NextResponse.json({ error: 'Market not found' }, { status: 404 });
	return NextResponse.json({ market: updated });
}


