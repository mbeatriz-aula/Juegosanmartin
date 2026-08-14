import React, { useState, useEffect } from 'react';
import { CardItem, Team } from '../types';
import { sound } from '../utils/sound';
import { Clock, ArrowRight, Sparkles, MoveUp, MoveDown, Shuffle, CheckCircle2, AlertCircle } from 'lucide-react';

interface GameModeSecuenciasProps {
  cards: CardItem[];
  teams: Team[];
  onUpdateTeams: (teams: Team[]) => void;
}

export const GameModeSecuencias: React.FC<GameModeSecuenciasProps> = ({ cards, teams, onUpdateTeams }) => {
  const [deck, setDeck] = useState<CardItem[]>(() => cards.filter((c) => c.category === 'secuencia'));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    setDeck(cards.filter((c) => c.category === 'secuencia'));
  }, [cards]);

  const handleShuffle = () => {
    sound.playClick();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentCardIndex(0);
    setGameState('arrange');
    setTeamOrders({});
    setResultsInfo(null);
  };

  // States: 'arrange' | 'reveal'
  const [gameState, setGameState] = useState<'arrange' | 'reveal'>('arrange');

  // Team ordered sequences: { teamId: ['C', 'D', 'A', 'B'] }
  const [teamOrders, setTeamOrders] = useState<Record<string, string[]>>({});

  // Results
  const [resultsInfo, setResultsInfo] = useState<{
    correctOrderStr: string;
    teamResults: {
      teamId: string;
      teamName: string;
      userOrderStr: string;
      matchesCount: number;
      status: 'correct' | 'partial' | 'wrong';
      statusText: string;
      pointsGained: number;
    }[];
  } | null>(null);

  const activeCard = deck[currentCardIndex] || deck[0];
  const items = activeCard?.sequenceItems || [];

  // Initialize team orders default if not set
  const getTeamOrder = (teamId: string): string[] => {
    return teamOrders[teamId] || items.map((i) => i.letter);
  };

  const moveLetter = (teamId: string, letter: string, direction: 'up' | 'down') => {
    sound.playClick();
    const current = [...getTeamOrder(teamId)];
    const idx = current.indexOf(letter);
    if (idx === -1) return;

    if (direction === 'up' && idx > 0) {
      const temp = current[idx - 1];
      current[idx - 1] = current[idx];
      current[idx] = temp;
    } else if (direction === 'down' && idx < current.length - 1) {
      const temp = current[idx + 1];
      current[idx + 1] = current[idx];
      current[idx] = temp;
    }

    setTeamOrders((prev) => ({ ...prev, [teamId]: current }));
  };

  const calculateResults = () => {
    if (!activeCard.correctSequenceOrder) return;
    sound.playVictory();

    const correctOrder = activeCard.correctSequenceOrder;
    const correctOrderStr = correctOrder.join(' - ');

    const teamResultsList: {
      teamId: string;
      teamName: string;
      userOrderStr: string;
      matchesCount: number;
      status: 'correct' | 'partial' | 'wrong';
      statusText: string;
      pointsGained: number;
    }[] = [];

    const updatedTeams = teams.map((t) => {
      const userOrder = getTeamOrder(t.id);
      
      // Calculate how many letters match in exact position
      let matchesCount = 0;
      userOrder.forEach((lettr, idx) => {
        if (lettr === correctOrder[idx]) {
          matchesCount++;
        }
      });

      let pointsGained = 0;
      let status: 'correct' | 'partial' | 'wrong' = 'wrong';
      let statusText = 'No acertó (0 pts)';

      if (matchesCount === correctOrder.length) {
        pointsGained = 100;
        status = 'correct';
        statusText = '¡Secuencia Correcta! (+100 pts)';
      } else if (matchesCount >= 2) {
        pointsGained = 50;
        status = 'partial';
        statusText = '¡Secuencia Parcial! (+50 pts)';
      }

      teamResultsList.push({
        teamId: t.id,
        teamName: t.name,
        userOrderStr: userOrder.join(' - '),
        matchesCount,
        status,
        statusText,
        pointsGained,
      });

      return {
        ...t,
        score: t.score + pointsGained,
      };
    });

    setResultsInfo({
      correctOrderStr,
      teamResults: teamResultsList,
    });

    onUpdateTeams(updatedTeams);
    setGameState('reveal');
  };

  const handleNextQuestion = () => {
    sound.playClick();
    setGameState('arrange');
    setTeamOrders({});
    setResultsInfo(null);
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
      {/* Banner */}
      <div className="bg-[#f3efe6] border-2 border-[#2d2a26] p-5 shadow-bento flex flex-col md:flex-row md:items-center justify-between gap-4 text-[#2d2a26]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#1d3557] text-white font-sans font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 border border-[#2d2a26] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              Categoría 2: Secuencias Cronológicas
            </span>
          </div>
          <h2 className="text-2xl font-serif font-black uppercase text-[#2d2a26]">
            Orden de Acontecimientos Históricos
          </h2>
          <p className="text-[#2d2a26] text-sm mt-1 max-w-2xl font-medium">
            Ordenen los eventos del más antiguo al más reciente. <strong>100 Puntos</strong> por secuencia 100% correcta, <strong>50 Puntos</strong> por orden parcial y <strong>0 Puntos</strong> si no aciertan.
          </p>
        </div>

        {/* Card switcher & Shuffle */}
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
              Carta {currentCardIndex + 1} de {deck.length}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sequence Active Question Card */}
        <div className="lg:col-span-5 bg-white border-2 border-[#2d2a26] p-5 shadow-bento flex flex-col justify-between text-[#2d2a26]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#2d2a26] mb-2">
              <span className="uppercase tracking-widest bg-[#e8e4d8] px-2 py-0.5 border border-[#2d2a26]">
                SECUENCIA #{activeCard.numberId}
              </span>
              <span className="bg-[#1d3557] text-white px-2 py-0.5 uppercase border border-[#2d2a26] shadow-bento-sm">
                Max: 100 pts
              </span>
            </div>

            <div className="relative h-44 border-2 border-[#2d2a26] overflow-hidden mb-4 bg-[#2d2a26]">
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

            <div className="bg-[#f3efe6] p-3.5 border-2 border-[#2d2a26] text-[#2d2a26] text-sm font-semibold mb-3">
              {activeCard.question}
            </div>

            {/* Sequence options reference */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-[#2d2a26] uppercase tracking-wider block">
                Opciones a ordenar:
              </span>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-2 bg-[#fdfaf5] border-2 border-[#2d2a26] text-xs text-[#2d2a26] flex items-start gap-2"
                >
                  <span className="w-5 h-5 bg-[#1d3557] text-white font-black flex items-center justify-center text-xs flex-shrink-0 border border-[#2d2a26]">
                    {item.letter}
                  </span>
                  <div>
                    <span className="font-bold block">{item.text}</span>
                    {item.detail && <span className="text-[10px] text-stone-600 font-mono">{item.detail}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Sequence Slate & Results */}
        <div className="lg:col-span-7 space-y-4">
          {gameState === 'arrange' && (
            <div className="bg-[#f3efe6] border-2 border-[#2d2a26] p-5 shadow-bento space-y-4 text-[#2d2a26]">
              <div className="flex items-center justify-between border-b-2 border-[#2d2a26] pb-3">
                <h3 className="font-serif font-black text-[#2d2a26] text-lg uppercase tracking-tight flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#1d3557]" />
                  Ordenamiento de Secuencias
                </h3>
                <span className="text-xs text-[#2d2a26] font-bold uppercase tracking-wider opacity-70">
                  Usen ⬆ ⬇ para mover
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teams.map((team) => {
                  const currentSeq = getTeamOrder(team.id);
                  return (
                    <div
                      key={team.id}
                      className="p-4 bg-white border-2 border-[#2d2a26] shadow-bento-sm space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[#2d2a26] text-xs uppercase flex items-center gap-1.5">
                          <span>{team.avatar}</span>
                          {team.name}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-white bg-[#1d3557] px-2 py-0.5 border border-[#2d2a26]">
                          {currentSeq.join(' → ')}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {currentSeq.map((lettr, idx) => {
                          const matchingItem = items.find((i) => i.letter === lettr);
                          return (
                            <div
                              key={lettr}
                              className="p-1.5 bg-[#fdfaf5] border border-[#2d2a26] text-xs flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className="w-5 h-5 bg-[#d62828] text-white font-black text-xs flex items-center justify-center border border-[#2d2a26]">
                                  {lettr}
                                </span>
                                <span className="truncate text-[#2d2a26] font-bold">
                                  {matchingItem?.text}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => moveLetter(team.id, lettr, 'up')}
                                  disabled={idx === 0}
                                  className="p-1 bg-[#e8e4d8] hover:bg-[#2d2a26] hover:text-white border border-[#2d2a26] text-[#2d2a26] disabled:opacity-30 disabled:hover:bg-[#e8e4d8]"
                                >
                                  <MoveUp className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => moveLetter(team.id, lettr, 'down')}
                                  disabled={idx === currentSeq.length - 1}
                                  className="p-1 bg-[#e8e4d8] hover:bg-[#2d2a26] hover:text-white border border-[#2d2a26] text-[#2d2a26] disabled:opacity-30 disabled:hover:bg-[#e8e4d8]"
                                >
                                  <MoveDown className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={calculateResults}
                className="w-full py-3.5 bg-[#1d3557] hover:bg-[#2d2a26] text-white font-extrabold text-xs uppercase tracking-widest border-2 border-[#2d2a26] shadow-bento transition-all flex items-center justify-center gap-2 active:translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Revelar Orden Correcto y Otorgar Puntos
              </button>
            </div>
          )}

          {gameState === 'reveal' && resultsInfo && (
            <div className="bg-[#f3efe6] border-2 border-[#2d2a26] p-5 shadow-bento space-y-4 text-[#2d2a26] animate-fade-in">
              <div className="bg-[#1d3557] text-white p-5 border-2 border-[#2d2a26] shadow-bento text-center space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] opacity-90 block">
                  Secuencia Cronológica Oficial
                </span>
                <div className="text-2xl font-mono font-black text-amber-300 tracking-wider">
                  {resultsInfo.correctOrderStr}
                </div>
                <p className="text-xs text-white/90 italic pt-1 max-w-lg mx-auto font-serif">
                  {activeCard.explanation}
                </p>
              </div>

              {/* Team results breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#2d2a26] uppercase tracking-wider">
                  Resultados por Equipo:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {resultsInfo.teamResults.map((item) => (
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
                          Orden propuesto: {item.userOrderStr}
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
