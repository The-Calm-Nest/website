import type { MenuItem as MenuItemType } from "../data/menu";

type MenuItemProps = {
  item: MenuItemType;
};

export function MenuItem({ item }: MenuItemProps) {
  return (
    <article className="grid gap-3 border-t border-black/20 py-7 md:grid-cols-[1.2fr_2fr_auto] md:gap-8">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-serif text-xl">{item.name}</h3>

          {item.badge && (
            <span className="rounded-full border border-black/30 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
              {item.badge}
            </span>
          )}
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-black/70">
        {item.description}
      </p>

      <div className="whitespace-nowrap font-serif text-lg">
        {item.price} kr
        {item.priceNote && (
          <div className="mt-1 text-xs text-black/60">{item.priceNote}</div>
        )}
      </div>
    </article>
  );
}