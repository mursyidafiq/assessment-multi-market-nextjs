import Banner from '@/models/Banner';
import Footer from '@/models/Footer';
import Header from '@/models/Header';
import HowItWorks from '@/models/HowItWorks';

import type { Market } from '@/models/Market';

type ResolvedFeatures = {
	header: Record<string, unknown> | null;
	footer: Record<string, unknown> | null;
	banner: Record<string, unknown> | null;
	howItWorks: Record<string, unknown> | null;
};

function shallowMerge<T extends Record<string, unknown>>(base: T | null, override: T | null): T | null {
	if (!base && !override) return null;
	if (!base) return override as T;
	if (!override) return base as T;
	const result: Record<string, unknown> = { ...base, ...override };

	for (const key of Object.keys(base)) {
		const baseVal = (base as Record<string, unknown>)[key];
		const overVal = (override as Record<string, unknown>)[key];

		if (Array.isArray(baseVal)) {
			if (Array.isArray(overVal)) {

				const baseFirst = baseVal[0];
				const overFirst = overVal[0];
				if (
					baseFirst && overFirst &&
					typeof baseFirst === 'object' && typeof overFirst === 'object' &&
					'title' in (baseFirst as Record<string, unknown>)
				) {

					const map = new Map<string, Record<string, unknown>>();
					for (const item of baseVal as Record<string, unknown>[]) {
						const t = (item as Record<string, unknown>).title as string;
						map.set(t, { ...(item as Record<string, unknown>) });
					}
					for (const item of overVal as Record<string, unknown>[]) {
						const t = (item as Record<string, unknown>).title as string;
						if (map.has(t)) {
							map.set(t, { ...map.get(t)!, ...(item as Record<string, unknown>) });
						} else {
							map.set(t, { ...(item as Record<string, unknown>) });
						}
					}
					result[key] = Array.from(map.values());
				} else {

					result[key] = overVal as unknown[];
				}
			} else {
				result[key] = baseVal as unknown[];
			}
			continue;
		}


		if (
			baseVal && typeof baseVal === 'object' && !Array.isArray(baseVal) &&
			overVal && typeof overVal === 'object' && !Array.isArray(overVal)
		) {
			result[key] = { ...(base as Record<string, unknown>)[key] as object, ...(override as Record<string, unknown>)[key] as object };
		}
	}
	return result as T;
}

async function resolveByMarket<T extends { market: string; baseOf?: string }>(
	Model: { findOne: (query: Record<string, unknown>) => { lean: () => Promise<T | null> } },
	marketCode: string,
	baseFrom?: string
): Promise<T | null> {
    const own: T | null = await Model.findOne({ market: marketCode }).lean();

    if (baseFrom && baseFrom !== marketCode) {
        const base: T | null = await Model.findOne({ market: baseFrom }).lean();
        if (own || base) return shallowMerge(base, own);
    }

    if (own) {
				if (own.baseOf) {
					const base: T | null = await Model.findOne({ market: own.baseOf }).lean();
					return shallowMerge(base, own);
				}
        return own;
    }

    if (baseFrom) {
        const base: T | null = await Model.findOne({ market: baseFrom }).lean();
        if (base) return base;
    }
    return null;
}

export async function resolveMarketFeatures(market: Market): Promise<ResolvedFeatures> {
	const resolvePromises = [
		resolveByMarket(Header, market.code, market.headerFrom ?? undefined),
		resolveByMarket(Footer, market.code, market.footerFrom ?? undefined),
		resolveByMarket(Banner, market.code, market.bannerFrom ?? undefined),
		resolveByMarket(HowItWorks, market.code, market.howItWorksFrom ?? undefined),
	];
	const [header, footer, banner, howItWorks] = await Promise.all(resolvePromises);
	return { header, footer, banner, howItWorks };
}


