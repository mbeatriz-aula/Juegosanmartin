import React, { useState, useEffect } from 'react';
import { CardItem, Team } from '../types';
import { sound } from '../utils/sound';
import { Shield, Sparkles, Shuffle, Check, X, ArrowRight } from 'lucide-react';

interface GameModeVerdaderoFalsoProps {
  cards: CardItem[];
  teams: Team[];
  onUpdateTeams: (teams: Team[]) => void;
}

export const GameModeVerdaderoFalso: React.FC<GameModeVerdaderoFalsoProps> = ({ cards, teams, onUpdateTeams }) => {
  const [deck, setDeck] = useState<CardItem[]>(() => cards.filter((c) => c.category === 'verdaderofalso'));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    setDeck(cards.filter((c) => c.category === 'verdaderofalso'));
  }, [cards]);

  const handleShuffle = () => {
    sound.playClick();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentCardIndex(0);
    setGameState('answer');
    setTeamAnswers({});
    setWinnerInfo(null);
  };

  // Game states: 'answer' | 'reveal'
  const [gameState, setGameState] = useState<'answer' | 'reveal'>('answer');

  // Team answers: teamId -> boolean (true for Verdadero, false for Falso)
  const [teamAnswers, setTeamAnswers] = useState<Record<string, boolean>>({});

  // Winner & results info
  const [winnerInfo, setWinnerInfo] = useState<{
    correctAnswer: boolean;
    teamResults: {
      teamId: string;
      teamName: string;
      answerGiven: boolean | undefined;
      isCorrect: boolean;
      statusText: string;
      pointsGained: number;
    }[];
  } | null>(null);

  const activeCard = deck[currentCardIndex] || deck[0];

  const handleSelectAnswer = (teamId: string, isTrue: boolean) => {
    sound.playClick();
    setTeamAnswers((prev) => ({ ...prev, [teamId]: isTrue }));
  };

  const handleRevealAnswer = () => {
    sound.playVictory();
    const isCorrectValue = activeCard.isTrue ?? true;

    const teamResultsList: {
      teamId: string;
      teamName: string;
      answerGiven: boolean | undefined;
      isCorrect: boolean;
      statusText: string;
      pointsGained: number;
    }[] = [];

    const updatedTeams = teams.map((team) => {
      const answerGiven = teamAnswers[team.id];
      const isCorrect = answerGiven === isCorrectValue;
      const pointsGained = isCorrect ? 100 : 0;
      const statusText = isCorrect ? '¡Respuesta Correcta! (+100 pts)' : 'No acertó (0 pts)';

      teamResultsList.push({
        teamId: team.id,
        teamName: team.name,
        answerGiven,
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
      correctAnswer: isCorrectValue,
      teamResults: teamResultsList,
    });
    setGameState('reveal');
  };

  const handleNextCard = () => {
    sound.playClick();
    setGameState('answer');
    setTeamAnswers({});
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
          <div className="w-12 h-12 bg-[#2a9d8f] border-2 border-[#2d2a26] flex items-center justify-center text-white font-black shadow-bento-sm">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-[#2a9d8f] tracking-widest">Categoría 3</span>
            <h2 className="text-xl font-black text-[#2d2a26] uppercase">🛡️ Verdadero o Falso (Mito o Verdad)</h2>
            <p className="text-xs text-[#2d2a26]/80 font-bold">
              Evalúen la afirmación histórica. <strong>100 Puntos</strong> si aciertan correctamente y <strong>0 Puntos</strong> si no aciertan.
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
            <Shuffle className="w-3.5 h-3.5 text-[#2a9d8f]" />
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
      <div className="bg-white border-2 border-[#2d2a26] p-6 shadow-bento relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-[#2d2a26]/10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#2a9d8f] text-white border border-[#2d2a26] text-xs font-black uppercase tracking-wider">
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

        <h3 className="text-2xl font-black text-[#2d2a26] mb-6 leading-snug">
          "{activeCard.question}"
        </h3>

        {gameState === 'answer' && (
          <div className="space-y-6">
            <div className="bg-[#f8f6f0] p-4 border-2 border-[#2d2a26]">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#2d2a26] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#2a9d8f]" />
                Respuesta de Equipos
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => {
                  const currentSelection = teamAnswers[team.id];
                  return (
                    <div
                      key={team.id}
                      className="bg-white p-3.5 border-2 border-[#2d2a26] shadow-bento-sm space-y-3"
                    >
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
                        <button
                          onClick={() => handleSelectAnswer(team.id, true)}
                          className={`py-2 px-3 border-2 border-[#2d2a26] font-black text-xs uppercase flex items-center justify-center gap-1 transition-all ${
                            currentSelection === true
                              ? 'bg-[#2a9d8f] text-white shadow-bento-sm scale-[1.02]'
                              : 'bg-white hover:bg-emerald-50 text-[#2d2a26]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" /> Verdadero
                        </button>

                        <button
                          onClick={() => handleSelectAnswer(team.id, false)}
                          className={`py-2 px-3 border-2 border-[#2d2a26] font-black text-xs uppercase flex items-center justify-center gap-1 transition-all ${
                            currentSelection === false
                              ? 'bg-[#d62828] text-white shadow-bento-sm scale-[1.02]'
                              : 'bg-white hover:bg-rose-50 text-[#2d2a26]'
                          }`}
                        >
                          <X className="w-3.5 h-3.5" /> Falso
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleRevealAnswer}
              className="w-full py-3.5 bg-[#2a9d8f] hover:bg-[#1d3557] text-white border-2 border-[#2d2a26] font-black text-xs uppercase tracking-widest shadow-bento transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Revelar Respuesta Correcta y Otorgar Puntos
            </button>
          </div>
        )}

        {gameState === 'reveal' && winnerInfo && (
          <div className="space-y-6 animate-fade-in">
            {/* Banner with Official Result */}
            <div className={`p-6 border-2 border-[#2d2a26] shadow-bento text-white text-center space-y-2 ${winnerInfo.correctAnswer ? 'bg-[#2a9d8f]' : 'bg-[#d62828]'}`}>
              <span className="text-xs font-black uppercase tracking-widest block opacity-90">
                La afirmación histórica es:
              </span>
              <h2 className="text-3xl font-black uppercase tracking-wider text-amber-300">
                {winnerInfo.correctAnswer ? '¡VERDADERA!' : '¡FALSA!'}
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
                        Respuesta: {result.answerGiven === undefined ? 'Sin responder' : result.answerGiven ? 'Verdadero' : 'Falso'}
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
