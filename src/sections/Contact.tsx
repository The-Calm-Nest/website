const base = import.meta.env.BASE_URL;

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
            <a href="tel:+4794507219">+47 945 07 219</a>
          </p>

          <p>
            <strong>E-POST</strong>
            <a href="mailto:thecalmnest.bakery@gmail.com">
              thecalmnest.bakery@gmail.com
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
      </div>
    </footer>
  );
}