import { useEffect, useMemo, useState } from "react";
import { MenuItem } from "../components/MenuItem";
import { supabase } from "../lib/supabase";
import type { MenuItem as MenuItemType } from "../types/menu";

export function WeeklyMenu() {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadMenu() {
      setIsLoading(true);
      setErrorMessage(null);

      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Unable to load menu:", error);
        setErrorMessage("Ukens meny kunne ikke lastes.");
        setIsLoading(false);
        return;
      }

      setMenuItems(data ?? []);
      setIsLoading(false);
    }

    void loadMenu();
  }, []);

  const categories = useMemo(
    () => [...new Set(menuItems.map((item) => item.category))],
    [menuItems],
  );

  return (
    <section id="menu" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1040px]">
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

        {isLoading && (
          <p className="py-12 text-[#77776e]">Laster ukens meny…</p>
        )}

        {errorMessage && (
          <p className="border border-red-300 px-5 py-4 text-red-800">
            {errorMessage}
          </p>
        )}

        {!isLoading &&
          !errorMessage &&
          categories.map((category) => (
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