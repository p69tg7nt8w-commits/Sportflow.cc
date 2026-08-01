const STEPS = [
  { num: "01", title: "Repérer", text: "Identifier une paire au bon prix, au bon état." },
  { num: "02", title: "Préparer", text: "Nettoyer, vérifier, photographier." },
  { num: "03", title: "Publier", text: "Annonce claire, prix juste, bon canal." },
  { num: "04", title: "Vendre", text: "Répondre vite, négocier, conclure." },
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="section-head">
        <span className="kicker">La méthode en un coup d&apos;œil</span>
        <h2>De l&apos;achat à l&apos;argent sur le compte</h2>
      </div>
      <div className="process-grid">
        {STEPS.map((s) => (
          <div className="step" key={s.num}>
            <span className="num">{s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
