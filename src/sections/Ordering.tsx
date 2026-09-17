const FACEBOOK_URL =
  "https://www.facebook.com/share/1AgFWzcDtH/?mibextid=wwXIfr";

export function Ordering() {
  return (
    <section id="ordering" className="ordering-wrap">
      <div className="content">
        <div className="ordering-card">
          <p className="eyebrow">BESTILLING</p>
          <h2>Slik bestiller du</h2>

          <h3>Send bestillingen din innen tirsdag</h3>

          <p>
            Se ukens meny og send bestillingen via Instagram, Facebook,
            e-post eller SMS innen tirsdag.
          </p>

          <p>
            Bestillingen bekreftes med totalbeløp. Etter ordrebekreftelsen
            mottar du en Vipps-forespørsel, og bestillingen er endelig når
            betalingen er registrert.
          </p>

          <p>
            Henting fredag kl. 15–18 på gården i Nannestad. Nøyaktig
            adresse sendes med ordrebekreftelsen.
          </p>

          <div className="order-actions">
            <h3>Send bestilling</h3>

            <div className="contact-buttons">
              <a
                href="https://www.instagram.com/thecalmnest.no/"
                target="_blank"
                rel="noreferrer"
              >
                INSTAGRAM <span>@thecalmnest.no</span>
              </a>

              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                FACEBOOK <span>The Calm Nest</span>
              </a>

              <a
                href="mailto:thecalmnest.bakery@gmail.com?subject=Bestilling%20-%20The%20Calm%20Nest"
              >
                E-POST <span>thecalmnest.bakery@gmail.com</span>
              </a>

              <a href="sms:+4794507219">
                SMS <span>+47 945 07 219</span>
              </a>
            </div>
          </div>

          <div className="limited">
            <h3>Lite bakeri. Små mengder.</h3>
            <p>
              Hver uke bakes et begrenset antall brød. Bestill gjerne
              tidlig – når ukens baking er fullbooket, kan du velge et
              alternativ fra menyen eller reservere til neste fredag.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
