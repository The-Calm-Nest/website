import { Header } from "./components/Header";
import { About } from "./sections/About";
import { Hero } from "./sections/Hero";
import { WeeklyMenu } from "./sections/WeeklyMenu";
import { FarmShop } from "./sections/FarmShop";
import { RegularOrders } from "./sections/RegularOrders";
import { Ordering } from "./sections/Ordering";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <WeeklyMenu />
        <FarmShop />
        <Ordering />
        <RegularOrders />
      </main>

      <footer className="border-t border-[#d9d0be] px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-[1040px] flex-col gap-4 text-xs uppercase tracking-[0.14em] text-[#77776e] md:flex-row md:items-center md:justify-between">
          <span className="font-serif text-base normal-case tracking-normal text-[#332b22]">
            The Calm Nest
          </span>
      
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