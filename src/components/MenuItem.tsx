import type { MenuItem as MenuItemType } from "../types/menu";

type Props = {
  item: MenuItemType;
};

export function MenuItem({ item }: Props) {
  return (
    <article className="menu-item">
      <div className="menu-copy">
        <div className="menu-title-row">
          <h4>{item.name}</h4>
          {item.badge && <span>{item.badge}</span>}
        </div>

        {item.quantity && <p className="menu-quantity">{item.quantity}</p>}
        {item.description && <p>{item.description}</p>}
        {item.extraText && (
          <p className="menu-extra">{item.extraText}</p>
        )}
      </div>

      <div className="menu-price">
        <strong>{item.price} kr</strong>
        {item.priceWithSeeds && (
          <span>{item.priceWithSeeds} kr med frø</span>
        )}
      </div>
    </article>
  );
}