import { menuItems } from "../data/menu";
import { MenuItem } from "../components/MenuItem";

const base = import.meta.env.BASE_URL;

export function WeeklyMenu() {
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

          {categories.map((category) => (
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