import { useEffect, useState } from "react";
import type { PriceOption } from "../types/menu";

type FarmItem = {
  id: string;
  name: string;
  description?: string;
  priceOptions?: PriceOption[];
  priceText?: string;
  visible?: boolean;
  order: number;
};

export function FarmShopAdmin() {
  const [items, setItems] = useState<FarmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const response = await fetch("/api/admin/farm-shop", { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) throw new Error("Kunne ikke hente gårdsvarer.");
    const data: { items: FarmItem[] } = await response.json();
    setItems(data.items);
    setDirty(false);
  }

  useEffect(() => {
    load().catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function guard(e: BeforeUnloadEvent) { if (dirty) e.preventDefault(); }
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);

  function change(next: FarmItem[]) {
    setItems(next);
    setDirty(true);
    setMessage("");
    setError("");
  }
  function update(id: string, patch: Partial<FarmItem>) {
    change(items.map((item) => item.id === id ? { ...item, ...patch } : item));
  }
  function move(index: number, direction: -1 | 1) {
    const other = index + direction;
    if (other < 0 || other >= items.length) return;
    const next = [...items];
    [next[index], next[other]] = [next[other], next[index]];
    change(next.map((item, i) => ({ ...item, order: (i + 1) * 10 })));
  }
  async function save() {
    setSaving(true); setError(""); setMessage("");
    try {
      const payload = items.map((item, index) => ({ ...item, order: (index + 1) * 10 }));
      const response = await fetch("/api/admin/farm-shop", {
        method: "PUT", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      });
      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(result.error || "Kunne ikke lagre gårdsvarer.");
      }
      await load();
      setMessage("Gårdsvarer er lagret.");
    } catch (e) { setError(e instanceof Error ? e.message : "Lagring feilet."); }
    finally { setSaving(false); }
  }

  return (
    <section className="admin-farm-section">
      <h2>Gårdsvarer</h2>
      <p>Rediger produkter i gårdsbutikken. Skjul sesongvarer når de ikke er tilgjengelige.</p>
      {loading && <p>Laster gårdsvarer...</p>}
      {error && <p className="admin-error">{error}</p>}
      {!loading && items.map((item, index) => (
        <article className="admin-product" key={item.id}>
          <div className="admin-product-heading">
            <label className="admin-visible"><input type="checkbox" checked={item.visible ?? true}
              onChange={(e) => update(item.id, { visible: e.target.checked })} /> Vis i gårdsbutikken</label>
            <div className="admin-product-actions">
              <button type="button" className="admin-icon-button" disabled={index === 0} onClick={() => move(index, -1)}>↑</button>
              <button type="button" className="admin-icon-button" disabled={index === items.length - 1} onClick={() => move(index, 1)}>↓</button>
              <button type="button" className="admin-delete-button" onClick={() => {
                if (window.confirm(`Slette «${item.name}»?`)) change(items.filter((i) => i.id !== item.id));
              }}>Slett</button>
            </div>
          </div>
          <div className="admin-fields">
            <label className="admin-field admin-field-wide"><span>Navn</span>
              <input value={item.name} onChange={(e) => update(item.id, { name: e.target.value })} /></label>
            <label className="admin-field admin-field-wide"><span>Beskrivelse</span>
              <textarea rows={3} value={item.description ?? ""} onChange={(e) => update(item.id, { description: e.target.value })} /></label>
            <label className="admin-field admin-field-wide"><span>Pristekst (for varer uten fast pris)</span>
              <input placeholder="Ta kontakt for pris" value={item.priceText ?? ""} onChange={(e) => update(item.id, { priceText: e.target.value })} /></label>
            <div className="admin-field admin-field-wide admin-price-options-field">
              <span>Prisalternativer</span>
              {(item.priceOptions ?? []).map((option, optionIndex) => (
                <div className="admin-price-option" key={optionIndex}>
                  <input aria-label="Mengde" placeholder="Mengde, f.eks. 450 g" value={option.quantity}
                    onChange={(e) => update(item.id, { priceOptions: (item.priceOptions ?? []).map((o, i) => i === optionIndex ? { ...o, quantity: e.target.value } : o) })} />
                  <input aria-label="Pris" type="number" min="0" step="1" value={option.price}
                    onChange={(e) => update(item.id, { priceOptions: (item.priceOptions ?? []).map((o, i) => i === optionIndex ? { ...o, price: Number(e.target.value) } : o) })} />
                  <button type="button" className="admin-secondary-button" onClick={() => update(item.id, { priceOptions: (item.priceOptions ?? []).filter((_, i) => i !== optionIndex) })}>Fjern</button>
                </div>
              ))}
              <button type="button" className="admin-secondary-button" onClick={() => update(item.id, { priceOptions: [...(item.priceOptions ?? []), { quantity: "", price: 0 }] })}>+ Legg til prisalternativ</button>
            </div>
          </div>
        </article>
      ))}
      {!loading && <>
        <button type="button" className="admin-add-button" onClick={() => change([...items, { id: crypto.randomUUID(), name: "Nytt produkt", description: "", priceOptions: [], priceText: "", visible: true, order: (items.length + 1) * 10 }])}>+ Legg til gårdsvare</button>
        <div className="admin-save-bar">
          <span>{dirty ? "Ulagrede endringer i gårdsvarer" : `${items.length} gårdsvarer`}</span>
          <div className="admin-save-actions">
            {message && <span className="admin-save-success">{message}</span>}
            <button type="button" disabled={!dirty || saving} onClick={save}>{saving ? "Lagrer..." : "Lagre gårdsvarer"}</button>
          </div>
        </div>
      </>}
    </section>
  );
}
