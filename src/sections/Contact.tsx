const base = import.meta.env.BASE_URL;
const FACEBOOK_URL =
  "https://www.facebook.com/share/1AgFWzcDtH/?mibextid=wwXIfr";

export function Contact() {
  return (
    <footer id="contact" className="contact">
      <div className="content">
        <p className="eyebrow">KONTAKT</p>
        <h2>Ta gjerne kontakt</h2>

        <p className="section-intro">
          Har du spørsmål eller ønsker å legge inn en bestilling? Jeg
          svarer så snart jeg har anledning.
        </p>

        <div className="contact-details">
          <p>
            <strong>TELEFON / SMS</strong>
            <a href="sms:+4794507219">+47 945 07 219</a>
          </p>

          <p>
            <strong>E-POST</strong>
            <a href="mailto:thecalmnest.bakery@gmail.com">
              thecalmnest.bakery@gmail.com
            </a>
          </p>

          <p>
            <strong>INSTAGRAM</strong>
            <a
              href="https://www.instagram.com/thecalmnest.no/"
              target="_blank"
              rel="noreferrer"
            >
              @thecalmnest.no
            </a>
          </p>

          <p>
            <strong>FACEBOOK</strong>
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
              The Calm Nest
            </a>
          </p>
        </div>

        <div className="footer-brand">
          <img src={`${base}images/10-nobg.png`} alt="The Calm Nest" />
          <div>
            <strong>The Calm Nest</strong>
            <span>Nannestad, Norge</span>
            <span>thecalmnest.bakery@gmail.com</span>
          </div>
        </div>

        <nav className="footer-legal" aria-label="Juridisk informasjon">
          <a href="/personvern">Personvern</a>
          <span aria-hidden="true">·</span>
          <a href="/kjopsvilkar">Kjøpsvilkår</a>
        </nav>
      </div>
    </footer>
  );
}
