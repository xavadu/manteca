import React from "react";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultado("");
    try {
      const res = await fetch("/api/batir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResultado(data.resultado);
    } catch (err) {
      setResultado("Error analizando la URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🧈 Manteca</h1>
      <p>
        Decinos qué artículo viste, y te decimos si es manteca o puro verso.
      </p>
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          type="url"
          placeholder="Pegá el link acá"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ padding: 10, width: 400 }}
        />
        <button type="submit" style={{ marginLeft: 10, padding: "10px 20px" }}>
          Analizar
        </button>
      </form>
      {loading && <p>Analizando...</p>}
      {resultado && (
        <div style={{ marginTop: 20, fontWeight: "bold" }}>
          Resultado: {resultado}
        </div>
      )}
    </main>
  );
}
