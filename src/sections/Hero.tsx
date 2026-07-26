export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-end overflow-hidden"
    >
      <img
        src="/images/hero-bread.jpg"
        alt="Freshly baked sourdough bread"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 text-white md:px-10 md:pb-20">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em]">
          Nannestad · Surdeigshus
        </p>

        <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] md:text-8xl">
          Godt brød
          <br />
          tar tre dager.
        </h1>

        <p className="mt-7 max-w-xl text-base leading-7 text-white/90 md:text-lg">
          Et lite hjemmebakeri som åpner én gang i uken. Langtidshevet
          surdeig, økologiske råvarer, bakt med omhu.
        </p>

        <a
          href="#menu"
          className="mt-8 inline-flex border-b border-white pb-2 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          Se ukens meny
        </a>
      </div>
    </section>
  );
}