import { Resend } from "resend";

function accessEmailHtml(courseAccessUrl: string) {
  return `
  <div style="background:#0a0c10;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#161a22;border-radius:16px;padding:36px;color:#f5f6f8;">
      <p style="text-transform:uppercase;letter-spacing:1px;font-size:12px;font-weight:700;color:#35d6c4;margin:0 0 16px;">
        Ridge · Formation revente hors-piste
      </p>
      <h1 style="font-size:24px;margin:0 0 16px;color:#f5f6f8;">Ton accès est prêt 🎿</h1>
      <p style="font-size:15px;line-height:1.6;color:#c7cbd4;margin:0 0 24px;">
        Merci pour ton inscription. Tu as maintenant un accès complet et gratuit à
        la formation : les 4 modules vidéo, les fiches récap et les templates d'annonces.
      </p>
      <a href="${courseAccessUrl}"
         style="display:inline-block;background:#f5f6f8;color:#0a0c10;text-decoration:none;
                font-weight:700;padding:14px 26px;border-radius:100px;font-size:15px;">
        Accéder à la formation
      </a>
      <p style="font-size:13px;line-height:1.6;color:#8b93a3;margin:28px 0 0;">
        Garde cet email précieusement, ce lien est ton accès permanent au contenu.
        Une question ? Réponds simplement à cet email.
      </p>
    </div>
  </div>`;
}

export async function sendAccessEmail(to: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const courseAccessUrl = process.env.COURSE_ACCESS_URL;

  if (!apiKey || !from || !courseAccessUrl) {
    throw new Error(
      "RESEND_API_KEY, EMAIL_FROM et COURSE_ACCESS_URL doivent être définis pour envoyer l'email d'accès."
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    subject: "Ton accès à la formation Ridge",
    html: accessEmailHtml(courseAccessUrl),
  });

  if (error) {
    throw new Error(`Resend a refusé l'envoi: ${error.message}`);
  }
}
