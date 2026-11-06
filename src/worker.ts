/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
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
  ingredients: string | null;
  allergens: string | null;
  visible: number;
  sort_order: number;
  price_options: string | null;
};

type AdminMenuItem = {
  id: string;
  category: string;
  name: string;
  description?: string;
  price: number;
  priceWithSeeds?: number;
  priceOptions?: PriceOption[];
  extraText?: string;
  quantity?: string;
  badge?: string;
  ingredients?: string;
  allergens?: string;
  visible?: boolean;
  order: number;
};

type PriceOption = { quantity: string; price: number };

type FarmShopRow = {
  id: string;
  name: string;
  description: string | null;
  price_options: string | null;
  price_text: string | null;
  visible: number;
  sort_order: number;
};

type AdminFarmShopItem = {
  id: string;
  name: string;
  description?: string;
  priceOptions?: PriceOption[];
  priceText?: string;
  visible?: boolean;
  order: number;
};

function parsePriceOptions(value: string | null): PriceOption[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((option): option is PriceOption =>
      typeof option === "object" && option !== null &&
      typeof option.quantity === "string" &&
      typeof option.price === "number" && Number.isFinite(option.price)
    );
  } catch {
    return [];
  }
}

function validatePriceOptions(value: unknown): value is PriceOption[] | undefined {
  return value === undefined || (
    Array.isArray(value) && value.length <= 30 && value.every((option) =>
      typeof option === "object" && option !== null &&
      typeof option.quantity === "string" &&
      option.quantity.trim().length > 0 && option.quantity.length <= 100 &&
      typeof option.price === "number" &&
      Number.isFinite(option.price) && option.price >= 0
    )
  );
}

function mapFarmShopRow(row: FarmShopRow) {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    priceOptions: parsePriceOptions(row.price_options),
    priceText: row.price_text ?? undefined,
    visible: row.visible === 1,
    order: row.sort_order,
  };
}

const encoder = new TextEncoder();

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(value)
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createSession(secret: string) {
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7;

  const value = `admin:${expires}`;
  const signature = await sign(value, secret);

  return `${value}:${signature}`;
}

async function isAuthenticated(
  request: Request,
  secret: string
) {
  const cookie = request.headers.get("Cookie") ?? "";

  const sessionCookie = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) =>
      part.startsWith("calm_nest_session=")
    );

  if (!sessionCookie) {
    return false;
  }

  const session = sessionCookie.substring(
    "calm_nest_session=".length
  );

  const parts = session.split(":");

  if (parts.length !== 3) {
    return false;
  }

  const [role, expiresString, suppliedSignature] =
    parts;

  if (role !== "admin") {
    return false;
  }

  const expires = Number(expiresString);

  if (
    !Number.isFinite(expires) ||
    Date.now() > expires
  ) {
    return false;
  }

  const expectedSignature = await sign(
    `${role}:${expiresString}`,
    secret
  );

  if (
    suppliedSignature.length !==
    expectedSignature.length
  ) {
    return false;
  }

  let difference = 0;

  for (
    let i = 0;
    i < suppliedSignature.length;
    i++
  ) {
    difference |=
      suppliedSignature.charCodeAt(i) ^
      expectedSignature.charCodeAt(i);
  }

  return difference === 0;
}

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function mapMenuRow(row: MenuRow) {
  return {
    id: row.id,
    category: row.category,
    name: row.name,
    description: row.description ?? undefined,
    price: row.price ?? 0,
    priceWithSeeds:
      row.price_with_seeds ?? undefined,
    priceOptions: parsePriceOptions(row.price_options),
    extraText: row.extra_text ?? undefined,
    quantity: row.quantity ?? undefined,
    badge: row.badge ?? undefined,
    ingredients: row.ingredients ?? undefined,
    allergens: row.allergens ?? undefined,
    visible: row.visible === 1,
    order: row.sort_order,
  };
}

