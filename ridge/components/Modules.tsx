const MODULES = [
  {
    num: "Module 01",
    title: "Fixer le bon prix",
    text: "Comment estimer une paire selon la marque, l'état, la taille et la demande réelle — pour vendre vite sans te sous-payer.",
  },
  {
    num: "Module 02",
    title: "Des photos qui vendent",
    text: "Cadrage, lumière, mise en scène simple : ce qui fait qu'une annonce arrête le scroll au lieu de se noyer dans la masse.",
  },
  {
    num: "Module 03",
    title: "Où et comment poster",
    text: "Leboncoin, Facebook Marketplace, groupes freeride spécialisés : le bon canal selon le type de paire, et comment rédiger l'annonce.",
  },
  {
    num: "Module 04",
    title: "Négocier et closer",
    text: "Répondre aux messages, gérer les baisses de prix, conclure en personne ou à distance sans perdre la vente.",
  },
  {
    num: "Bonus",
    title: "Contenu TikTok/Insta",
    text: "Filmer le déballage, le nettoyage ou l'essai pour construire une audience en même temps que tu vends.",
  },
  {
    num: "Bonus",
    title: "Suivi des ventes",
    text: "Un tableau simple pour suivre marge, temps de vente moyen, et savoir quels modèles tournent le mieux.",
  },
];

export default function Modules() {
  return (
    <section id="modules">
      <div className="section-head">
        <span className="kicker">Le programme</span>
        <h2>Ce que tu apprends</h2>
        <p>
          Quatre modules courts et concrets, centrés sur la vente — pas sur
          la théorie.
        </p>
      </div>
      <div className="modules-grid">
        {MODULES.map((m) => (
          <div className="module-card" key={m.title}>
            <div className="module-num">{m.num}</div>
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
