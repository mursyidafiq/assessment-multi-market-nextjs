import BannerView from '@/components/BannerView';
import FooterView from '@/components/FooterView';
import HeaderView from '@/components/HeaderView';
import HowItWorksView from '@/components/HowItWorksView';
import { getBaseUrl } from '@/lib/baseUrl';

type Props = { params: { code: string } };

async function fetchMarket(code: string) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/markets/${code}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to load market');
  return res.json();
}

export default async function MarketPage({ params }: Readonly<Props>) {
  const { market, features } = await fetchMarket(params.code);
  return (
    <main className="max-w-4xl mx-auto py-8 w-full">
      <div className="mb-4 text-2xl font-semibold">{market.name} ({market.code})</div>
      <HeaderView data={features.header} marketCode={market.code} />
      <BannerView data={features.banner} />
      <HowItWorksView data={features.howItWorks} />
      <FooterView data={features.footer} />
    </main>
  );
}


