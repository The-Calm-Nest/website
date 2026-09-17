const base = import.meta.env.BASE_URL;

const products = [
  {
    name: "Rørt sommerhonning og rørt høsthonning",
    price: "125 g · 65 kr | 450 g · 160 kr | 1000 g · 300 kr",
    text:
      "Fra våre egne bier. Rørt til en myk, kremet konsistens, med smak og duft fra blomstringen rundt gården.",
  },
  {
    name: "Friske frittgående egg",
    price: "180 kr per brett",
    text:
      "Fra våre egne høner, samlet daglig. Spør om tilgjengelighet denne uken.",
  },
  {
    name: "Ekte tørket surdeig",
    price: "30 g · 139 kr",
    text:
      "Laget med økologisk hvetemel. Gir ca. 300 g aktiv surdeigsstarter.",
  },
  {
    name: "Surdeigspannekakemiks",
    price: "300 g · 89 kr",
    text:
      "En ferdig blanding med økologisk mel og ekte tørket surdeig. Tilsett bare melk, egg og smør – og nyt luftige, smakfulle pannekaker til frokost eller helgekos.",
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

              <strong>{product.price}</strong>
            </article>
          ))}
        </div>

        <div className="photo-grid">
          <img src={`${base}images/100.jpg`} alt="Friske egg fra gården" />
          <img src={`${base}images/90.jpg`} alt="Rørt honning fra gården" />
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
