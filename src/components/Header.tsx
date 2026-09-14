const base = import.meta.env.BASE_URL;

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top">
          <img src={`${base}images/10.jpg`} alt="" />
          <span>The Calm Nest</span>
        </a>

        <nav aria-label="Hovedmeny">
          <a href="#menu">Meny</a>
          <a href="#ordering">Bestilling</a>
          <a href="#about">Om</a>
          <a href="#contact">Kontakt</a>
        </nav>
      </div>
    </header>
  );
}