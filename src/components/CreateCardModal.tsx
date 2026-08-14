import React, { useState } from 'react';
import { CardItem, CardCategory, CardDifficulty } from '../types';
import { sound } from '../utils/sound';
import { X, Sparkles, Plus, BookOpen, Compass } from 'lucide-react';

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: CardItem) => void;
}

export const CreateCardModal: React.FC<CreateCardModalProps> = ({ isOpen, onClose, onAddCard }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CardCategory>('aproximacion');
  const [difficulty, setDifficulty] = useState<CardDifficulty>('Medio');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [numericAnswer, setNumericAnswer] = useState('');
  const [unit, setUnit] = useState('');
  const [seqA, setSeqA] = useState('');
  const [seqB, setSeqB] = useState('');
  const [seqC, setSeqC] = useState('');
  const [seqD, setSeqD] = useState('');
  const [correctOrder, setCorrectOrder] = useState('C-D-A-B');
  const [explanation, setExplanation] = useState('');
  const [historicalContext, setHistoricalContext] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiPromptTopic, setAiPromptTopic] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playVictory();

    const newNumberId = Math.floor(Math.random() * 900) + 100;
    const isCategory1 = category === 'aproximacion';

    const newCard: CardItem = {
      id: `custom-card-${Date.now()}`,
      numberId: newNumberId,
      title: title || 'Nuevo Hito Sanmartiniano',
      category,
      categoryName: isCategory1 ? '🎲 Las Vegas / El Erudito' : '⏳ Secuencias (Carrera del Tiempo)',
      difficulty,
      points: difficulty === 'Fácil' ? 100 : difficulty === 'Medio' ? 200 : difficulty === 'Desafío' ? 300 : 400,
      question,
      answer: isCategory1 ? `${numericAnswer} ${unit}` : answer || correctOrder,
      numericAnswer: isCategory1 ? parseFloat(numericAnswer) || 0 : undefined,
      unit: isCategory1 ? unit || 'unidades' : undefined,
      sequenceItems: !isCategory1
        ? [
            { id: 'sa', letter: 'A', text: seqA || 'Evento A' },
            { id: 'sb', letter: 'B', text: seqB || 'Evento B' },
            { id: 'sc', letter: 'C', text: seqC || 'Evento C' },
            { id: 'sd', letter: 'D', text: seqD || 'Evento D' }
          ]
        : undefined,
      correctSequenceOrder: !isCategory1 ? correctOrder.split('-').map((s) => s.trim()) : undefined,
      explanation: explanation || 'Pregunta creada por el usuario para el mazo didáctico.',
      historicalContext: historicalContext || 'Gesta Emancipadora de San Martín.',
      imageUrl: '/src/assets/images/andes_crossing_1785763117351.jpg',
      tags: ['Personalizada', 'San Martín', 'Cruce de los Andes'],
      characteristics: {
        difficultyLevel: difficulty === 'Fácil' ? 1 : difficulty === 'Medio' ? 2 : difficulty === 'Desafío' ? 3 : 4,
        points: difficulty === 'Fácil' ? 100 : difficulty === 'Medio' ? 200 : difficulty === 'Desafío' ? 300 : 400,
        tacticalValue: 'Iniciativa',
        yearOrEpoch: '1817'
      }
    };

    onAddCard(newCard);
    onClose();
  };

  const handleGenerateAI = async () => {
    if (!aiPromptTopic) return;
    setIsGeneratingAI(true);
    sound.playClick();

    try {
      const res = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiPromptTopic, category })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.card) {
          setTitle(data.card.title || '');
          setQuestion(data.card.question || '');
          setAnswer(data.card.answer || '');
          if (data.card.numericAnswer) setNumericAnswer(String(data.card.numericAnswer));
          if (data.card.unit) setUnit(data.card.unit);
          if (data.card.explanation) setExplanation(data.card.explanation);
          if (data.card.historicalContext) setHistoricalContext(data.card.historicalContext);
        }
      }
    } catch (err) {
      console.log('AI Generation error fallback:', err);
      // Client fallback mock helper if offline
      setTitle(`Hito sobre ${aiPromptTopic}`);
      setQuestion(`¿Cuál fue un acontecimiento fundamental vinculado a ${aiPromptTopic} durante la gesta de San Martín?`);
      setAnswer('Acontecimiento histórico trascendental de 1817.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-amber-600/40 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-amber-100 text-xl">
              Crear Nueva Carta Didáctica
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Auto-generate banner */}
        <div className="p-3.5 bg-amber-950/40 border border-amber-500/30 rounded-xl space-y-2">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Generador Inteligente con IA (Gemini):
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ej: Fray Luis Beltrán, Batalla de Maipú, Caballo blanco..."
              value={aiPromptTopic}
              onChange={(e) => setAiPromptTopic(e.target.value)}
              className="flex-1 bg-stone-950 border border-amber-900/40 rounded-lg px-3 py-1.5 text-stone-100 text-xs"
            />
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGeneratingAI || !aiPromptTopic}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs disabled:opacity-50"
            >
              {isGeneratingAI ? 'Generando...' : 'Autocompletar Carta'}
            </button>
          </div>
        </div>

        {/* Manual Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-stone-400 font-semibold mb-1 block">Título de la Carta</label>
              <input
                type="text"
                required
                placeholder="Ej: El Cruce del Paso de Uspallata"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-stone-400 font-semibold mb-1 block">Categoría de Juego</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CardCategory)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
              >
                <option value="aproximacion">🎲 Las Vegas / El Erudito (Aproximación)</option>
                <option value="secuencia">⏳ Secuencias (Carrera del Tiempo)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-stone-400 font-semibold mb-1 block">Dificultad</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as CardDifficulty)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
              >
                <option value="Fácil">Fácil (100 pts)</option>
                <option value="Medio">Medio (200 pts)</option>
                <option value="Desafío">Desafío (300 pts)</option>
                <option value="Erudito">Erudito (400 pts)</option>
              </select>
            </div>

            {category === 'aproximacion' ? (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-400 font-semibold mb-1 block">Número Respuesta</label>
                  <input
                    type="number"
                    placeholder="Ej: 5000"
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-stone-400 font-semibold mb-1 block">Unidad</label>
                  <input
                    type="text"
                    placeholder="Ej: fusiles"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-stone-400 font-semibold mb-1 block">Orden Correcto (Ej: C-D-A-B)</label>
                <input
                  type="text"
                  placeholder="C-D-A-B"
                  value={correctOrder}
                  onChange={(e) => setCorrectOrder(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 uppercase"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-stone-400 font-semibold mb-1 block">Pregunta de la Carta</label>
            <textarea
              required
              rows={2}
              placeholder="Escriba la pregunta completa..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {category === 'secuencia' && (
            <div className="space-y-2 bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-amber-400 font-semibold block">Opciones a ordenar:</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Opción A..."
                  value={seqA}
                  onChange={(e) => setSeqA(e.target.value)}
                  className="bg-stone-900 border border-stone-800 p-2 rounded text-stone-100"
                />
                <input
                  type="text"
                  placeholder="Opción B..."
                  value={seqB}
                  onChange={(e) => setSeqB(e.target.value)}
                  className="bg-stone-900 border border-stone-800 p-2 rounded text-stone-100"
                />
                <input
                  type="text"
                  placeholder="Opción C..."
                  value={seqC}
                  onChange={(e) => setSeqC(e.target.value)}
                  className="bg-stone-900 border border-stone-800 p-2 rounded text-stone-100"
                />
                <input
                  type="text"
                  placeholder="Opción D..."
                  value={seqD}
                  onChange={(e) => setSeqD(e.target.value)}
                  className="bg-stone-900 border border-stone-800 p-2 rounded text-stone-100"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-stone-400 font-semibold mb-1 block">Explicación Histórica Reverso</label>
            <textarea
              rows={2}
              placeholder="Detalle histórico explicativo..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1.5 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Guardar Carta en el Mazo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
