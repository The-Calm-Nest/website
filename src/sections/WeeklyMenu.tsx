import { useEffect, useState } from "react";
import { MenuItem } from "../components/MenuItem";
import type { MenuItem as MenuItemType } from "../types/menu";

const base = import.meta.env.BASE_URL;

type MenuResponse = {
  published: boolean;
  updatedAt?: string | null;
  items: MenuItemType[];
};

export function WeeklyMenu() {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch("/api/menu", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Menu API returned ${response.status}`);
        }

        const data: MenuResponse = await response.json();

        if (!data.published) {
          setMenuItems([]);
          setAvailable(false);
          return;
        }

        setMenuItems(data.items);
        setAvailable(true);
      } catch (error) {
        console.error("Could not load menu:", error);

        setMenuItems([]);
        setAvailable(false);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <>
      <section id="menu" className="section menu-section">
        <div className="content">
          <div className="section-heading">
            <div>
              <p className="eyebrow">UKENS BAKING</p>
              <h2>Ukens meny</h2>
            </div>
            <p>Oppdateres hver lørdag</p>
          </div>

          {loading && (
            <p className="menu-status">
              Laster ukens meny...
            </p>
          )}

          {!loading && !available && (
            <p className="menu-status">
              Ukens meny er midlertidig utilgjengelig. Ta kontakt direkte for
              dagens utvalg.
            </p>
          )}

          {!loading &&
            available &&
            categories.map((category) => (
              <div className="menu-category" key={category}>
                <h3>{category}</h3>

                {menuItems
                  .filter((item) => item.category === category)
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <MenuItem item={item} key={item.id} />
                  ))}
              </div>
            ))}
        </div>
      </section>

      <div className="editorial-image editorial-image-tall">
        <img
          src={`${base}images/30.jpg`}
          alt="Nybakte surdeigsbrød"
        />
      </div>
    </>
  );
}