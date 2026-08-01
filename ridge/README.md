# Ridge — Formation revente skis hors-piste

Landing page Next.js (App Router, TypeScript) pour vendre la formation en
ligne "Revente Hors-Piste", avec paiement Stripe Checkout et envoi
automatique de l'accès par email.

## Stack

- **Next.js 16** (App Router, React Server Components)
- **TypeScript**
- **Stripe Checkout** (paiement unique) + **webhook** pour confirmer le paiement
- **Resend** pour l'envoi transactionnel de l'email d'accès
- Polices **Space Grotesk** / **Inter** self-hébergées via `next/font` (pas
  de requête vers Google Fonts au runtime)

## Structure

```
ridge/
  app/
    page.tsx              landing page
    success/page.tsx       page de confirmation post-paiement
    api/checkout/route.ts  crée la session Stripe Checkout
    api/webhook/route.ts   webhook Stripe -> envoi de l'email d'accès
    globals.css             identité visuelle (couleurs, layout, responsive)
  components/               Nav, Hero, Marquee, Modules, Process, Offer, FinalCta, Footer
  lib/
    stripe.ts               client Stripe
    email.ts                template + envoi de l'email d'accès (Resend)
    offer.ts                prix/nom de l'offre (source unique, lue par l'UI et le checkout)
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
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (utilisée dans les `success_url`/`cancel_url` Stripe) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (`sk_test_...` / `sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature du webhook (`whsec_...`) |
| `OFFER_NAME`, `OFFER_PRICE_CENTS`, `OFFER_COMPARE_AT_CENTS`, `OFFER_CURRENCY` | Prix affiché et facturé (source unique) |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'email |
| `EMAIL_FROM` | Adresse d'expédition (domaine vérifié sur Resend) |
| `COURSE_ACCESS_URL` | Lien envoyé au client (Notion, Drive, espace membre...) donnant accès au contenu |

## Flux de paiement

1. Le visiteur clique sur un CTA ("Accéder à la formation" / "Accéder
   maintenant") → `CheckoutButton` appelle `POST /api/checkout`.
2. La route crée une session Stripe Checkout (`mode: payment`) et renvoie
   son `url` ; le navigateur y est redirigé.
3. Après paiement, Stripe redirige vers `/success?session_id=...`, qui
   vérifie le statut du paiement et affiche une confirmation.
4. En parallèle (et indépendamment du retour navigateur), Stripe appelle
   `POST /api/webhook` avec l'événement `checkout.session.completed`. C'est
   ce webhook — pas la page `/success` — qui envoie l'email d'accès via
   Resend, pour garantir la livraison même si l'utilisateur ferme l'onglet
   avant la redirection.

## Configuration Stripe

1. Créer un compte Stripe, récupérer la clé secrète (mode test puis live).
2. Dans **Developers → Webhooks**, ajouter un endpoint :
   `https://<votre-domaine>/api/webhook`, événement `checkout.session.completed`.
   Copier le signing secret dans `STRIPE_WEBHOOK_SECRET`.
3. Le prix est généré dynamiquement (`price_data`) à partir de
   `OFFER_PRICE_CENTS` — aucun produit/prix à créer manuellement dans le
   dashboard.

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
3. Ajouter toutes les variables de `.env.example` dans **Settings →
   Environment Variables** (Production + Preview).
4. Déployer. Vercel détecte Next.js automatiquement (`next build`).
5. Une fois le domaine de prod connu, mettre à jour `NEXT_PUBLIC_SITE_URL`
   puis redéployer, et pointer le webhook Stripe vers ce domaine.

## Performance

- Fonts self-hébergées via `next/font` (`display: swap`, pas de CDN externe).
- Composants React Server par défaut ; seul `CheckoutButton` est un client
  component (interaction minimale).
- Pages statiques quand possible (`/` est prérendue), routes API en
  serverless functions.
- `next.config.mjs` active la compression et les formats d'image
  modernes (AVIF/WebP) pour toute image ajoutée via `next/image`.
- Compression Brotli/Gzip gérée automatiquement par Vercel en prod.

## Tests effectués

- `npm run build` : build de production sans erreur.
- Vérification visuelle desktop (1440px) et mobile (390px, iPhone) via
  Playwright/Chromium : layout identique au design source, responsive OK.
- Flux d'erreur du bouton de paiement testé (clé Stripe invalide) : message
  d'erreur affiché proprement dans l'UI, aucun crash.
- Le flux complet (paiement réel → webhook → email) nécessite des clés
  Stripe/Resend valides et n'a pas pu être testé de bout en bout dans cet
  environnement (accès réseau sortant restreint) ; à valider en mode test
  Stripe une fois déployé.
