import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/db';
import { resolveMarketFeatures } from '@/lib/resolveFeatures';
import MarketModel from '@/models/Market';

import type { NextRequest } from 'next/server';

type Params = { params: Promise<{ code: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
	const { code } = await params;
	
	await connectToDatabase();
	const market = await MarketModel.findOne({ code: code.toUpperCase() });
	
	if (!market) {
		return NextResponse.json({ error: 'Market not found' }, { status: 404 });
	}
	
	const features = await resolveMarketFeatures(market);
	return NextResponse.json({ 
		market: { code: market.code, name: market.name }, 
		features 
	});
}