import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  resultado: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ resultado: "URL inválida" });
  }

  // Simulación: esto es donde podrías hacer scraping o IA
  const esCierto = Math.random() > 0.5; // simulamos aleatoriamente

  res.status(200).json({
    resultado: esCierto ? "🧈 Esto es manteca pura" : "❌ Esto es verso total",
  });
}
