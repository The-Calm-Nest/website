/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

type MenuRow = {
  id: string;
  category: string;
  name: string;
  description: string | null;
  price: number | null;
  price_with_seeds: number | null;
  extra_text: string | null;
  quantity: string | null;
  badge: string | null;
  visible: number;
  sort_order: number;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    /*
     * PUBLIC MENU API
     */
    if (url.pathname === "/api/menu" && request.method === "GET") {
      try {
        const state = await env.DB.prepare(
          `
          SELECT published, updated_at
          FROM menu_state
          WHERE id = 1
          `
        ).first<{
          published: number;
          updated_at: string | null;
        }>();

        if (!state) {
          return Response.json(
            {
              error: "Menu state not found",
              published: false,
              items: [],
            },
            {
              status: 503,
              headers: {
                "Cache-Control": "no-store",
              },
            }
          );
        }

        /*
         * Important:
         * if Maria has unpublished the menu, we deliberately
         * return NO products rather than stale products.
         */
        if (state.published !== 1) {
          return Response.json(
            {
              published: false,
              updatedAt: state.updated_at,
              items: [],
            },
            {
              headers: {
                "Cache-Control": "no-store",
              },
            }
          );
        }

        const result = await env.DB.prepare(
          `
          SELECT
            id,
            category,
            name,
            description,
            price,
            price_with_seeds,
            extra_text,
            quantity,
            badge,
            visible,
            sort_order
          FROM menu_items
          WHERE visible = 1
          ORDER BY sort_order ASC
          `
        ).all<MenuRow>();

        const items = result.results.map((row) => ({
          id: row.id,
          category: row.category,
          name: row.name,
          description: row.description ?? undefined,
          price: row.price,
          priceWithSeeds: row.price_with_seeds ?? undefined,
          extraText: row.extra_text ?? undefined,
          quantity: row.quantity ?? undefined,
          badge: row.badge ?? undefined,
          visible: row.visible === 1,
          order: row.sort_order,
        }));

        return Response.json(
          {
            published: true,
            updatedAt: state.updated_at,
            items,
          },
          {
            headers: {
              /*
               * Do not let an old weekly menu linger in caches.
               */
              "Cache-Control": "no-store",
            },
          }
        );
      } catch (error) {
        console.error("Failed to load menu:", error);

        return Response.json(
          {
            error: "Menu temporarily unavailable",
            published: false,
            items: [],
          },
          {
            status: 503,
            headers: {
              "Cache-Control": "no-store",
            },
          }
        );
      }
    }

    /*
     * Everything that isn't /api/... is handled by the
     * static Vite site.
     */
    return env.ASSETS.fetch(request);
  },
};