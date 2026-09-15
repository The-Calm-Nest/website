import { useEffect, useState } from "react";
import type { MenuItem } from "../types/menu";

type AdminMenuResponse = {
  published: boolean;
  updatedAt: string | null;
  items: MenuItem[];
};

export function Admin() {
  const [password, setPassword] = useState("");
  const [menu, setMenu] = useState<AdminMenuResponse | null>(null);

  const [checking, setChecking] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [saving, setSaving] = useState(false);

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
        body: JSON.stringify({
          password,
        }),
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
    }
  }

  function updateItem<K extends keyof MenuItem>(
    id: string,
    field: K,
    value: MenuItem[K]
  ) {
    if (!menu) return;

    setSaveMessage("");

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

  async function handleSave() {
    if (!menu) return;

    setSaving(true);
    setError("");
    setSaveMessage("");

    try {
      const response = await fetch("/api/admin/menu", {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: menu.published,
          items: menu.items,
        }),
      });

      if (response.status === 401) {
        setMenu(null);
        setError(
          "Økten har utløpt. Logg inn på nytt."
        );
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

      /*
       * Reload from D1 after saving.
       * This makes sure the admin interface displays
       * exactly what is actually stored in the database.
       */
      const loaded = await loadMenu();

      if (!loaded) {
        throw new Error(
          "Menyen ble lagret, men kunne ikke lastes inn på nytt."
        );
      }

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

  /*
   * Check existing session.
   */
  if (checking) {
    return (
      <main className="admin-page">
        <div className="admin-login">
          <p>Laster...</p>
        </div>
      </main>
    );
  }

  /*
   * Login screen.
   */
  if (!menu) {
    return (
      <main className="admin-page">
        <div className="admin-login">
          <p className="eyebrow">THE CALM NEST</p>

          <h1>Menyadministrasjon</h1>

          <p>
            Logg inn for å oppdatere ukens meny.
          </p>

          <form onSubmit={handleLogin}>
            <label>
              Passord

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                autoFocus
              />
            </label>

            {error && (
              <p className="admin-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
            >
              {loggingIn
                ? "Logger inn..."
                : "Logg inn"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  /*
   * Admin editor.
   */
  return (
    <main className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <div>
            <p className="eyebrow">
              THE CALM NEST
            </p>

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
          <label>
            <input
              type="checkbox"
              checked={menu.published}
              onChange={(event) => {
                setSaveMessage("");

                setMenu({
                  ...menu,
                  published: event.target.checked,
                });
              }}
            />

            <span>
              <strong>
                Ukens meny er publisert
              </strong>

              <small>
                Slå av denne hvis menyen ikke
                skal vises på nettsiden.
              </small>
            </span>
          </label>
        </div>

        <div className="admin-products">
          {menu.items.map((item) => (
            <article
              className="admin-product"
              key={item.id}
            >
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

                <span>
                  #{item.order}
                </span>
              </div>

              <div className="admin-fields">
                <label>
                  Navn

                  <input
                    value={item.name}
                    onChange={(event) =>
                      updateItem(
                        item.id,
                        "name",
                        event.target.value
                      )
                    }
                  />
                </label>

                <label>
                  Kategori

                  <input
                    value={item.category}
                    onChange={(event) =>
                      updateItem(
                        item.id,
                        "category",
                        event.target.value
                      )
                    }
                  />
                </label>

                <label className="admin-wide">
                  Beskrivelse

                  <textarea
                    rows={3}
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

                <label>
                  Pris

                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={item.price ?? ""}
                    onChange={(event) =>
                    updateItem(
                        item.id,
                        "price",
                        Number(event.target.value)
                    )
                    }
                  />
                </label>

                <label>
                  Pris med frø

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
                </label>

                <label>
                  Antall / mengde

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

                <label>
                  Rekkefølge

                  <input
                    type="number"
                    step="1"
                    value={item.order}
                    onChange={(event) =>
                      updateItem(
                        item.id,
                        "order",
                        Number(event.target.value)
                      )
                    }
                  />
                </label>

                <label className="admin-wide">
                  Ekstra tekst

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

        <div className="admin-save-bar">
          <span>
            {menu.items.length} produkter
          </span>

          <div className="admin-save-actions">
            {saveMessage && (
              <span className="admin-save-success">
                {saveMessage}
              </span>
            )}

            {error && (
              <span className="admin-save-error">
                {error}
              </span>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Lagrer..."
                : "Lagre meny"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}