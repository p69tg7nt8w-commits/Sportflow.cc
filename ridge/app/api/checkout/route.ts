import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { OFFER } from "@/lib/offer";

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: OFFER.currency,
            unit_amount: OFFER.priceCents,
            product_data: {
              name: OFFER.name,
              description:
                "Accès complet : 4 modules vidéo, fiches récap, templates d'annonces. Accès à vie.",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session creation failed:", err);
    return NextResponse.json(
      { error: "Impossible de démarrer le paiement pour le moment." },
      { status: 500 }
    );
  }
}
