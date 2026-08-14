import React, { useState } from 'react';
import { CardItem, Team } from '../types';
import { sound } from '../utils/sound';
import {
  Shuffle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Clock,
  Dices,
  HelpCircle,
  CheckSquare,
  Eye,
  EyeOff,
  RotateCcw,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface GameModeMixtoProps {
  cards: CardItem[];
  teams: Team[];
  onUpdateTeams: (teams: Team[]) => void;
}

export const GameModeMixto: React.FC<GameModeMixtoProps> = ({
  cards,
}) => {
  const [deck, setDeck] = useState<CardItem[]>(() =>
    [...cards].sort(() => Math.random() - 0.5)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const activeCard = deck[currentIndex] || deck[0];
  const category = activeCard?.category || 'aproximacion';
  const sequenceItems = activeCard?.sequenceItems || [];
  const options = activeCard?.options || [];

  // Shuffle deck
  const handleShuffleDeck = () => {
    sound.playClick();
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
    setIsReviewMode(false);
  };

  const handleNextQuestion = () => {
    sound.playClick();
    setShowAnswer(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsReviewMode(true);
    }
  };

  const handlePrevQuestion = () => {
    sound.playClick();
    setShowAnswer(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleShowAnswer = () => {
    sound.playClick();
    setShowAnswer(!showAnswer);
  };

  if (!activeCard) {
    return (
      <div className="bg-white border-2 border-[#2d2a26] p-8 text-center shadow-bento">
        <p className="text-lg font-bold text-[#2d2a26]">No hay preguntas en el mazo mixto.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#f3efe6] border-2 border-[#2d2a26] p-5 shadow-bento flex flex-col md:flex-row md:items-center justify-between gap-4 text-[#2d2a26]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#d62828] text-white font-sans font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 border border-[#2d2a26] flex items-center gap-1">
              <Shuffle className="w-3.5 h-3.5 text-amber-300" />
              MODO MIXTO ALEATORIO
            </span>
            <span className="text-[#2d2a26] text-xs uppercase font-bold tracking-wider opacity-75">
              Sin carga de respuestas
            </span>
          </div>
          <h2 className="text-2xl font-serif font-black uppercase text-[#2d2a26]">
            Presentación en Vivo de Preguntas
          </h2>
          <p className="text-[#2d2a26] text-sm mt-1 max-w-2xl font-medium">
            Muestre las preguntas y sus opciones durante el juego. La revisión final de respuestas se realiza al terminar el mazo o en el panel de revisión general.
          </p>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleShuffleDeck}
            className="px-3 py-1.5 bg-white hover:bg-[#e8e4d8] text-[#2d2a26] border-2 border-[#2d2a26] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-bento-sm active:translate-y-0.5"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#d62828]" />
            Re-Mezclar Mazo
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsReviewMode(!isReviewMode);
            }}
            className={`px-3 py-1.5 border-2 border-[#2d2a26] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-bento-sm transition-all ${
              isReviewMode
                ? 'bg-[#1d3557] text-white'
                : 'bg-white hover:bg-[#e8e4d8] text-[#2d2a26]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {isReviewMode ? 'Volver a Preguntas' : 'Revisión Final'}
          </button>
        </div>
      </div>

      {/* Mode View Switch: Question Presentation vs Full Review */}
      {isReviewMode ? (
        /* REVISIÓN FINAL DE TODO EL MAZO */
        <div className="bg-[#f3efe6] border-2 border-[#2d2a26] p-6 shadow-bento space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#2d2a26] pb-4">
            <div>
              <span className="text-xs font-bold text-[#d62828] uppercase tracking-widest block">
                Etapa Final del Juego
              </span>
              <h3 className="text-2xl font-serif font-black text-[#2d2a26] uppercase">
                Revisión General de Respuestas
              </h3>
            </div>
            <button
              onClick={handleShuffleDeck}
              className="px-4 py-2 bg-[#2a9d8f] hover:bg-[#1d3557] text-white font-extrabold text-xs uppercase tracking-wider border-2 border-[#2d2a26] shadow-bento-sm flex items-center gap-2 self-start sm:self-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar Mazo Aleatorio
            </button>
          </div>

          <div className="space-y-4">
            {deck.map((card, idx) => (
              <div
                key={card.id}
                className="bg-white border-2 border-[#2d2a26] p-5 shadow-bento space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2d2a26]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#1d3557] text-white font-mono font-black text-xs flex items-center justify-center border border-[#2d2a26]">
                      #{idx + 1}
                    </span>
                    <span className="font-serif font-black text-lg uppercase text-[#2d2a26]">
                      {card.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#e8e4d8] border border-[#2d2a26]">
                    {card.categoryName}
                  </span>
                </div>

                <p className="text-sm font-semibold text-[#2d2a26] leading-relaxed">
                  "{card.question}"
                </p>

                {/* Show options if sequence or multiple choice */}
                {card.category === 'secuencia' && card.sequenceItems && (
                  <div className="bg-[#fdfaf5] p-3 border border-[#2d2a26] text-xs space-y-1">
                    <span className="font-bold text-[#1d3557] uppercase text-[10px] block">
                      Opciones presentadas:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {card.sequenceItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <span className="font-black text-[#d62828]">{item.letter}:</span>
                          <span className="font-medium text-[#2d2a26]">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {card.category === 'multiplechoice' && card.options && (
                  <div className="bg-[#fdfaf5] p-3 border border-[#2d2a26] text-xs space-y-1">
                    <span className="font-bold text-[#1d3557] uppercase text-[10px] block">
                      Opciones de respuesta:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {card.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-1.5">
                          <span className="font-bold text-[#2d2a26]">{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Official Answer & Explanation Box */}
                <div className="bg-[#1d3557] text-white p-4 border-2 border-[#2d2a26] space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-xs uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Respuesta Oficial:</span>
                    <span className="text-white text-sm font-black">{card.answer}</span>
                  </div>
                  {card.explanation && (
                    <p className="text-xs text-white/90 italic font-serif leading-relaxed pt-1">
                      {card.explanation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* PRESENTACIÓN INDIVIDUAL DE PREGUNTAS */
        <div className="space-y-6">
          {/* Card Progress & Quick Nav Bar */}
          <div className="bg-white border-2 border-[#2d2a26] p-4 shadow-bento flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#1d3557] text-white font-mono font-black text-sm px-3 py-1 border border-[#2d2a26]">
                Pregunta {currentIndex + 1} / {deck.length}
              </span>
              <span className="text-xs font-bold text-[#2d2a26] uppercase tracking-wider">
                {activeCard.categoryName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevQuestion}
                disabled={currentIndex === 0}
                className="px-3 py-1.5 bg-[#f3efe6] hover:bg-[#2d2a26] hover:text-white disabled:opacity-40 border-2 border-[#2d2a26] text-xs font-extrabold uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>

              <button
                onClick={handleNextQuestion}
                className="px-4 py-1.5 bg-[#d62828] hover:bg-[#1d3557] text-white border-2 border-[#2d2a26] text-xs font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-bento-sm transition-colors"
              >
                {currentIndex === deck.length - 1 ? (
                  <>
                    Ir a Revisión Final <BookOpen className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Siguiente Pregunta <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Question Display Box */}
          <div className="bg-white border-2 border-[#2d2a26] p-6 shadow-bento space-y-6 text-[#2d2a26]">
            {/* Top Card Badge Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2d2a26] pb-4">
              <div className="flex items-center gap-2">
                <span className="uppercase font-mono font-bold text-xs tracking-widest bg-[#e8e4d8] px-2.5 py-1 border border-[#2d2a26] flex items-center gap-1.5">
                  {category === 'aproximacion' && <Dices className="w-4 h-4 text-[#1d3557]" />}
                  {category === 'secuencia' && <Clock className="w-4 h-4 text-[#1d3557]" />}
                  {category === 'verdaderofalso' && <CheckSquare className="w-4 h-4 text-[#2a9d8f]" />}
                  {category === 'multiplechoice' && <HelpCircle className="w-4 h-4 text-[#9c6644]" />}
                  Nº {activeCard.numberId} • {category.toUpperCase()}
                </span>
                <span className="bg-[#1d3557] text-white text-xs font-bold px-2.5 py-1 uppercase border border-[#2d2a26]">
                  Dificultad: {activeCard.difficulty} ({activeCard.points} Pts)
                </span>
              </div>

              {activeCard.characteristics?.yearOrEpoch && category !== 'secuencia' && (
                <span className="text-xs font-mono font-bold text-[#1d3557] bg-[#f3efe6] px-2.5 py-1 border border-[#2d2a26]">
                  Época: {activeCard.characteristics.yearOrEpoch}
                </span>
              )}
            </div>

            {/* Question Title & Image Banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 relative h-52 border-2 border-[#2d2a26] overflow-hidden bg-[#2d2a26] shadow-bento-sm">
                <img
                  src={activeCard.imageUrl}
                  alt={activeCard.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a26]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 font-serif font-black text-lg text-white uppercase tracking-tight drop-shadow">
                  {activeCard.title}
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <div className="bg-[#f3efe6] p-5 border-2 border-[#2d2a26] shadow-bento-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1d3557] block mb-1">
                    Pregunta / Consigna:
                  </span>
                  <p className="text-xl sm:text-2xl font-sans font-bold text-[#2d2a26] leading-snug">
                    "{activeCard.question}"
                  </p>
                </div>

                {activeCard.unit && (
                  <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 border-2 border-[#2d2a26] text-xs font-bold text-[#1d3557] shadow-bento-sm">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Unidad de medida requerida:</span>
                    <span className="font-mono text-sm font-black uppercase text-[#d62828]">{activeCard.unit}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Category Options / Content Presentation */}
            <div className="pt-2">
              {category === 'secuencia' && sequenceItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b-2 border-[#2d2a26] pb-2">
                    <Clock className="w-5 h-5 text-[#1d3557]" />
                    <h3 className="font-serif font-black text-lg uppercase text-[#2d2a26]">
                      Opciones a Ordenar (de más antiguo a más reciente):
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sequenceItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-[#fdfaf5] border-2 border-[#2d2a26] shadow-bento-sm flex items-start gap-3"
                      >
                        <span className="w-7 h-7 bg-[#1d3557] text-white font-mono font-black text-sm flex items-center justify-center border border-[#2d2a26] shrink-0">
                          {item.letter}
                        </span>
                        <div>
                          <p className="font-bold text-sm text-[#2d2a26]">{item.text}</p>
                          {item.detail && (
                            <p className="text-xs text-[#2d2a26]/70 mt-0.5">{item.detail}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {category === 'multiplechoice' && options.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b-2 border-[#2d2a26] pb-2">
                    <HelpCircle className="w-5 h-5 text-[#9c6644]" />
                    <h3 className="font-serif font-black text-lg uppercase text-[#2d2a26]">
                      Opciones de Respuesta:
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {options.map((opt, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-[#fdfaf5] border-2 border-[#2d2a26] shadow-bento-sm flex items-center gap-3"
                      >
                        <span className="w-7 h-7 bg-[#9c6644] text-white font-mono font-black text-sm flex items-center justify-center border border-[#2d2a26] shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-bold text-sm text-[#2d2a26]">{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {category === 'verdaderofalso' && (
                <div className="bg-[#fdfaf5] p-5 border-2 border-[#2d2a26] shadow-bento-sm space-y-2 text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2a9d8f] block">
                    Consigna de Evaluación
                  </span>
                  <p className="font-serif font-black text-xl uppercase text-[#2d2a26]">
                    ¿Es la afirmación anterior VERDADERA o FALSA?
                  </p>
                </div>
              )}

              {category === 'aproximacion' && (
                <div className="bg-[#fdfaf5] p-5 border-2 border-[#2d2a26] shadow-bento-sm space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1d3557] block">
                    Consigna de Estimación Numérica
                  </span>
                  <p className="font-medium text-sm text-[#2d2a26]">
                    Los participantes deben estimar la cifra numérica más cercana expresada en{' '}
                    <strong className="text-[#d62828] uppercase">{activeCard.unit || 'unidades'}</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Optional Individual Answer Toggle */}
            <div className="pt-4 border-t-2 border-[#2d2a26] space-y-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleShowAnswer}
                  className="px-4 py-2 bg-[#f3efe6] hover:bg-[#2d2a26] hover:text-white text-[#2d2a26] border-2 border-[#2d2a26] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-bento-sm"
                >
                  {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showAnswer ? 'Ocultar Respuesta Individual' : 'Revelar Respuesta Individual (Solo Moderador)'}</span>
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-[#2a9d8f] hover:bg-[#1d3557] text-white font-extrabold text-xs uppercase tracking-widest border-2 border-[#2d2a26] shadow-bento flex items-center gap-2 transition-all"
                >
                  {currentIndex === deck.length - 1 ? 'Revisión Final Mazo' : 'Siguiente Pregunta'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {showAnswer && (
                <div className="bg-[#1d3557] text-white p-5 border-2 border-[#2d2a26] shadow-bento space-y-2 animate-fade-in">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-amber-300 block">
                    Respuesta Oficial
                  </span>
                  <div className="text-xl sm:text-2xl font-sans font-black tracking-wide text-white">
                    {activeCard.answer}
                  </div>
                  {activeCard.explanation && (
                    <p className="text-xs text-white/90 italic font-serif leading-relaxed pt-1 border-t border-white/20 mt-2">
                      {activeCard.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
