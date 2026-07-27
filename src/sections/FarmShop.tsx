const products = [
  {
    name: "Friske frittgående egg",
    description:
      "Fra våre egne høner, samlet daglig. Spør om tilgjengelighet.",
  },
  {
    name: "Tørket surdeigsstarter",
    description:
      "Vår aktive starter, tørket og klar til å vekke hjemme. Inkluderer veiledning.",
  },
  {
    name: "Surdeig pannekakemix",
    description:
      "Ferdig blandet med tørket starter. Bare tilsett vann, egg og smør.",
  },
  {
    name: "Fullkornsblandinger",
    description:
      "Sesongbasert. Spør hva som er tilgjengelig denne uken.",
  },
];

export function FarmShop() {
  return (
    <section
      id="farm-shop"
      className="border-t border-[#d9d0be] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1040px]">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8b7653]">
          Alltid tilgjengelig
        </p>

        <h2 className="mt-6 font-serif text-4xl text-[#332b22] md:text-5xl">
          Fra gårdsbutikken
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-8 text-[#6f7068]">
          Et lite utvalg hjemmelagde varer — bestilles ved siden av
          brødbestillingen din.
        </p>

        <div className="mt-12 border border-[#d9d0be]">
          {products.map((product, index) => (
            <article
              key={product.name}
              className={`px-7 py-8 md:px-10 ${
                index < products.length - 1
                  ? "border-b border-[#e2dacb]"
                  : ""
              }`}
            >
              <h3 className="font-serif text-2xl text-[#332b22]">
                {product.name}
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#77776e]">
                {product.description}
              </p>
            </article>
          ))}
        </div>

        <a
          href="#ordering"
          className="mt-10 inline-flex border border-[#8b7653] px-7 py-4 text-xs uppercase tracking-[0.18em] text-[#6f5938]"
        >
          Bestill gårdsbutikkvarer
        </a>
      </div>
    </section>
  );
}