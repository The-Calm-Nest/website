export function RegularOrders() {
  return (
    <section className="border-t border-[#d9d0be] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1040px]">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8b7653]">
          Faste kunder
        </p>

        <h2 className="mt-6 font-serif text-4xl text-[#332b22] md:text-5xl">
          Fast ukentlig bestilling
        </h2>

        <p className="mt-6 max-w-3xl text-base leading-8 text-[#6f7068]">
          Ønsker du de samme varene reservert for deg automatisk hver uke —
          eller annenhver uke — uten å bestille på nytt?
        </p>

        <p className="mt-5 max-w-3xl text-base leading-8 text-[#6f7068]">
          Fortell oss hva du vil ha i din faste kurv, så holder vi den av til
          deg. Du kan pause eller endre bestillingen innen tirsdag.
        </p>

        <div className="mt-10 border border-[#cdbf9f] px-7 py-8 md:px-10 md:py-10">
          <h3 className="font-serif text-2xl text-[#332b22]">
            Fast bestilling
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#77776e]">
            Dine valgte varer reserveres automatisk hver fredag. Endre eller
            pause innen tirsdag.
          </p>

          <a
            href="#ordering"
            className="mt-8 inline-block text-xs uppercase tracking-[0.2em] text-[#8b7653]"
          >
            Sett opp fast bestilling
          </a>
        </div>
      </div>
    </section>
  );
}