export function Ordering() {
  return (
    <section
      id="ordering"
      className="border-t border-[#d9d0be] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1040px]">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8b7653]">
          Kom i gang
        </p>

        <h2 className="mt-6 font-serif text-4xl text-[#332b22] md:text-5xl">
          Slik bestiller du
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <h3 className="font-serif text-2xl text-[#332b22]">
              Bestill innen tirsdag — henting fredag 15–18
            </h3>

            <p className="mt-5 text-base leading-8 text-[#6f7068]">
              Bla gjennom menyen ovenfor og send inn bestillingen via
              bestillingsskjemaet. Du mottar bekreftelse innen onsdag med
              totalbeløpet.
            </p>

            <p className="mt-5 text-base leading-8 text-[#6f7068]">
              Henting skjer fra gården i Nannestad fredag mellom 15:00 og
              18:00. Nøyaktig adresse sendes når bestillingen er bekreftet.
            </p>

            <p className="mt-5 text-base leading-8 text-[#6f7068]">
              Spørsmål? Ta kontakt på{" "}
              <a
                href="mailto:thecalmnest.bakery@gmail.com"
                className="underline underline-offset-4"
              >
                thecalmnest.bakery@gmail.com
              </a>
            </p>

            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex border border-[#8b7653] px-7 py-4 text-xs uppercase tracking-[0.18em] text-[#6f5938]"
            >
              Gå til bestillingsskjema →
            </a>
          </div>

          <aside className="border-l border-[#d9d0be] pl-0 md:pl-10">
            <p className="font-serif text-3xl text-[#e85b2a]">Vipps</p>

            <p className="mt-5 text-sm leading-7 text-[#6f7068]">
              Betaling skjer via Vipps etter ordrebekreftelse. Du mottar en
              Vipps-forespørsel med nøyaktig beløp innen onsdag — betal før
              henting fredag.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}