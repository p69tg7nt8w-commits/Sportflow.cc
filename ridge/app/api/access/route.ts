import { NextRequest, NextResponse } from "next/server";
import { sendAccessEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }

    await sendAccessEmail(email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send access email:", err);
    return NextResponse.json(
      { error: "Impossible d'envoyer l'accès pour le moment. Réessaie dans un instant." },
      { status: 500 }
    );
  }
}
