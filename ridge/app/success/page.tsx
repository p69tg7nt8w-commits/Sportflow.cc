import type { Metadata } from "next";
import Link from "next/link";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Merci — Ridge",
  robots: { index: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let email: string | null = null;
  let paid = false;

  if (session_id) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paid = session.payment_status === "paid";
      email = session.customer_details?.email ?? session.customer_email ?? null;
    } catch (err) {
      console.error("Failed to retrieve checkout session:", err);
    }
  }

  return (
    <section className="confirm">
      <div className="confirm-card">
        <div className="confirm-icon">{paid ? "🎿" : "⏳"}</div>
        {paid ? (
          <>
            <h1>Paiement confirmé</h1>
            <p>
              Merci pour ton achat. Un email avec ton accès à la formation
              vient de partir
              {email ? (
                <>
                  {" "}
                  à <span className="confirm-email">{email}</span>
                </>
              ) : null}
              .
            </p>
            <p>
              Pense à vérifier tes spams si tu ne le vois pas dans les
              prochaines minutes.
            </p>
          </>
        ) : (
          <>
            <h1>Paiement en cours de vérification</h1>
            <p>
              On confirme ton paiement avec notre prestataire. Si tu ne
              reçois pas ton accès par email d&apos;ici quelques minutes,
              contacte-nous.
            </p>
          </>
        )}
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: 30 }}>
          <Link href="/" className="btn-outline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
