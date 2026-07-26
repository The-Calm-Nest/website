import { MenuItem } from "../components/MenuItem";
import { menuItems } from "../data/menu";

export function WeeklyMenu() {
  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <section id="menu" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-5 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">
              Ukens baking
            </p>

            <h2 className="mt-4 font-serif text-5xl md:text-7xl">
              Ukens meny
            </h2>
          </div>

          <p className="self-end text-sm uppercase tracking-[0.15em] text-black/60 md:text-right">
            Oppdateres hver lørdag
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-16">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]">
              {category}
            </h3>

            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
          </div>
        ))}

        <a
          href="#ordering"
          className="inline-block border-b border-black pb-2 text-xs font-semibold uppercase tracking-[0.18em]"
        >
          Legg inn bestilling
        </a>
      </div>
    </section>
  );
}