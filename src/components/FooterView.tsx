type FooterData = {
  links?: { label?: string; url?: string }[];
  social?: { platform?: string; url?: string }[];
  contact?: { email?: string; phone?: string; address?: string };
};

import Link from 'next/link';

export default function FooterView({ data }: Readonly<{ data: FooterData | null }>) {
  if (!data) return null;
  return (
    <footer className="w-full mt-12 text-sm">
      <div className="rounded-t-2xl border border-black/[.08] dark:border-white/[.145] bg-gradient-to-b from-[#fafafa] to-white dark:from-[#0e0e10] dark:to-[#0b0b0d]">
        <div className="max-w-5xl mx-auto px-5 py-8 grid gap-8 sm:grid-cols-3">
          <div>
            <div className="text-base font-semibold mb-3">Links</div>
            <ul className="space-y-2">
              {(data.links ?? []).map((l, idx) => (
                <li key={`${l.label}-${idx}`}>
                  <a
                    href={l.url ?? '#'}
                    className="inline-flex items-center gap-2 opacity-90 hover:opacity-100 hover:underline"
                  >
                    <span>↗</span>
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-base font-semibold mb-3">Social</div>
            <div className="flex flex-wrap gap-2">
              {(data.social ?? []).map((s, idx) => (
                <a
                  key={`${s.platform}-${idx}`}
                  href={s.url ?? '#'}
                  className="px-3 py-1 rounded-full border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors"
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-base font-semibold mb-3">Contact</div>
            <ul className="space-y-2 opacity-90">
              {data.contact?.email && (
                <li>📧 {data.contact.email}</li>
              )}
              {data.contact?.phone && (
                <li>📞 {data.contact.phone}</li>
              )}
              {data.contact?.address && (
                <li>📍 {data.contact.address}</li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-black/[.08] dark:border-white/[.145] flex justify-between items-center px-5 py-4">
          <Link href="/markets" className="hover:underline">Browse Markets</Link>
          <span>© {new Date().getFullYear()} Multi Market</span>
        </div>
      </div>
    </footer>
  );
}


