export default function Nav() {
  return (
    <nav>
      <div className="logo">
        RIDGE<span>·</span>
      </div>
      <div className="navlinks">
        <a href="#modules">Programme</a>
        <a href="#process">Méthode</a>
        <a href="#offre">Accès</a>
      </div>
      <a href="#offre" className="nav-cta">
        Rejoindre
      </a>
    </nav>
  );
}
