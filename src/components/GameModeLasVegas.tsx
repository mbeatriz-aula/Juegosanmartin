import React, { useState, useEffect } from 'react';
import { CardItem, Team } from '../types';
import { sound } from '../utils/sound';
import { Trophy, CheckCircle2, ArrowRight, Shield, Sparkles, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';

interface GameModeLasVegasProps {
  cards: CardItem[];
  teams: Team[];
  onUpdateTeams: (teams: Team[]) => void;
}

export const GameModeLasVegas: React.FC<GameModeLasVegasProps> = ({ cards, teams, onUpdateTeams }) => {
  // Category 1 cards
  const [deck, setDeck] = useState<CardItem[]>(() => cards.filter((c) => c.category === 'aproximacion'));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    setDeck(cards.filter((c) => c.category === 'aproximacion'));
  }, [cards]);

  const handleShuffle = () => {
    sound.playClick();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentCardIndex(0);
    setGameState('guess');
    setTeamGuesses({});
    setWinnerInfo(null);
  };

  // Game states: 'guess' | 'reveal'
  const [gameState, setGameState] = useState<'guess' | 'reveal'>('guess');

  // Team guesses: { teamId: string }
  const [teamGuesses, setTeamGuesses] = useState<Record<string, string>>({});

  // Results summary
  const [winnerInfo, setWinnerInfo] = useState<{
    exactAnswer: number;
    teamResults: {
      teamId: string;
      teamName: string;
      guess: number | null;
      status: 'correct' | 'partial' | 'wrong';
      statusText: string;
      pointsGained: number;
    }[];
  } | null>(null);

  const activeCard = deck[currentCardIndex] || deck[0];

  const handleGuessChange = (teamId: string, val: string) => {
    setTeamGuesses((prev) => ({ ...prev, [teamId]: val }));
  };

  const calculateResults = () => {
    if (!activeCard || activeCard.numericAnswer === undefined) return;
    sound.playVictory();

    const exactAnswer = activeCard.numericAnswer;

    // Parse guesses
    const parsedGuesses: { teamId: string; guess: number | null }[] = teams.map((t) => {
      const g = parseFloat(teamGuesses[t.id] || '');
      return { teamId: t.id, guess: !isNaN(g) ? g : null };
    });

    // Find valid numeric guesses to calculate closest
    const validGuesses = parsedGuesses.filter((item): item is { teamId: string; guess: number } => item.guess !== null);

    // Find minimum difference
    let minDiff = Infinity;
    if (validGuesses.length > 0) {
      validGuesses.forEach((item) => {
        const diff = Math.abs(exactAnswer - item.guess);
        if (diff < minDiff) {
          minDiff = diff;
        }
      });
    }

    const teamResultsList: {
      teamId: string;
      teamName: string;
      guess: number | null;
      status: 'correct' | 'partial' | 'wrong';
      statusText: string;
      pointsGained: number;
    }[] = [];

    const updatedTeams = teams.map((t) => {
      const gObj = parsedGuesses.find((item) => item.teamId === t.id);
      const guess = gObj?.guess ?? null;

      let pointsGained = 0;
      let status: 'correct' | 'partial' | 'wrong' = 'wrong';
      let statusText = 'No acertó (0 pts)';

      if (guess !== null) {
        if (guess === exactAnswer) {
          pointsGained = 100;
          status = 'correct';
          statusText = '¡Respuesta Exacta! (+100 pts)';
        } else if (Math.abs(exactAnswer - guess) === minDiff) {
          pointsGained = 50;
          status = 'partial';
          statusText = '¡Aproximación más cercana! (+50 pts)';
        }
      }

      teamResultsList.push({
        teamId: t.id,
        teamName: t.name,
        guess,
        status,
        statusText,
        pointsGained,
      });

      return {
        ...t,
        score: t.score + pointsGained,
      };
    });

    setWinnerInfo({
      exactAnswer,
      teamResults: teamResultsList,
    });

    onUpdateTeams(updatedTeams);
    setGameState('reveal');
  };

  const handleNextQuestion = () => {
    sound.playClick();
    setGameState('guess');
    setTeamGuesses({});
    setWinnerInfo(null);
    setCurrentCardIndex((prev) => (prev + 1) % deck.length);
  };

  if (!activeCard) {
    return (
      <div className="bg-white border-2 border-[#2d2a26] p-8 text-center shadow-bento">
        <p className="text-lg font-bold text-[#2d2a26]">No hay preguntas disponibles en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#f3efe6] border-2 border-[#2d2a26] p-5 shadow-bento flex flex-col md:flex-row md:items-center justify-between gap-4 text-[#2d2a26]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#1d3557] text-white font-sans font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 border border-[#2d2a26]">
              Categoría 1: Las Vegas / Aproximación
            </span>
          </div>
          <h2 className="text-2xl font-serif font-black uppercase text-[#2d2a26]">
            Estimación Numérica
          </h2>
          <p className="text-[#2d2a26] text-sm mt-1 max-w-2xl font-medium">
            Ingresen la estimación numérica. <strong>100 Puntos</strong> si aciertan exacto, <strong>50 Puntos</strong> para la aproximación más cercana y <strong>0 Puntos</strong> si no aciertan.
          </p>
        </div>

        {/* Question Switcher & Shuffle */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleShuffle}
            className="px-3 py-1.5 bg-white hover:bg-[#e8e4d8] text-[#2d2a26] border-2 border-[#2d2a26] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-bento-sm active:translate-y-0.5"
            title="Mezclar el orden de las preguntas"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#1d3557]" />
            Mezclar Orden
          </button>

          <div className="flex items-center gap-2 bg-white p-1.5 border-2 border-[#2d2a26] shadow-bento-sm">
            <span className="text-xs text-[#2d2a26] font-bold uppercase tracking-wider px-2">
              Pregunta {currentCardIndex + 1} de {deck.length}
            </span>
            <button
              onClick={() => setCurrentCardIndex((prev) => (prev - 1 + deck.length) % deck.length)}
              className="px-2.5 py-1 bg-[#f3efe6] hover:bg-[#2d2a26] hover:text-white border border-[#2d2a26] text-[#2d2a26] text-xs font-bold uppercase"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentCardIndex((prev) => (prev + 1) % deck.length)}
              className="px-2.5 py-1 bg-[#f3efe6] hover:bg-[#2d2a26] hover:text-white border border-[#2d2a26] text-[#2d2a26] text-xs font-bold uppercase"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Question Card display */}
        <div className="lg:col-span-5 bg-white border-2 border-[#2d2a26] p-5 shadow-bento flex flex-col justify-between text-[#2d2a26]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#2d2a26] mb-2">
              <span className="uppercase tracking-widest bg-[#e8e4d8] px-2 py-0.5 border border-[#2d2a26]">
                DESAFÍO #{activeCard.numberId}
              </span>
              <span className="bg-[#1d3557] text-white px-2 py-0.5 uppercase border border-[#2d2a26] shadow-bento-sm">
                Max: 100 pts
              </span>
            </div>

            <div className="relative h-48 border-2 border-[#2d2a26] overflow-hidden mb-4 bg-[#2d2a26]">
              <img
                src={activeCard.imageUrl}
                alt={activeCard.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a26]/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 font-serif font-black text-xl text-white uppercase tracking-tight drop-shadow">
                {activeCard.title}
              </div>
            </div>

            <div className="bg-[#f3efe6] p-4 border-2 border-[#2d2a26] text-[#2d2a26] text-base leading-relaxed font-sans font-semibold mb-3">
              "{activeCard.question}"
            </div>

            <div className="text-xs text-white bg-[#1d3557] p-2.5 border-2 border-[#2d2a26] shadow-bento-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <span>
                Expresen la cifra en: <strong className="underline decoration-amber-300 uppercase">{activeCard.unit || 'unidades'}</strong>.
              </span>
            </div>
          </div>
        </div>

        {/* Input & Results Panel */}
        <div className="lg:col-span-7 space-y-4">
          {gameState === 'guess' && (
            <div className="bg-[#f3efe6] border-2 border-[#2d2a26] p-5 shadow-bento space-y-4 text-[#2d2a26]">
              <div className="flex items-center justify-between border-b-2 border-[#2d2a26] pb-3">
                <h3 className="font-serif font-black text-[#2d2a26] text-lg uppercase tracking-tight flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#1d3557]" />
                  Ingreso de Estimaciones
                </h3>
                <span className="text-xs text-[#2d2a26] font-bold uppercase tracking-wider opacity-70">
                  Cada equipo ingresa su cifra
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="p-4 bg-white border-2 border-[#2d2a26] shadow-bento-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{team.avatar}</span>
                        <span className="font-extrabold text-[#2d2a26] text-sm uppercase">{team.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#1d3557]">
                        Puntos actual: {team.score}
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        placeholder={`Ej: ${activeCard.numericAnswer ? Math.round(activeCard.numericAnswer * 0.8) : 100}`}
                        value={teamGuesses[team.id] || ''}
                        onChange={(e) => handleGuessChange(team.id, e.target.value)}
                        className="w-full bg-[#fdfaf5] border-2 border-[#2d2a26] px-3 py-2 text-[#2d2a26] font-mono font-black text-lg focus:outline-none focus:bg-white"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-[#1d3557] uppercase">
                        {activeCard.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={calculateResults}
                className="w-full py-3.5 bg-[#1d3557] hover:bg-[#2d2a26] text-white font-extrabold text-xs uppercase tracking-widest border-2 border-[#2d2a26] shadow-bento transition-all flex items-center justify-center gap-2 active:translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Revelar Respuesta Oficial y Otorgar Puntos
              </button>
            </div>
          )}

          {gameState === 'reveal' && winnerInfo && (
            <div className="bg-[#f3efe6] border-2 border-[#2d2a26] p-5 shadow-bento space-y-4 text-[#2d2a26] animate-fade-in">
              <div className="bg-[#1d3557] text-white p-5 border-2 border-[#2d2a26] shadow-bento text-center space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] opacity-90 block">
                  Respuesta Oficial de la Historia
                </span>
                <div className="text-3xl sm:text-4xl font-sans font-black tracking-wide uppercase text-amber-300">
                  {activeCard.answer}
                </div>
                <p className="text-xs text-white/90 italic pt-1 max-w-lg mx-auto font-serif">
                  {activeCard.explanation}
                </p>
              </div>

              {/* Results per team */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#2d2a26] uppercase tracking-wider">
                  Resultados de la Ronda:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {winnerInfo.teamResults.map((item) => (
                    <div
                      key={item.teamId}
                      className={`p-3 border-2 border-[#2d2a26] shadow-bento-sm flex items-center justify-between text-xs ${
                        item.status === 'correct'
                          ? 'bg-emerald-100 border-emerald-600'
                          : item.status === 'partial'
                          ? 'bg-amber-100 border-amber-600'
                          : 'bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-[#2d2a26] uppercase block">{item.teamName}</span>
                        <span className="text-[11px] font-mono text-[#2d2a26]/70">
                          Estimación: {item.guess !== null ? `${item.guess} ${activeCard.unit || ''}` : 'Sin estimación'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-extrabold uppercase text-xs block ${
                            item.status === 'correct'
                              ? 'text-emerald-800'
                              : item.status === 'partial'
                              ? 'text-amber-900'
                              : 'text-stone-500'
                          }`}
                        >
                          {item.statusText}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 bg-[#2a9d8f] hover:bg-[#1d3557] text-white font-extrabold text-xs uppercase tracking-widest border-2 border-[#2d2a26] shadow-bento transition-all flex items-center justify-center gap-2"
                >
                  Siguiente Pregunta <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
