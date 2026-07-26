export function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">
            Om oss
          </p>

          <h2 className="mt-5 max-w-xl font-serif text-5xl leading-tight md:text-7xl">
            Fra starter til ditt bord — på tre dager
          </h2>
        </div>

        <div className="space-y-6 self-end text-base leading-8 text-black/70">
          <p>
            The Calm Nest startet med en surdeigsstarter, en hønsflokk og
            en overbevisning om at ekte mat tar tid.
          </p>

          <p>
            Fra vår gård i Nannestad baker vi én gang i uken, fordi godt
            brød ikke kan skyndes.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl">
        <img
          src="/images/bakery-about.jpg"
          alt="Bread being prepared at the bakery"
          className="aspect-[16/8] w-full object-cover"
        />
      </div>
    </section>
  );
}