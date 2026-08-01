import CheckoutButton from "./CheckoutButton";
import { OFFER, formatPrice } from "@/lib/offer";

export default function Offer() {
  return (
    <section id="offre">
      <div className="offer">
        <div>
          <span className="kicker">L&apos;accès</span>
          <h2>Une formation, pas un abonnement.</h2>
          <ul className="offer-list">
            <li>4 modules vidéo + fiches récap téléchargeables</li>
            <li>Méthode de pricing appliquée au ski hors-piste récent</li>
            <li>Templates d&apos;annonces prêts à copier-coller</li>
            <li>Accès à vie, mises à jour incluses</li>
          </ul>
        </div>
        <div className="offer-card">
          <span className="tag">Accès complet</span>
          <h3>{OFFER.name}</h3>
          <div className="offer-price">
            <span className="new">{formatPrice(OFFER.priceCents, OFFER.currency)}</span>
            <span className="old">{formatPrice(OFFER.compareAtCents, OFFER.currency)}</span>
          </div>
          <CheckoutButton className="btn-solid">Accéder maintenant</CheckoutButton>
          <div className="offer-note">Paiement unique · accès immédiat par email</div>
        </div>
      </div>
    </section>
  );
}
