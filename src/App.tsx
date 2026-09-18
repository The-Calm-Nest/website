import { Header } from "./components/Header";
import { Hero } from "./sections/Hero";
import { WeeklyMenu } from "./sections/WeeklyMenu";
import { FarmShop } from "./sections/FarmShop";
import { Ordering } from "./sections/Ordering";
import { RegularOrders } from "./sections/RegularOrders";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Admin } from "./pages/Admin";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";

export default function App() {
  const path = window.location.pathname;

  if (path === "/admin") {
    return <Admin />;
  }

  if (path === "/personvern") {
    return <Privacy />;
  }

  if (path === "/kjopsvilkar") {
    return <Terms />;
  }

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
