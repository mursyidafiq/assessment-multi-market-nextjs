import Image from 'next/image';

type Step = {
  icon?: string;
  title?: string;
  description?: string;
  video?: string;
};

type HowItWorksData = {
  steps?: Step[];
};

export default function HowItWorksView({ data }: Readonly<{ data: HowItWorksData | null }>) {
  if (!data) return null;
  const steps = data.steps ?? [];
  if (steps.length === 0) return null;

  return (
    <section className="w-full mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold">How It Works</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">A quick 3-step guide to get you started.</p>
      </div>

      <ol className="grid gap-6 sm:grid-cols-3">
        {steps.map((s, idx) => (
          <li
            key={`${s.title ?? idx}-${idx}`}
            className="p-5 rounded-xl border border-black/[.06] dark:border-white/[.06] bg-white shadow-sm dark:bg-white/5"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-white/5 flex items-center justify-center">
                  {s.icon && typeof s.icon === 'string' && (s.icon.startsWith('/') || /\.(svg|png|jpe?g|webp)$/i.test(s.icon)) ? (
                    <Image src={s.icon} alt={s.title ?? 'icon'} width={40} height={40} className="rounded" />
                  ) : (
                    <span className="text-2xl">{s.icon}</span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <div className="text-sm text-gray-500">Step {idx + 1}</div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{s.description}</p>

                {s.video && (
                  <div className="mt-4">
                    <video
                      src={s.video}
                      controls
                      className="w-full rounded-md border border-black/[.04] dark:border-white/[.06]"
                      aria-label={`${s.title} video`}
                    />
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}


