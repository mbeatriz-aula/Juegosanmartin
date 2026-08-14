import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// API endpoint to generate custom trivia card using Gemini AI
app.post('/api/generate-card', async (req, res) => {
  try {
    const { topic, category } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY environment variable not configured.'
      });
    }

    const isAproximacion = category === 'aproximacion';

    const prompt = `Crea una carta didáctica para el juego de cartas "Cruce de los Andes de San Martín".
Tema solicitado: "${topic}".
Categoría: ${isAproximacion ? 'Aproximación numérica (Las Vegas)' : 'Secuencia cronológica (Carrera del tiempo)'}.

Devuelve ÚNICAMENTE un objeto JSON válido con esta estructura:
{
  "title": "Título corto histórico (máx 5 palabras)",
  "question": "Pregunta detallada para la carta",
  "answer": "Respuesta correcta corta e impactante",
  ${isAproximacion ? '"numericAnswer": 1817, "unit": "fusiles",' : ''}
  "explanation": "Explicación histórica rigurosa de 2 o 3 oraciones",
  "historicalContext": "Un dato curiosodidáctico que empiece con ¿Sabías que...?"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '';
    const parsed = JSON.parse(text);

    return res.json({ card: parsed });
  } catch (err: unknown) {
    console.error('Error generating card:', err);
    return res.status(500).json({ error: 'Error generating card with Gemini AI' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
