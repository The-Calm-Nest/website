import { Header } from "./components/Header";
import { Hero } from "./sections/Hero";
import { WeeklyMenu } from "./sections/WeeklyMenu";
import { FarmShop } from "./sections/FarmShop";
import { Ordering } from "./sections/Ordering";
import { RegularOrders } from "./sections/RegularOrders";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <WeeklyMenu />
        <FarmShop />
        <Ordering />
        <RegularOrders />
        <About />
      </main>

      <Contact />
    </>
  );
}