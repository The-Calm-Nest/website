export function Hero() {
  return (
    <section id="home" className="px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
      <div className="mx-auto max-w-[1040px]">
        <div className="max-w-2xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#8b7653]">
            Nannestad · Surdeigshus
          </p>

          <h1 className="mt-7 font-serif text-6xl leading-[0.98] text-[#332b22] md:text-[5.5rem]">
            Godt brød
            <br />
            <em className="font-normal text-[#967548]">tar tre dager.</em>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#77776e]">
            Et lite hjemmebakeri som åpner én gang i uken.
            Langtidshevet surdeig, økologiske råvarer, bakt med omhu.
          </p>

          <a
            href="#menu"
            className="mt-12 inline-block text-xs uppercase tracking-[0.22em] text-[#77776e]"
          >
            Se ukens meny
          </a>
        </div>

        <div className="mt-16 border-t border-[#d9d0be] pt-7">
          <p className="text-xs uppercase tracking-[0.15em] text-[#b19a72]">
            Meny publiseres lørdag · Bestilling stenger tirsdag · Henting fredag
            15–18
          </p>
        </div>

        <img
          src={`${import.meta.env.BASE_URL}images/hero-bread.jpg`}
          alt="Landskap ved gården i Nannestad"
          className="mt-14 aspect-[16/8] w-full object-cover"
        />
      </div>
    </section>
  );
}