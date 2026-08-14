import React, { useState, useEffect } from 'react';
import { CardItem, Team } from '../types';
import { sound } from '../utils/sound';
import { ArrowRight, Sparkles, Shuffle, HelpCircle } from 'lucide-react';

interface GameModeMultipleChoiceProps {
  cards: CardItem[];
  teams: Team[];
  onUpdateTeams: (teams: Team[]) => void;
}

export const GameModeMultipleChoice: React.FC<GameModeMultipleChoiceProps> = ({ cards, teams, onUpdateTeams }) => {
  const [deck, setDeck] = useState<CardItem[]>(() => cards.filter((c) => c.category === 'multiplechoice'));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    setDeck(cards.filter((c) => c.category === 'multiplechoice'));
  }, [cards]);

  const handleShuffle = () => {
    sound.playClick();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentCardIndex(0);
    setGameState('answer');
    setTeamOptionChoice({});
    setWinnerInfo(null);
  };

  // Game states: 'answer' | 'reveal'
  const [gameState, setGameState] = useState<'answer' | 'reveal'>('answer');

  // Team choice: teamId -> optionIndex (0, 1, 2, 3)
  const [teamOptionChoice, setTeamOptionChoice] = useState<Record<string, number>>({});

  // Winner info
  const [winnerInfo, setWinnerInfo] = useState<{
    correctOptionIndex: number;
    teamResults: {
      teamId: string;
      teamName: string;
      selectedIdx: number | undefined;
      isCorrect: boolean;
      statusText: string;
      pointsGained: number;
    }[];
  } | null>(null);

  const activeCard = deck[currentCardIndex] || deck[0];
  const options = activeCard?.options || [];

  const handleSelectOption = (teamId: string, optionIndex: number) => {
    sound.playClick();
    setTeamOptionChoice((prev) => ({ ...prev, [teamId]: optionIndex }));
  };

  const handleRevealAnswer = () => {
    sound.playVictory();
    const correctIdx = activeCard.correctOptionIndex ?? 0;

    const teamResultsList: {
      teamId: string;
      teamName: string;
      selectedIdx: number | undefined;
      isCorrect: boolean;
      statusText: string;
      pointsGained: number;
    }[] = [];

    const updatedTeams = teams.map((team) => {
      const selectedIdx = teamOptionChoice[team.id];
      const isCorrect = selectedIdx === correctIdx;
      const pointsGained = isCorrect ? 100 : 0;
      const statusText = isCorrect ? '¡Respuesta Correcta! (+100 pts)' : 'No acertó (0 pts)';

      teamResultsList.push({
        teamId: team.id,
        teamName: team.name,
        selectedIdx,
        isCorrect,
        statusText,
        pointsGained,
      });

      return {
        ...team,
        score: team.score + pointsGained,
      };
    });

    onUpdateTeams(updatedTeams);
    setWinnerInfo({
      correctOptionIndex: correctIdx,
      teamResults: teamResultsList,
    });
    setGameState('reveal');
  };

  const handleNextCard = () => {
    sound.playClick();
    setGameState('answer');
    setTeamOptionChoice({});
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
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#f3efe6] p-4 border-2 border-[#2d2a26] shadow-bento">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#9c6644] border-2 border-[#2d2a26] flex items-center justify-center text-white font-black shadow-bento-sm">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-[#9c6644] tracking-widest">Categoría 4</span>
            <h2 className="text-xl font-black text-[#2d2a26] uppercase">💡 Opción Múltiple (Trivia Sanmartiniana)</h2>
            <p className="text-xs text-[#2d2a26]/80 font-bold">
              Seleccionen la alternativa correcta. <strong>100 Puntos</strong> si aciertan correctamente y <strong>0 Puntos</strong> si no aciertan.
            </p>
          </div>
        </div>

        {/* Card switcher & Shuffle */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleShuffle}
            className="px-3 py-1.5 bg-white hover:bg-[#e8e4d8] text-[#2d2a26] border-2 border-[#2d2a26] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-bento-sm active:translate-y-0.5"
            title="Mezclar el orden de las preguntas"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#9c6644]" />
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

      {/* Main Question Card */}
      <div className="bg-white border-2 border-[#2d2a26] p-6 shadow-bento space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[#2d2a26]/10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#9c6644] text-white border border-[#2d2a26] text-xs font-black uppercase tracking-wider">
              Dificultad: {activeCard.difficulty}
            </span>
            <span className="px-2.5 py-1 bg-[#1d3557] text-white border border-[#2d2a26] text-xs font-black uppercase tracking-wider">
              100 Pts Recompensa
            </span>
          </div>
          <span className="text-xs font-bold text-[#2d2a26]/70 uppercase tracking-widest">
            {activeCard.title}
          </span>
        </div>

        <h3 className="text-2xl font-black text-[#2d2a26] leading-snug">
          "{activeCard.question}"
        </h3>

        {/* Options Display Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-[#f8f6f0] border-2 border-[#2d2a26]">
          {options.map((opt, idx) => {
            const isCorrectOption = gameState === 'reveal' && idx === activeCard.correctOptionIndex;
            return (
              <div
                key={idx}
                className={`p-3 border-2 border-[#2d2a26] font-bold text-sm flex items-center gap-2 transition-all ${
                  isCorrectOption
                    ? 'bg-emerald-200 text-emerald-900 border-emerald-600 shadow-bento-sm'
                    : 'bg-white text-[#2d2a26]'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-[#2d2a26] text-white text-xs font-black flex items-center justify-center">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>

        {gameState === 'answer' && (
          <div className="space-y-6">
            <div className="bg-[#f8f6f0] p-4 border-2 border-[#2d2a26]">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#2d2a26] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#9c6644]" />
                Selección de Opción por Equipo
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => {
                  const selectedIdx = teamOptionChoice[team.id];
                  return (
                    <div key={team.id} className="bg-white p-3.5 border-2 border-[#2d2a26] shadow-bento-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{team.avatar}</span>
                          <span className="font-bold text-sm text-[#2d2a26]">{team.name}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#1d3557]">
                          Puntos: {team.score}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {options.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(team.id, idx)}
                            className={`py-2 px-3 border-2 border-[#2d2a26] font-black text-xs uppercase flex items-center justify-center gap-1 transition-all ${
                              selectedIdx === idx
                                ? 'bg-[#9c6644] text-white shadow-bento-sm scale-[1.02]'
                                : 'bg-white hover:bg-amber-50 text-[#2d2a26]'
                            }`}
                          >
                            Opción {String.fromCharCode(65 + idx)}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleRevealAnswer}
              className="w-full py-3.5 bg-[#9c6644] hover:bg-[#1d3557] text-white border-2 border-[#2d2a26] font-black text-xs uppercase tracking-widest shadow-bento transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Revelar Opción Correcta y Otorgar Puntos
            </button>
          </div>
        )}

        {gameState === 'reveal' && winnerInfo && (
          <div className="space-y-6 animate-fade-in">
            {/* Banner with Official Result */}
            <div className="p-6 bg-[#1d3557] border-2 border-[#2d2a26] shadow-bento text-white text-center space-y-2">
              <span className="text-xs font-black uppercase tracking-widest block opacity-90">
                La opción correcta es:
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-amber-300">
                Opción {String.fromCharCode(65 + winnerInfo.correctOptionIndex)}: {options[winnerInfo.correctOptionIndex]}
              </h2>
              <p className="text-xs italic max-w-xl mx-auto text-white/90 pt-1 font-serif">
                {activeCard.explanation || activeCard.answer}
              </p>
            </div>

            {/* Team Results */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#2d2a26] uppercase tracking-wider">
                Resultados por Equipo:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {winnerInfo.teamResults.map((result) => (
                  <div
                    key={result.teamId}
                    className={`p-4 border-2 border-[#2d2a26] shadow-bento-sm flex items-center justify-between ${
                      result.isCorrect ? 'bg-emerald-100 border-emerald-600' : 'bg-white'
                    }`}
                  >
                    <div>
                      <span className="font-extrabold text-[#2d2a26] uppercase text-sm block">{result.teamName}</span>
                      <span className="text-xs font-bold text-[#2d2a26]/70">
                        Elegida: {result.selectedIdx !== undefined ? `Opción ${String.fromCharCode(65 + result.selectedIdx)}` : 'Sin selección'}
                      </span>
                    </div>

                    <div className="text-right">
                      <span
                        className={`font-extrabold uppercase text-xs block ${
                          result.isCorrect ? 'text-emerald-800' : 'text-stone-500'
                        }`}
                      >
                        {result.statusText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNextCard}
              className="w-full py-3 bg-[#1d3557] hover:bg-[#2d2a26] text-white border-2 border-[#2d2a26] font-black text-xs uppercase tracking-widest shadow-bento transition-all flex items-center justify-center gap-2"
            >
              Siguiente Pregunta <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
