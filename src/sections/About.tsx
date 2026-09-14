const base = import.meta.env.BASE_URL;

export function About() {
  return (
    <section id="about" className="section about">
      <div className="content">
        <h2>Om The Calm Nest</h2>

        <div className="about-layout">
          <img
            className="about-portrait"
            src={`${base}images/70.jpg`}
            alt="Maria fra The Calm Nest"
          />

          <div className="about-copy">
            <h3>Hei, jeg heter Maria.</h3>

            <p>
              Jeg er medgründer av The Calm Nest. Etter mange år innen
              markedsføring ser hverdagen min ganske annerledes ut i dag.
              Jeg er mamma til fire, kone og småbruker – og én dag i uken
              forvandles hjemmet vårt til et lite surdeigsbakeri.
            </p>

            <p>
              Jeg tror på langsom mat, enkle råvarer og at et godt brød
              kan gjøre en helt vanlig dag litt finere. For meg begynner
              god mat med gode råvarer. Derfor velger jeg økologisk så
              langt det lar seg gjøre – både på vårt eget kjøkken og i
              bakeriet – og lager maten fra bunnen av, med tid og omtanke.
            </p>

            <p>
              Hvert brød begynner tre dager før det er hos deg: mating av
              surdeigsstarteren, lang kaldheving og steking fredag morgen.
              Jeg baker med økologisk mel, uten unødvendige
              tilsetningsstoffer og med råvarer jeg stoler på.
            </p>

            <p>
              Ved siden av bakeriet legger hønsene våre ferske egg året
              rundt, og biene våre gir oss honning fra blomster og enger
              rundt gården. Her finner du også et lite utvalg hjemmelagde
              varer – alt laget i liten skala, med den samme omtanken for
              gode råvarer og kvalitet.
            </p>
          </div>
        </div>

        <img
          className="about-detail"
          src={`${base}images/80.jpg`}
          alt="Hjemmelaget brød fra The Calm Nest"
        />
      </div>
    </section>
  );
}