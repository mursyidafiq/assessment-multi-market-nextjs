import GlitchText from '@/components/GlitchText';
import { getBaseUrl } from '@/lib/baseUrl';

async function fetchMarkets() {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/markets`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to load markets');
  return res.json();
}

export default async function MarketsPage() {
  const data = await fetchMarkets();
  const markets: { code: string; name: string }[] = data.markets ?? [];
  return (
    <main className="max-w-4xl mx-auto py-8">
      <GlitchText
        speed={1}
        enableShadows={true}
        enableOnHover={false}
        className='custom-class'
      >
        Markets
      </GlitchText>
      <ul className="grid sm:grid-cols-3 gap-3">
        {markets.map((m) => (
          <li key={m.code} className="border rounded-md p-4 border-black/[.08] dark:border-white/[.145]">
            <div className="font-semibold mb-1">{m.name}</div>
            <a
              href={`/markets/${m.code}`}
              className="text-sm underline"
            >
              View
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <a
          href="/docs"
          className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
        >
          API Docs
        </a>
      </div>
    </main>
  );
}


