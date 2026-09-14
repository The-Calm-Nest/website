const base = import.meta.env.BASE_URL;

export function Hero() {
  return (
    <>
      <section id="top" className="hero">
        <div className="content">
          <p className="eyebrow">NANNESTAD · SURDEIGSHUS</p>

          <h1>
            Tilbake til
            <em>det gode.</em>
          </h1>

          <p className="hero-copy">
            Surdeigsbrød og gårdsvarer laget fra bunnen av, med gode
            råvarer, tid og omtanke.
          </p>

          <a className="primary-button" href="#menu">
            SE UKENS MENY
          </a>
        </div>
      </section>

      <div className="hero-image">
        <img
          src={`${base}images/20.jpg`}
          alt="Landskapet rundt The Calm Nest i Nannestad"
        />
      </div>

      <section className="schedule">
        <div className="content schedule-grid">
          <div>
            <strong>LØRDAG</strong>
            <span>Ukens meny publiseres</span>
          </div>
          <div>
            <strong>TIRSDAG</strong>
            <span>Bestillingsfrist</span>
          </div>
          <div>
            <strong>FREDAG</strong>
            <span>Bakedag</span>
          </div>
          <div>
            <strong>FREDAG 15–18</strong>
            <span>Henting på gården</span>
          </div>
        </div>
      </section>
    </>
  );
}