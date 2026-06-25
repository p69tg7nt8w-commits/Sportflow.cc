require('dotenv').config();
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es le narrateur d'un jeu d'aventure textuel d'urbex (urban exploration). Le joueur explore un lieu abandonné en Belgique, la nuit.

Règles absolues :
- Réponds TOUJOURS en français
- Maximum 4-5 phrases par réponse, denses et immersives
- Descriptions sensorielles riches : visuelles, sonores, olfactives, tactiles
- Tension progressive et atmosphère oppressante, jamais gore ni violent
- Style cinématographique, poétique, inquiétant mais fascinant
- Lieux typiques belges : usine désaffectée, château abandonné, hôpital psychiatrique, gare fermée, école en ruines
- Varie les découvertes : objets oubliés, traces du passé, bruits inexpliqués, jeux de lumière nocturne
- Termine CHAQUE réponse par exactement 3 options numérotées sur des lignes séparées, format STRICT :
[1] action courte
[2] action courte
[3] action courte

Les options doivent être 3 à 6 mots maximum, cohérentes avec le contexte immédiat.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content[0].text;
    res.json({ text });
  } catch (error) {
    console.error('Anthropic API error:', error.message);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n  URBEX.AI — http://localhost:${PORT}\n`);
});
