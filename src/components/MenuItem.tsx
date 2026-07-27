import type { MenuItem as MenuItemType } from "../types/menu";

type MenuItemProps = {
  item: MenuItemType;
};

export function MenuItem({ item }: MenuItemProps) {
  return (
    <article className="border-t border-[#d9d0be] py-10">
      <div className="grid grid-cols-[minmax(0,1fr)_150px] gap-x-8 md:grid-cols-[minmax(0,1fr)_190px]">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <h4 className="font-serif text-3xl text-[#332b22] md:text-4xl">
              {item.name}
            </h4>

            {item.badge && (
              <span className="border border-[#cdbb98] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#9a6f32]">
                {item.badge}
              </span>
            )}
          </div>

          <p className="mt-4 text-lg leading-8 text-[#756f67] md:text-xl">
            {item.description}
          </p>

          {item.extra_text && (
            <p className="mt-2 text-lg italic leading-8 text-[#9a948c] md:text-xl">
              {item.extra_text}
            </p>
          )}
        </div>

        <div className="text-right">
          <p className="font-serif text-3xl text-[#9a6f32] md:text-4xl">
            {item.price} kr
          </p>

          {item.price_with_seeds !== null && (
            <p className="mt-5 whitespace-nowrap font-serif text-xl text-[#b09a79] md:text-2xl">
              {item.price_with_seeds} kr med frø
            </p>
          )}
        </div>
      </div>
    </article>
  );
}