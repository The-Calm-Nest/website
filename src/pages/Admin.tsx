import { useEffect, useState } from "react";
import type { MenuItem } from "../types/menu";

type AdminMenuResponse = {
  published: boolean;
  updatedAt: string | null;
  items: MenuItem[];
};

const CATEGORIES = [
  "SURDEIGSBRØD",
  "MØRKT RUGBRØD",
  "BAKVERK",
  "UKENS GRANOLA — 300 G",
];

export function Admin() {
  const [password, setPassword] = useState("");
  const [menu, setMenu] = useState<AdminMenuResponse | null>(null);

  const [checking, setChecking] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  async function loadMenu() {
    try {
      const response = await fetch("/api/admin/menu", {
        credentials: "same-origin",
        cache: "no-store",
      });

      if (response.status === 401) {
        setMenu(null);
        return false;
      }

      if (!response.ok) {
        throw new Error("Kunne ikke hente menyen.");
      }

      const data: AdminMenuResponse = await response.json();

      setMenu(data);
      setDirty(false);

      return true;
    } catch (err) {
      console.error(err);
      setError("Kunne ikke hente menyen.");
      return false;
    }
  }

  useEffect(() => {
    async function checkSession() {
      await loadMenu();
      setChecking(false);
    }

    checkSession();
  }, []);

  useEffect(() => {
    function beforeUnload(event: BeforeUnloadEvent) {
      if (!dirty) return;
      event.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [dirty]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    setLoggingIn(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response
          .json<{ error?: string }>()
          .catch(() => null);

        setError(data?.error ?? "Feil passord.");
        return;
      }

      setPassword("");

      const loaded = await loadMenu();

      if (!loaded) {
        setError(
          "Innlogging lyktes, men menyen kunne ikke hentes."
        );
      }
    } catch (err) {
      console.error(err);
      setError("Kunne ikke logge inn.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    if (
      dirty &&
      !window.confirm(
        "Du har ulagrede endringer. Vil du logge ut likevel?"
      )
    ) {
      return;
    }

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      setMenu(null);
      setPassword("");
      setError("");
      setSaveMessage("");
      setDirty(false);
    }
  }

  function changed() {
    setDirty(true);
    setSaveMessage("");
    setError("");
  }

  function updateItem<K extends keyof MenuItem>(
    id: string,
    field: K,
    value: MenuItem[K]
  ) {
    if (!menu) return;

    changed();

    setMenu({
      ...menu,
      items: menu.items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    });
  }

  function normaliseOrder(items: MenuItem[]) {
    return items.map((item, index) => ({
      ...item,
      order: (index + 1) * 10,
    }));
  }

  function moveItem(index: number, direction: -1 | 1) {
    if (!menu) return;

    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= menu.items.length) {
      return;
    }

    const items = [...menu.items];

    [items[index], items[targetIndex]] = [
      items[targetIndex],
      items[index],
    ];

    changed();

    setMenu({
      ...menu,
      items: normaliseOrder(items),
    });
  }

  function addProduct() {
    if (!menu) return;

    const newProduct: MenuItem = {
      id: crypto.randomUUID(),
      category: "SURDEIGSBRØD",
      name: "Nytt produkt",
      description: "",
      price: 0,
      priceWithSeeds: undefined,
      extraText: "",
      quantity: "",
      badge: "",
      visible: true,
      order: (menu.items.length + 1) * 10,
    };

    changed();

    setMenu({
      ...menu,
      items: [...menu.items, newProduct],
    });
  }

  function deleteProduct(item: MenuItem) {
    if (!menu) return;

    const confirmed = window.confirm(
      `Vil du slette «${item.name}»?\n\nProduktet slettes først permanent når du trykker «Lagre meny».`
    );

    if (!confirmed) return;

    changed();

    setMenu({
      ...menu,
      items: normaliseOrder(
        menu.items.filter((candidate) => candidate.id !== item.id)
      ),
    });
  }

  async function handleSave() {
    if (!menu) return;

    setSaving(true);
    setError("");
    setSaveMessage("");

    try {
      const normalisedItems = normaliseOrder(menu.items);

      const response = await fetch("/api/admin/menu", {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: menu.published,
          items: normalisedItems,
        }),
      });

      if (response.status === 401) {
        setMenu(null);
        setError("Økten har utløpt. Logg inn på nytt.");
        return;
      }

      if (!response.ok) {
        const data = await response
          .json<{ error?: string }>()
          .catch(() => null);

        throw new Error(
          data?.error ?? "Kunne ikke lagre menyen."
        );
      }

      const loaded = await loadMenu();

      if (!loaded) {
        throw new Error(
          "Menyen ble lagret, men kunne ikke lastes inn på nytt."
        );
      }

      setDirty(false);
      setSaveMessage("Menyen er lagret.");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Kunne ikke lagre menyen."
      );
    } finally {
      setSaving(false);
    }
  }

  function formatUpdatedAt(value: string | null) {
    if (!value) return null;

    const date = new Date(`${value.replace(" ", "T")}Z`);

    if (Number.isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat("nb-NO", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }

  if (checking) {
    return (
      <main className="admin-page">
        <div className="admin-login">
          <p>Laster...</p>
        </div>
      </main>
    );
  }

  if (!menu) {
    return (
      <main className="admin-page">
        <div className="admin-login">
          <p className="eyebrow">THE CALM NEST</p>
          <h1>Menyadministrasjon</h1>
          <p>Logg inn for å oppdatere ukens meny.</p>

          <form onSubmit={handleLogin}>
            <label>
              Passord
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                autoFocus
              />
            </label>

            {error && <p className="admin-error">{error}</p>}

            <button type="submit" disabled={loggingIn}>
              {loggingIn ? "Logger inn..." : "Logg inn"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  const updatedAt = formatUpdatedAt(menu.updatedAt);

  return (
    <main className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <div>
            <p className="eyebrow">THE CALM NEST</p>
            <h1>Ukens meny</h1>
          </div>

          <button
            type="button"
            className="admin-secondary-button"
            onClick={handleLogout}
          >
            Logg ut
          </button>
        </header>

        <div className="admin-publish">
          <label className="admin-publish-toggle">
            <input
              type="checkbox"
              checked={menu.published}
              onChange={(event) => {
                changed();

                setMenu({
                  ...menu,
                  published: event.target.checked,
                });
              }}
            />

            <span>
              <strong>Ukens meny er publisert</strong>
              <small>
                Slå av denne hvis menyen ikke skal vises på nettsiden.
              </small>
            </span>
          </label>

          {updatedAt && (
            <div className="admin-last-saved">
              <span>Sist lagret</span>
              <strong>{updatedAt}</strong>
            </div>
          )}
        </div>

        {dirty && (
          <div className="admin-unsaved">
            Du har ulagrede endringer.
          </div>
        )}

        <div className="admin-products">
          {menu.items.map((item, index) => (
            <article className="admin-product" key={item.id}>
              <div className="admin-product-heading">
                <label className="admin-visible">
                  <input
                    type="checkbox"
                    checked={item.visible ?? true}
                    onChange={(event) =>
                      updateItem(
                        item.id,
                        "visible",
                        event.target.checked
                      )
                    }
                  />
                  Vis på menyen
                </label>

                <div className="admin-product-actions">
                  <button
                    type="button"
                    className="admin-icon-button"
                    title="Flytt opp"
                    aria-label={`Flytt ${item.name} opp`}
                    disabled={index === 0}
                    onClick={() => moveItem(index, -1)}
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    className="admin-icon-button"
                    title="Flytt ned"
                    aria-label={`Flytt ${item.name} ned`}
                    disabled={index === menu.items.length - 1}
                    onClick={() => moveItem(index, 1)}
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() => deleteProduct(item)}
                  >
                    Slett
                  </button>
                </div>
              </div>

              <div className="admin-fields">
                <label className="admin-field admin-field-wide">
                  <span>Navn</span>
                  <input
                    value={item.name}
                    onChange={(event) =>
                      updateItem(item.id, "name", event.target.value)
                    }
                  />
                </label>

                <label className="admin-field admin-field-wide">
                  <span>Kategori</span>

                  <select
                    value={item.category}
                    onChange={(event) =>
                      updateItem(
                        item.id,
                        "category",
                        event.target.value
                      )
                    }
                  >
                    {!CATEGORIES.includes(item.category) && (
                      <option value={item.category}>
                        {item.category}
                      </option>
                    )}

                    {CATEGORIES.map((category) => (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="admin-field admin-field-wide admin-description-field">
                  <span>Beskrivelse</span>
                  <textarea
                    rows={2}
                    value={item.description ?? ""}
                    onChange={(event) =>
                      updateItem(
                        item.id,
                        "description",
                        event.target.value
                      )
                    }
                  />
                </label>

                <div className="admin-compact-grid">
                  <label className="admin-field">
                    <span>Pris</span>

                    <div className="admin-input-suffix">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={item.price}
                        onChange={(event) =>
                          updateItem(
                            item.id,
                            "price",
                            Number(event.target.value)
                          )
                        }
                      />
                      <span>kr</span>
                    </div>
                  </label>

                  <label className="admin-field">
                    <span>Pris med frø</span>

                    <div className="admin-input-suffix">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={item.priceWithSeeds ?? ""}
                        onChange={(event) =>
                          updateItem(
                            item.id,
                            "priceWithSeeds",
                            event.target.value === ""
                              ? undefined
                              : Number(event.target.value)
                          )
                        }
                      />
                      <span>kr</span>
                    </div>
                  </label>

                  <label className="admin-field">
                    <span>Antall / mengde</span>
                    <input
                      value={item.quantity ?? ""}
                      onChange={(event) =>
                        updateItem(
                          item.id,
                          "quantity",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label className="admin-field">
                    <span>Merking</span>
                    <input
                      placeholder="f.eks. Ukens"
                      value={item.badge ?? ""}
                      onChange={(event) =>
                        updateItem(
                          item.id,
                          "badge",
                          event.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <label className="admin-field admin-field-wide">
                  <span>Ekstra tekst</span>
                  <input
                    value={item.extraText ?? ""}
                    onChange={(event) =>
                      updateItem(
                        item.id,
                        "extraText",
                        event.target.value
                      )
                    }
                  />
                </label>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="admin-add-button"
          onClick={addProduct}
        >
          + Legg til produkt
        </button>

        <div className="admin-save-bar">
          <span>
            {menu.items.length}{" "}
            {menu.items.length === 1 ? "produkt" : "produkter"}
          </span>

          <div className="admin-save-actions">
            {dirty && (
              <span className="admin-save-unsaved">Ulagret</span>
            )}

            {saveMessage && (
              <span className="admin-save-success">
                {saveMessage}
              </span>
            )}

            {error && (
              <span className="admin-save-error">{error}</span>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !dirty}
            >
              {saving ? "Lagrer..." : "Lagre meny"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}