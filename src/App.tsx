import { Header } from "./components/Header";
import { About } from "./sections/About";
import { Hero } from "./sections/Hero";
import { WeeklyMenu } from "./sections/WeeklyMenu";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <div className="border-y border-black/15 px-6 py-5 md:px-10">
          <p className="mx-auto max-w-7xl text-center text-xs font-semibold uppercase tracking-[0.17em]">
            Meny publiseres lørdag · Bestilling stenger tirsdag · Henting
            fredag 15–18
          </p>
        </div>

        <About />
        <WeeklyMenu />

        <section
          id="ordering"
          className="bg-[#262821] px-6 py-24 text-[#f4f0e7] md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">
              Kom i gang
            </p>

            <h2 className="mt-5 max-w-3xl font-serif text-5xl md:text-7xl">
              Bestill innen tirsdag — hent fredag
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/70">
              Bla gjennom ukens meny og send inn bestillingen via
              bestillingsskjemaet. Nøyaktig henteadresse sendes sammen med
              bekreftelsen.
            </p>

            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-block border-b border-white pb-2 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              Gå til bestillingsskjema
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#262821] px-6 pb-10 text-[#f4f0e7] md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/20 pt-8 text-xs uppercase tracking-[0.14em] md:flex-row md:justify-between">
          <span>Surdeigshus · Nannestad, Norge</span>
          <a href="mailto:thecalmnest.bakery@gmail.com">
            thecalmnest.bakery@gmail.com
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;