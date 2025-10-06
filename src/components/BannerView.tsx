import Image from 'next/image';

type BannerData = {
  image?: string;
  video?: string;
  headline?: string;
  button?: { label?: string; url?: string };
};

export default function BannerView({ data }: Readonly<{ data: BannerData | null; marketCode?: string }>) {
  if (!data) return null;
  return (
    <section className="w-full mt-6 p-8 rounded-xl border border-black/[.08] dark:border-white/[.145] bg-gradient-to-br from-[#f9fafb] to-[#eef2ff] dark:from-[#0f0f10] dark:to-[#10131a]">
      <div className="text-3xl font-semibold mb-2">{data.headline}</div>
      {data.image && (
        <div className="mb-3">
          {data.image.endsWith('.webp') || data.image.startsWith('/media') ? (
            <Image src={data.image} alt="Banner" width={900} height={240} className="rounded-md border border-black/[.08] dark:border-white/[.145]" />
          ) : (
            <div className="text-sm opacity-80">Image: {data.image}</div>
          )}
        </div>
      )}
      {data.button && (
        <div className="mt-6 flex justify-center">
          <a
            href={data.button.url}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-0.5"
          >
            {data.button.label}
          </a>
        </div>
      )}
      {data.video && <div className="text-sm opacity-80 mb-2">Video: {data.video}</div>}
    </section>
  );
}


