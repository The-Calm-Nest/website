import type { MenuItem as MenuItemType } from "../types/menu";

type Props = {
  item: MenuItemType;
};

export function MenuItem({ item }: Props) {
  const priceOptions = (item.priceOptions ?? []).filter(
    (option) => option.quantity.trim()
  );
  const hasPriceOptions = priceOptions.length > 0;

  const hasIngredientInfo = Boolean(
    item.ingredients?.trim() || item.allergens?.trim()
  );

  return (
    <article className="menu-item">
      <div className="menu-copy">
        <div className="menu-title-row">
          <h4>{item.name}</h4>
          {item.badge && <span>{item.badge}</span>}
        </div>

        {item.description && <p>{item.description}</p>}
        {item.extraText && (
          <p className="menu-extra">{item.extraText}</p>
        )}

        {hasIngredientInfo && (
          <details className="menu-details">
            <summary>Ingredienser og allergener</summary>
            <div className="menu-details-content">
              {item.ingredients?.trim() && (
                <div>
                  <strong>Ingredienser</strong>
                  <p>{item.ingredients}</p>
                </div>
              )}
              {item.allergens?.trim() && (
                <div className="menu-allergens">
                  <strong>Allergener</strong>
                  <p>{item.allergens}</p>
                </div>
              )}
            </div>
          </details>
        )}
      </div>

      <div className={`menu-price${hasPriceOptions || item.quantity?.trim() ? " menu-price-options" : ""}`}>
        {hasPriceOptions ? (
          <div className="menu-price-options-list">
            {priceOptions.map((option, index) => (
              <div className="menu-price-option" key={`${option.quantity}-${index}`}>
                <span>{option.quantity}</span>
                <strong>{option.price} kr</strong>
              </div>
            ))}
          </div>
        ) : (
          <>
            {item.quantity?.trim() ? (
              <div className="menu-price-options-list">
                <div className="menu-price-option">
                  <span>{item.quantity}</span>
                  <strong>{item.price} kr</strong>
                </div>
              </div>
            ) : (
              <strong>{item.price} kr</strong>
            )}
            {item.priceWithSeeds != null && (
              <span>{item.priceWithSeeds} kr med frø</span>
            )}
          </>
        )}
      </div>
    </article>
  );
}
