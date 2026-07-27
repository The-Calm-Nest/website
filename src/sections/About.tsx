export function About() {
  return (
    <section
      id="about"
      className="border-b border-[#d9d0be] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1040px]">
        {/* Small label */}
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8b7653]">
          Om oss
        </p>

        {/* Medium heading */}
        <h2 className="mt-7 max-w-3xl font-serif text-4xl leading-tight text-[#332b22] md:text-5xl">
          Fra starter til ditt bord — på tre dager
        </h2>

        {/* Large bread image */}
        <div className="relative mt-12">
          <img
            src="/images/bakery-about.jpg"
            alt="Surdeigsbrød bakt hos The Calm Nest"
            className="aspect-[16/9] w-full object-cover"
          />

          <span className="absolute left-5 top-5 bg-[#faf8f3] px-5 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#77776e]">
            Bakt her
          </span>
        </div>

        {/* Three paragraphs */}
        <div className="mt-12 max-w-4xl space-y-6 text-base leading-8 text-[#6f7068]">
          <p>
            The Calm Nest startet med en surdeigsstarter, en hønsflokk og en
            overbevisning om at ekte mat tar tid. Fra vår gård i Nannestad
            baker vi én gang i uken — og kun én gang — fordi godt brød ikke
            kan skyndes.
          </p>

          <p>
            Hvert brød begynner tre dager før det er hos deg: mating av
            starteren, lang kaldheving og steking fredag morgen. Vi bruker
            økologisk mel, ingen tilsetningsstoffer og råvarer vi stoler på.
          </p>

          <p>
            Ved siden av brødet legger hønsene våre egg året rundt, og i
            gårdsbutikken har vi et lite utvalg hjemmelagde varer — laget på
            samme ærlige måte.
          </p>
        </div>
      </div>
    </section>
  );
}