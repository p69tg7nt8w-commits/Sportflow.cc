import AccessForm from "./AccessForm";
import { OFFER_NAME } from "@/lib/offer";

export default function Offer() {
  return (
    <section id="offre">
      <div className="offer">
        <div>
          <span className="kicker">L&apos;accès</span>
          <h2>Une formation complète, gratuite.</h2>
          <ul className="offer-list">
            <li>4 modules vidéo + fiches récap téléchargeables</li>
            <li>Méthode de pricing appliquée au ski hors-piste récent</li>
            <li>Templates d&apos;annonces prêts à copier-coller</li>
            <li>Accès à vie, mises à jour incluses</li>
          </ul>
        </div>
        <div className="offer-card">
          <span className="tag">Accès complet</span>
          <h3>{OFFER_NAME}</h3>
          <AccessForm />
          <div className="offer-note">Gratuit · accès immédiat par email</div>
        </div>
      </div>
    </section>
  );
}
