import Image from 'next/image';

type HeaderMenuItem = { label?: string; url?: string } | string;
type HeaderData = {
  logo?: string;
  menuItems?: HeaderMenuItem[];
};

export default function HeaderView({ data, marketCode }: Readonly<{ data: HeaderData | null; marketCode?: string }>) {
  if (!data) return null;
  return (
    <header className="w-full flex items-center justify-between border-b border-black/[.08] dark:border-white/[.145] py-4">
      <div className="text-2xl">
        {data.logo?.endsWith('.webp') || data.logo?.startsWith('/flags') ? (
          <Image src={data.logo} alt="Logo" width={36} height={24} />
        ) : (
          <span>{data.logo ?? 'Logo'}</span>
        )}
      </div>
      <nav className="flex gap-4 text-sm">
        {(data.menuItems ?? []).map((item, idx) => {
          const obj = typeof item === 'string' ? { label: item, url: `/${item.toLowerCase().replace(/\s+/g, '')}` } : item;
          const href = marketCode ? `/markets/${marketCode.toLowerCase()}${obj.url ?? ''}` : (obj.url ?? '#');
          return (
            <a key={`${obj.label}-${idx}`} href={href} className="opacity-90 hover:underline">
              {obj.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}


