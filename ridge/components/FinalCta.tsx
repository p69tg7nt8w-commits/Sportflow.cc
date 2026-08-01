import CheckoutButton from "./CheckoutButton";

export default function FinalCta() {
  return (
    <section className="final">
      <span className="kicker">Prêt à commencer</span>
      <h2>
        Ta première vente
        <br />
        peut se faire <span className="grad">ce mois-ci</span>.
      </h2>
      <p>Programme accessible immédiatement après paiement.</p>
      <div className="hero-ctas" style={{ marginTop: 30 }}>
        <CheckoutButton className="btn-solid">Accéder à la formation</CheckoutButton>
      </div>
    </section>
  );
}
