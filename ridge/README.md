# Ridge — Formation revente skis hors-piste

Landing page Next.js (App Router, TypeScript) pour distribuer la formation
en ligne "Revente Hors-Piste" : le visiteur laisse son email et reçoit
l'accès à la formation automatiquement, gratuitement.

## Stack

- **Next.js 16** (App Router, React Server Components)
- **TypeScript**
- **Resend** pour l'envoi transactionnel de l'email d'accès
- Polices **Space Grotesk** / **Inter** self-hébergées via `next/font` (pas
  de requête vers Google Fonts au runtime)

## Structure

```
ridge/
  app/
    page.tsx              landing page
    api/access/route.ts    reçoit l'email et envoie l'accès
    globals.css             identité visuelle (couleurs, layout, responsive)
  components/               Nav, Hero, Marquee, Modules, Process, Offer, FinalCta, Footer
                             AccessForm (formulaire email, client component)
  lib/
    email.ts                template + envoi de l'email d'accès (Resend)
    offer.ts                nom de l'offre
```

## Configuration locale

```bash
cp .env.example .env.local
npm install
npm run dev
```

Variables d'environnement (voir `.env.example`) :

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique du site |
| `OFFER_NAME` | Nom de la formation (affiché sur la carte d'offre et dans l'email) |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'email |
| `EMAIL_FROM` | Adresse d'expédition (domaine vérifié sur Resend) |
| `COURSE_ACCESS_URL` | Lien envoyé au visiteur (Notion, Drive, espace membre...) donnant accès au contenu |

## Flux d'accès

1. Le visiteur saisit son email dans le formulaire (`AccessForm`, dans la
   carte d'offre) et clique sur "Accéder maintenant".
2. Le formulaire appelle `POST /api/access` avec l'email.
3. La route valide l'adresse et envoie immédiatement l'email d'accès via
   Resend (`lib/email.ts`), contenant le lien vers le contenu
   (`COURSE_ACCESS_URL`).
4. Le formulaire affiche une confirmation inline ("vérifie ta boîte
   mail"), sans redirection ni paiement.

Les CTA du hero et de la section finale renvoient (ancre `#offre`) vers ce
même formulaire, pour n'avoir qu'un seul point de conversion sur la page.

## Configuration Resend

1. Créer un compte sur [resend.com](https://resend.com), vérifier un
   domaine d'envoi.
2. Générer une clé API → `RESEND_API_KEY`.
3. `EMAIL_FROM` doit utiliser ce domaine vérifié (ex.
   `Ridge <access@tondomaine.com>`).

## Déploiement sur Vercel

Ce dossier `ridge/` fait partie d'un monorepo (le reste du dépôt sert un
autre site statique). Sur Vercel :

1. **New Project** → importer ce dépôt GitHub.
2. **Root Directory** : sélectionner `ridge`.
3. Ajouter les variables de `.env.example` dans **Settings → Environment
   Variables** (Production + Preview).
4. Déployer. Vercel détecte Next.js automatiquement (`next build`).

## Performance

- Fonts self-hébergées via `next/font` (`display: swap`, pas de CDN externe).
- Composants React Server par défaut ; seul `AccessForm` est un client
  component (interaction minimale).
- Pages statiques quand possible (`/` est prérendue), route API en
  serverless function.
- `next.config.mjs` active la compression et les formats d'image
  modernes (AVIF/WebP) pour toute image ajoutée via `next/image`.
- Compression Brotli/Gzip gérée automatiquement par Vercel en prod.

## Tests effectués

- `npm run build` : build de production sans erreur.
- Vérification visuelle desktop (1440px) et mobile (390px, iPhone) via
  Playwright/Chromium : layout identique au design source, responsive OK.
- Flux d'erreur du formulaire testé (sans clé Resend) : message d'erreur
  affiché proprement dans l'UI, aucun crash.
- L'envoi réel de l'email nécessite une clé Resend valide et un domaine
  d'expédition vérifié ; à valider une fois déployé.
