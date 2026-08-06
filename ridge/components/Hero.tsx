export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-inner">
        <div>
          <span className="eyebrow">Formation · Revente hors-piste</span>
          <h1 className="hero-title">
            Apprends à
            <br />
            <span className="grad">vendre</span> du matos
            <br />
            freeride avec marge.
          </h1>
          <p className="hero-sub">
            Trouver une paire pas chère, c&apos;est la partie facile. La vraie
            compétence, c&apos;est de savoir la présenter, la pricer, et la
            vendre vite — sans la brader. C&apos;est exactement ce qu&apos;on
            t&apos;apprend.
          </p>
          <div className="hero-ctas">
            <a href="#offre" className="btn-solid">
              Accéder à la formation
            </a>
            <a href="#modules" className="btn-outline">
              Voir le programme
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <b>4 modules</b>
              <span>Contenu vidéo + fiches</span>
            </div>
            <div className="stat">
              <b>Accès immédiat</b>
              <span>Gratuit, par email</span>
            </div>
          </div>
        </div>
        <div className="ski-stage">
          <div className="ski ski-a">
            <div className="ski-pattern"></div>
          </div>
          <div className="ski ski-b">
            <div className="ski-chevron"></div>
          </div>
          <div className="ski ski-c">
            <div className="ski-pattern"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
