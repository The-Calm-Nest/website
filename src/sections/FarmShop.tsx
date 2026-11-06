import { useEffect, useState } from "react";

const base = import.meta.env.BASE_URL;

type PriceOption = { quantity: string; price: number };
type FarmProduct = {
  id: string;
  name: string;
  description?: string;
  priceOptions?: PriceOption[];
  priceText?: string;
  order: number;
};
type FarmShopResponse = { items: FarmProduct[] };

function displayPrice(product: FarmProduct): string {
  const options = (product.priceOptions ?? [])
    .filter((option) => option.quantity && Number.isFinite(option.price))
    .map((option) => `${option.quantity} · ${option.price} kr`);
  return options.length > 0 ? options.join(" | ") : (product.priceText ?? "");
}

export function FarmShop() {
  const [products, setProducts] = useState<FarmProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/farm-shop", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Farm shop API returned ${response.status}`);
        const data = (await response.json()) as FarmShopResponse;
        if (!Array.isArray(data.items)) throw new Error("Invalid farm shop response");
        setProducts(data.items);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Could not load farm shop:", err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  return (
    <section className="section farm-shop">
      <div className="content">
        <p className="eyebrow">GÅRDSVARER</p>
        <h2>Fra gårdsbutikken</h2>
        <p className="section-intro">Et lite utvalg hjemmelagde varer.</p>

        {loading ? (
          <p>Laster gårdsvarer...</p>
        ) : error ? (
          <p>Gårdsvarene er midlertidig utilgjengelige. Ta kontakt for dagens utvalg.</p>
        ) : products.length === 0 ? (
          <p>Ingen gårdsvarer er tilgjengelige akkurat nå. Ta gjerne kontakt.</p>
        ) : (
          <div className="farm-products">
            {products.map((product) => (
              <article key={product.id}>
                <div>
                  <h3>{product.name}</h3>
                  {product.description && <p>{product.description}</p>}
                </div>
                {displayPrice(product) && <strong>{displayPrice(product)}</strong>}
              </article>
            ))}
          </div>
        )}

        <div className="photo-grid">
          <img src={`${base}images/100.jpg`} alt="Friske egg fra gården" />
          <img src={`${base}images/90.jpg`} alt="Rørt honning fra gården" />
          <img className="photo-grid-wide" src={`${base}images/60.jpg`} alt="Nybakt surdeigsbrød" />
        </div>
      </div>
    </section>
  );
}
