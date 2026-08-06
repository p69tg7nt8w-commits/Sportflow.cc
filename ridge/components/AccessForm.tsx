"use client";

import { useState, FormEvent } from "react";

export default function AccessForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={className}>
        <p className="access-sent">
          C&apos;est parti ! Vérifie ta boîte mail (et tes spams) pour accéder à la formation.
        </p>
      </div>
    );
  }

  return (
    <form className={`access-form ${className || ""}`} onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder="ton@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="access-input"
      />
      <button type="submit" className="btn-solid" disabled={status === "loading"}>
        {status === "loading" ? "Envoi…" : "Accéder maintenant"}
      </button>
      {error && <div className="offer-error">{error}</div>}
    </form>
  );
}
