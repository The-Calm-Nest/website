const base = import.meta.env.BASE_URL;

const products = [
  {
    name: "Rørt sommerhonning",
    price: "450 g · 160 kr | 1 kg · 300 kr",
    text:
      "Fra våre egne bier. Rørt til en myk, kremet konsistens, med smak og duft av sommerens blomster rundt gården.",
  },
  {
    name: "Friske frittgående egg",
    price: "180 kr per brett",
    text:
      "Fra våre egne høner, samlet daglig. Spør om tilgjengelighet denne uken.",
  },
  {
    name: "Tørket surdeigsstarter",
    text:
      "Vår aktive starter, tørket og klar til å vekkes hjemme. Inkluderer veiledning.",
  },
  {
    name: "Surdeigspannekakemix",
    text:
      "Ferdig blandet med tørket starter. Bare tilsett melk, egg og smør.",
  },
];

export function FarmShop() {
  return (
    <section className="section farm-shop">
      <div className="content">
        <p className="eyebrow">GÅRDSVARER</p>
        <h2>Fra gårdsbutikken</h2>
        <p className="section-intro">Et lite utvalg hjemmelagde varer.</p>

        <div className="farm-products">
          {products.map((product) => (
            <article key={product.name}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.text}</p>
              </div>

              {product.price && <strong>{product.price}</strong>}
            </article>
          ))}
        </div>

        <div className="photo-grid">
          <img src={`${base}images/40.jpg`} alt="Ferske egg fra gården" />
          <img src={`${base}images/50.jpg`} alt="Surdeigsbrød med frø" />
          <img
            className="photo-grid-wide"
            src={`${base}images/60.jpg`}
            alt="Nybakt surdeigsbrød"
          />
        </div>
      </div>
    </section>
  );
}