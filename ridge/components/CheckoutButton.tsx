"use client";

import { useState } from "react";

export default function CheckoutButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Impossible de démarrer le paiement.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <>
      <button className={className} onClick={handleClick} disabled={loading}>
        {loading ? "Redirection…" : children}
      </button>
      {error && <div className="offer-error">{error}</div>}
    </>
  );
}