export default {
  async fetch(
    request: Request,
    env: Env
  ): Promise<Response> {
    const url = new URL(request.url);

    /*
     * LOGIN
     */
    if (
      url.pathname === "/api/admin/login" &&
      request.method === "POST"
    ) {
      try {
        const body =
          await request.json<{
            password?: string;
          }>();

        if (!env.ADMIN_PASSWORD) {
          return json(
            {
              error:
                "ADMIN_PASSWORD mangler i Worker-miljøet",
            },
            500
          );
        }

        if (!env.SESSION_SECRET) {
          return json(
            {
              error:
                "SESSION_SECRET mangler i Worker-miljøet",
            },
            500
          );
        }

        if (
          !body.password ||
          body.password !== env.ADMIN_PASSWORD
        ) {
          return json(
            { error: "Ugyldig passord" },
            401
          );
        }

        const session = await createSession(
          env.SESSION_SECRET
        );

        return new Response(
          JSON.stringify({
            success: true,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
              "Set-Cookie":
                `calm_nest_session=${session}; ` +
                "HttpOnly; Secure; SameSite=Strict; " +
                "Path=/; Max-Age=604800",
            },
          }
        );
      } catch {
        return json(
          { error: "Ugyldig forespørsel" },
          400
        );
      }
    }

    /*
     * LOGOUT
     */
    if (
      url.pathname === "/api/admin/logout" &&
      request.method === "POST"
    ) {
      return new Response(
        JSON.stringify({
          success: true,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            "Set-Cookie":
              "calm_nest_session=; " +
              "HttpOnly; Secure; SameSite=Strict; " +
              "Path=/; Max-Age=0",
          },
        }
      );
    }

    /*
     * ADMIN: GET COMPLETE MENU
     */
    if (
      url.pathname === "/api/admin/menu" &&
      request.method === "GET"
    ) {
      const authenticated =
        await isAuthenticated(
          request,
          env.SESSION_SECRET
        );

      if (!authenticated) {
        return json(
          { error: "Ikke innlogget" },
          401
        );
      }

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

        const result = await env.DB.prepare(
          `
          SELECT
            id,
            category,
            name,
            description,
            price,
            price_with_seeds,
            price_options,
            extra_text,
            quantity,
            badge,
            ingredients,
            allergens,
            visible,
            sort_order
          FROM menu_items
          ORDER BY sort_order ASC
          `
        ).all<MenuRow>();

        return json({
          published:
            state?.published === 1,
          updatedAt:
            state?.updated_at ?? null,
          items:
            result.results.map(mapMenuRow),
        });
      } catch (error) {
        console.error(
          "Failed to load admin menu:",
          error
        );

        return json(
          {
            error:
              "Kunne ikke hente menyen",
          },
          500
        );
      }
    }

    /*
     * ADMIN: SAVE COMPLETE MENU
     *
     * The admin sends the desired final state.
     *
     * Existing IDs -> updated
     * New IDs      -> inserted
     * Missing IDs  -> deleted
     */
    if (
      url.pathname === "/api/admin/menu" &&
      request.method === "PUT"
    ) {
      const authenticated =
        await isAuthenticated(
          request,
          env.SESSION_SECRET
        );

      if (!authenticated) {
        return json(
          { error: "Ikke innlogget" },
          401
        );
      }

      try {
        const body =
          await request.json<{
            published?: boolean;
            items?: AdminMenuItem[];
          }>();

        if (
          typeof body.published !==
            "boolean" ||
          !Array.isArray(body.items)
        ) {
          return json(
            {
              error:
                "Ugyldige menydata",
            },
            400
          );
        }

        /*
         * Basic validation.
         */
        const ids = new Set<string>();

        for (const item of body.items) {
          if (
            !item.id ||
            !item.name?.trim() ||
            !item.category?.trim() ||
            !Number.isFinite(item.order)
          ) {
            return json(
              {
                error:
                  "Alle produkter må ha navn og kategori.",
              },
              400
            );
          }

          if (ids.has(item.id)) {
            return json(
              {
                error:
                  "To produkter har samme ID.",
              },
              400
            );
          }

          ids.add(item.id);

          if (
            !Number.isFinite(item.price) ||
            item.price < 0
          ) {
            return json(
              {
                error:
                  `Ugyldig pris for «${item.name}».`,
              },
              400
            );
          }

          if (!validatePriceOptions(item.priceOptions)) {
            return json({ error: `Ugyldige prisalternativer for «${item.name}».` }, 400);
          }

          if (
            item.priceWithSeeds !==
              undefined &&
            (!Number.isFinite(
              item.priceWithSeeds
            ) ||
              item.priceWithSeeds < 0)
          ) {
            return json(
              {
                error:
                  `Ugyldig pris med frø for «${item.name}».`,
              },
              400
            );
          }
        }

        /*
         * UPSERT all products currently present
         * in the admin editor.
         */
        const statements = body.items.map(
          (item) =>
            env.DB.prepare(
              `
              INSERT INTO menu_items (
                id,
                category,
                name,
                description,
                price,
                price_with_seeds,
                price_options,
                extra_text,
                quantity,
                badge,
                ingredients,
                allergens,
                visible,
                sort_order
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

              ON CONFLICT(id) DO UPDATE SET
                category = excluded.category,
                name = excluded.name,
                description = excluded.description,
                price = excluded.price,
                price_with_seeds = excluded.price_with_seeds,
                price_options = COALESCE(excluded.price_options, menu_items.price_options),
                extra_text = excluded.extra_text,
                quantity = excluded.quantity,
                badge = excluded.badge,
                ingredients = excluded.ingredients,
                allergens = excluded.allergens,
                visible = excluded.visible,
                sort_order = excluded.sort_order
              `
            ).bind(
              item.id,
              item.category.trim(),
              item.name.trim(),
              item.description?.trim() ||
                null,
              item.price,
              item.priceWithSeeds ?? null,
              item.priceOptions === undefined ? null : JSON.stringify(item.priceOptions),
              item.extraText?.trim() ||
                null,
              item.quantity?.trim() ||
                null,
              item.badge?.trim() || null,
              item.ingredients?.trim() || null,
              item.allergens?.trim() || null,
              item.visible === false
                ? 0
                : 1,
              item.order
            )
        );

        /*
         * Delete anything from D1 that is no
         * longer present in the editor.
         */
        if (body.items.length === 0) {
          statements.push(
            env.DB.prepare(
              `DELETE FROM menu_items`
            )
          );
        } else {
          const placeholders =
            body.items
              .map(() => "?")
              .join(", ");

          statements.push(
            env.DB.prepare(
              `
              DELETE FROM menu_items
              WHERE id NOT IN (${placeholders})
              `
            ).bind(
              ...body.items.map(
                (item) => item.id
              )
            )
          );
        }

        /*
         * Update global publication state.
         */
        statements.push(
          env.DB.prepare(
            `
            UPDATE menu_state
            SET
              published = ?,
              updated_at = datetime('now')
            WHERE id = 1
            `
          ).bind(
            body.published ? 1 : 0
          )
        );

        /*
         * Execute together.
         */
        await env.DB.batch(statements);

        return json({
          success: true,
        });
      } catch (error) {
        console.error(
          "Failed to save menu:",
          error
        );

        return json(
          {
            error:
              "Kunne ikke lagre menyen",
          },
          500
        );
      }
    }

    /*
     * PUBLIC MENU
     */
    if (
      url.pathname === "/api/menu" &&
      request.method === "GET"
    ) {
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
          return json(
            {
              error:
                "Menu state not found",
              published: false,
              items: [],
            },
            503
          );
        }

        if (state.published !== 1) {
          return json({
            published: false,
            updatedAt:
              state.updated_at,
            items: [],
          });
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
            price_options,
            extra_text,
            quantity,
            badge,
            ingredients,
            allergens,
            visible,
            sort_order
          FROM menu_items
          WHERE visible = 1
          ORDER BY sort_order ASC
          `
        ).all<MenuRow>();

        return json({
          published: true,
          updatedAt:
            state.updated_at,
          items:
            result.results.map(mapMenuRow),
        });
      } catch (error) {
        console.error(
          "Failed to load menu:",
          error
        );

        return json(
          {
            error:
              "Menu temporarily unavailable",
            published: false,
            items: [],
          },
          503
        );
      }
    }

    /*
     * FARM SHOP: public products and authenticated administration.
     * Separate from the weekly menu publication state.
     */
    if (url.pathname === "/api/farm-shop" && request.method === "GET") {
      try {
        const result = await env.DB.prepare(`
          SELECT id, name, description, price_options, price_text, visible, sort_order
          FROM farm_shop_items WHERE visible = 1 ORDER BY sort_order ASC
        `).all<FarmShopRow>();
        return json({ items: result.results.map(mapFarmShopRow) });
      } catch (error) {
        console.error("Failed to load farm shop:", error);
        return json({ error: "Farm shop temporarily unavailable", items: [] }, 503);
      }
    }

    if (url.pathname === "/api/admin/farm-shop" &&
        (request.method === "GET" || request.method === "PUT")) {
      if (!env.SESSION_SECRET || !await isAuthenticated(request, env.SESSION_SECRET)) {
        return json({ error: "Ikke innlogget" }, 401);
      }

      if (request.method === "GET") {
        try {
          const result = await env.DB.prepare(`
            SELECT id, name, description, price_options, price_text, visible, sort_order
            FROM farm_shop_items ORDER BY sort_order ASC
          `).all<FarmShopRow>();
          return json({ items: result.results.map(mapFarmShopRow) });
        } catch (error) {
          console.error("Failed to load admin farm shop:", error);
          return json({ error: "Kunne ikke hente gårdsvarer" }, 500);
        }
      }

      try {
        const body = await request.json<{ items?: AdminFarmShopItem[] }>();
        if (!Array.isArray(body.items) || body.items.length > 200) {
          return json({ error: "Ugyldige gårdsvarer" }, 400);
        }
        const ids = new Set<string>();
        for (const item of body.items) {
          if (typeof item.id !== "string" || !item.id.trim() ||
              typeof item.name !== "string" || !item.name.trim() ||
              !Number.isFinite(item.order) || ids.has(item.id) ||
              !validatePriceOptions(item.priceOptions)) {
            return json({ error: "Ugyldig produkt eller prisalternativer" }, 400);
          }
          ids.add(item.id);
        }

        const statements = body.items.map((item) => env.DB.prepare(`
          INSERT INTO farm_shop_items
            (id, name, description, price_options, price_text, visible, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            description = excluded.description,
            price_options = excluded.price_options,
            price_text = excluded.price_text,
            visible = excluded.visible,
            sort_order = excluded.sort_order
        `).bind(
          item.id, item.name.trim(), item.description?.trim() || null,
          JSON.stringify(item.priceOptions ?? []), item.priceText?.trim() || null,
          item.visible === false ? 0 : 1, item.order
        ));
        if (body.items.length === 0) {
          statements.push(env.DB.prepare("DELETE FROM farm_shop_items"));
        } else {
          const placeholders = body.items.map(() => "?").join(", ");
          statements.push(env.DB.prepare(
            `DELETE FROM farm_shop_items WHERE id NOT IN (${placeholders})`
          ).bind(...body.items.map((item) => item.id)));
        }
        await env.DB.batch(statements);
        return json({ success: true });
      } catch (error) {
        console.error("Failed to save farm shop:", error);
        return json({ error: "Kunne ikke lagre gårdsvarer" }, 500);
      }
    }

    /*
     * Unknown API routes must not become
     * the React SPA.
     */
    if (
      url.pathname.startsWith("/api/")
    ) {
      return json(
        { error: "Not found" },
        404
      );
    }

    /*
     * React/Vite application.
     */
    return env.ASSETS.fetch(request);
  },
};