type Props = { params: { code: string } };

export default function MarketProductsPage({ params }: Props) {
  const code = params.code.toUpperCase();
  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-semibold">Products - {code}</h1>
      <p className="opacity-80 mt-2">Placeholder products list for {code} market.</p>
    </main>
  );
}


