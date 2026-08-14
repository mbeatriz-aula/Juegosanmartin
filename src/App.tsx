import React, { useState, useEffect } from 'react';
import { CardItem, Team } from './types';
import { INITIAL_CARDS } from './data/cardsData';
import { GameModeLasVegas } from './components/GameModeLasVegas';
import { GameModeSecuencias } from './components/GameModeSecuencias';
import { GameModeVerdaderoFalso } from './components/GameModeVerdaderoFalso';
import { GameModeMultipleChoice } from './components/GameModeMultipleChoice';
import { GameModeMixto } from './components/GameModeMixto';
import { CardDeckView } from './components/CardDeckView';
import { CreateCardModal } from './components/CreateCardModal';
import { sound } from './utils/sound';
import { Shield, Trophy, Coins, Volume2, VolumeX, Plus, HelpCircle, BookOpen, Layers, Dices, Clock, Sparkles, RefreshCw, X, Users, Shuffle, CheckSquare, HelpCircle as QuestionIcon, Maximize2, Minimize2, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';

export default function App() {
  const [cards, setCards] = useState<CardItem[]>(INITIAL_CARDS);
  const [activeTab, setActiveTab] = useState<'lasvegas' | 'secuencias' | 'verdaderofalso' | 'multiplechoice' | 'mixto' | 'mazo'>('lasvegas');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  // Teams configuration default
  const [teams, setTeams] = useState<Team[]>([
    { id: 'team-1', name: 'Granaderos', color: 'blue', avatar: '⚔️', chips: 100, score: 0 },
    { id: 'team-2', name: 'Patriotas', color: 'amber', avatar: '⭐', chips: 100, score: 0 },
    { id: 'team-3', name: 'Ejército de Cuyo', color: 'emerald', avatar: '🏔️', chips: 100, score: 0 },
    { id: 'team-4', name: 'Libertadores', color: 'rose', avatar: '🦅', chips: 100, score: 0 }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false);

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  const handleToggleHeader = () => {
    sound.playClick();
    setIsHeaderCollapsed(!isHeaderCollapsed);
  };

  const handleToggleFullScreen = () => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsHeaderCollapsed(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsHeaderCollapsed(false);
    }
  };

  const handleAddCard = (newCard: CardItem) => {
    setCards((prev) => [newCard, ...prev]);
  };

  const handleResetGame = () => {
    sound.playClick();
    if (window.confirm('¿Desean reiniciar las puntuaciones y fichas de todos los equipos?')) {
      setTeams((prev) =>
        prev.map((t) => ({
          ...t,
          chips: 100,
          score: 0
        }))
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] text-[#2d2a26] font-sans antialiased selection:bg-[#1d3557] selection:text-white flex flex-col">
      {/* MINIMAL FLOATING STRIP (WHEN HEADER IS COLLAPSED FOR FULLSCREEN QUESTION DISPLAY) */}
      {isHeaderCollapsed ? (
        <div className="sticky top-0 z-50 bg-[#2d2a26] text-white px-4 py-2 border-b-2 border-[#2d2a26] shadow-bento flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="font-serif font-black uppercase tracking-wider text-amber-400 hidden sm:inline flex items-center gap-1">
              <Shield className="w-4 h-4 text-amber-400 inline" /> CRUCE DE LOS ANDES
            </span>
            <span className="px-2 py-0.5 bg-[#1d3557] text-white border border-white/20 font-extrabold uppercase text-[10px] tracking-widest truncate">
              {activeTab === 'lasvegas' && '🎲 Categoría 1: Las Vegas'}
              {activeTab === 'secuencias' && '⏳ Categoría 2: Secuencias'}
              {activeTab === 'verdaderofalso' && '🛡️ Categoría 3: V / F'}
              {activeTab === 'multiplechoice' && '💡 Categoría 4: Opción Múltiple'}
              {activeTab === 'mixto' && '🔀 Modo Mixto'}
              {activeTab === 'mazo' && '🎴 Mazo Didáctico'}
            </span>

            {/* Quick mini team scores */}
            <div className="hidden lg:flex items-center gap-2">
              {teams.map((t) => (
                <span key={t.id} className="bg-[#f3efe6]/10 px-2 py-0.5 rounded border border-white/20 font-bold text-[11px] flex items-center gap-1">
                  <span>{t.avatar}</span>
                  <span className="text-amber-300">{t.name}:</span>
                  <span className="text-white font-mono">{t.score} pts</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleToggleHeader}
              className="px-3 py-1.5 bg-[#2a9d8f] hover:bg-[#264653] text-white border border-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-bento-sm active:translate-y-0.5"
              title="Mostrar título y menú de categorías"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Mostrar Menú</span>
            </button>

            <button
              onClick={handleToggleFullScreen}
              className="p-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/40 text-xs font-bold"
              title="Alternar Pantalla Completa"
            >
              {document.fullscreenElement ? <Minimize2 className="w-4 h-4 text-amber-300" /> : <Maximize2 className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* HEADER / NAVIGATION BAR */}
          <header className="sticky top-0 z-40 bg-[#fdfaf5]/95 backdrop-blur-md border-b-2 border-[#2d2a26] shadow-bento-sm print:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              {/* Logo & Title */}
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold opacity-70 text-[#2d2a26] flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#1d3557] inline" />
                  EXPEDICIÓN LIBERTADORA • GESTA HISTÓRICA 1817
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tighter uppercase text-[#2d2a26]">
                    CRUCE DE LOS ANDES
                  </h1>
                  <span className="text-[10px] font-bold font-sans bg-[#1d3557] text-white border border-[#2d2a26] px-2.5 py-1 uppercase tracking-widest hidden sm:inline-block shadow-bento-sm">
                    JUEGO DE CARTAS
                  </span>
                </div>
              </div>

              {/* Game Modes Tabs */}
              <nav className="flex flex-wrap items-center gap-2 self-center md:self-end">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('lasvegas');
                  }}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all border-2 border-[#2d2a26] ${
                    activeTab === 'lasvegas'
                      ? 'bg-[#1d3557] text-white shadow-bento-sm -translate-y-0.5'
                      : 'bg-[#f3efe6] text-[#2d2a26] hover:bg-white'
                  }`}
                >
                  <Dices className="w-4 h-4" />
                  Categoría 1: Las Vegas
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('secuencias');
                  }}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all border-2 border-[#2d2a26] ${
                    activeTab === 'secuencias'
                      ? 'bg-[#1d3557] text-white shadow-bento-sm -translate-y-0.5'
                      : 'bg-[#f3efe6] text-[#2d2a26] hover:bg-white'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Categoría 2: Secuencias
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('verdaderofalso');
                  }}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all border-2 border-[#2d2a26] ${
                    activeTab === 'verdaderofalso'
                      ? 'bg-[#2a9d8f] text-white shadow-bento-sm -translate-y-0.5'
                      : 'bg-[#f3efe6] text-[#2d2a26] hover:bg-white'
                  }`}
                >
                  <CheckSquare className="w-4 h-4" />
                  Categoría 3: V/F
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('multiplechoice');
                  }}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all border-2 border-[#2d2a26] ${
                    activeTab === 'multiplechoice'
                      ? 'bg-[#9c6644] text-white shadow-bento-sm -translate-y-0.5'
                      : 'bg-[#f3efe6] text-[#2d2a26] hover:bg-white'
                  }`}
                >
                  <QuestionIcon className="w-4 h-4" />
                  Categoría 4: Opción Múltiple
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('mixto');
                  }}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all border-2 border-[#2d2a26] ${
                    activeTab === 'mixto'
                      ? 'bg-[#d62828] text-white shadow-bento-sm -translate-y-0.5'
                      : 'bg-[#f3efe6] text-[#2d2a26] hover:bg-white'
                  }`}
                >
                  <Shuffle className="w-4 h-4" />
                  🔀 Modo Mixto
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('mazo');
                  }}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all border-2 border-[#2d2a26] ${
                    activeTab === 'mazo'
                      ? 'bg-[#1d3557] text-white shadow-bento-sm -translate-y-0.5'
                      : 'bg-[#f3efe6] text-[#2d2a26] hover:bg-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  Mazo ({cards.length})
                </button>
              </nav>

              {/* Right Info & Quick Controls */}
              <div className="flex items-center gap-3 self-end md:self-end">
                <div className="hidden lg:flex gap-4 text-right text-xs uppercase font-sans font-bold border-l-2 border-[#2d2a26] pl-4">
                  <div>
                    <span className="text-[10px] opacity-70">GENERAL</span><br />
                    <span className="text-sm font-black text-[#2d2a26]">SAN MARTÍN</span>
                  </div>
                  <div className="text-[#1d3557]">
                    <span className="text-[10px] opacity-70">AÑO GESTA</span><br />
                    <span className="text-sm font-black">1817</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleHeader}
                    className="px-3 py-2 bg-[#1d3557] text-white border-2 border-[#2d2a26] text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider shadow-bento-sm hover:bg-[#2a9d8f] transition-all"
                    title="Ocultar título y categorías para enfocar solo las preguntas"
                  >
                    <EyeOff className="w-4 h-4" />
                    <span className="hidden md:inline">Ocultar Menú</span>
                  </button>

                  <button
                    onClick={handleToggleFullScreen}
                    className="px-3 py-2 bg-[#2a9d8f] text-white border-2 border-[#2d2a26] text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider shadow-bento-sm hover:bg-[#1d3557] transition-all"
                    title="Ver pantalla completa"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Pantalla Completa</span>
                  </button>

                  <button
                    onClick={() => setIsRulesModalOpen(true)}
                    className="px-3 py-2 bg-white text-[#2d2a26] border-2 border-[#2d2a26] text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider shadow-bento-sm hover:bg-[#f3efe6] transition-all"
                    title="Reglamento del juego"
                  >
                    <HelpCircle className="w-4 h-4 text-[#1d3557]" />
                    <span className="hidden sm:inline">Reglas</span>
                  </button>

                  <button
                    onClick={handleToggleSound}
                    className="p-2 bg-white text-[#2d2a26] border-2 border-[#2d2a26] shadow-bento-sm hover:bg-[#f3efe6] transition-all"
                    title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-[#1d3557]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* TEAM SCOREBOARD BAR (BENTO BOX STYLE) */}
          <section className="bg-[#f3efe6] border-b-2 border-[#2d2a26] py-3 px-4 print:hidden">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#2d2a26] font-extrabold uppercase tracking-widest text-[11px]">
                <Users className="w-4 h-4 text-[#1d3557]" />
                <span>Tablero de Equipos:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
                {teams.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white px-3 py-2 border-2 border-[#2d2a26] shadow-bento-sm flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{t.avatar}</span>
                      <span className="font-extrabold text-[#2d2a26] truncate max-w-[80px] font-sans">{t.name}</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono font-bold">
                      <span className="text-[#1d3557] flex items-center gap-1 bg-[#f3efe6] px-2 py-0.5 border border-[#2d2a26]" title="Puntos acumulados">
                        <Trophy className="w-3.5 h-3.5 text-[#d62828] inline" />
                        {t.score} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTeamsModalOpen(true)}
                  className="text-[#1d3557] hover:underline text-xs font-bold uppercase tracking-wider"
                >
                  Editar Equipos
                </button>
                <span className="text-[#2d2a26] opacity-40">•</span>
                <button
                  onClick={handleResetGame}
                  className="text-[#2d2a26] hover:text-[#d62828] text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reiniciar Puntos
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* MAIN GAME CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'lasvegas' && (
          <GameModeLasVegas cards={cards} teams={teams} onUpdateTeams={setTeams} />
        )}

        {activeTab === 'secuencias' && (
          <GameModeSecuencias cards={cards} teams={teams} onUpdateTeams={setTeams} />
        )}

        {activeTab === 'verdaderofalso' && (
          <GameModeVerdaderoFalso cards={cards} teams={teams} onUpdateTeams={setTeams} />
        )}

        {activeTab === 'multiplechoice' && (
          <GameModeMultipleChoice cards={cards} teams={teams} onUpdateTeams={setTeams} />
        )}

        {activeTab === 'mixto' && (
          <GameModeMixto cards={cards} teams={teams} onUpdateTeams={setTeams} />
        )}

        {activeTab === 'mazo' && (
          <CardDeckView cards={cards} onOpenCreateModal={() => setIsCreateModalOpen(true)} />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#2d2a26] text-[#fdfaf5] border-t-2 border-[#2d2a26] py-6 px-4 text-center text-xs space-y-2 print:hidden shadow-bento">
        <p className="font-serif italic text-base font-bold text-[#fdfaf5]">
          "Dividir al enemigo, desorientarlo y vencerlo en su propio terreno." — Gral. José de San Martín
        </p>
        <p className="font-sans text-[11px] uppercase tracking-widest opacity-75">
          Mendoza • Provincia de Cuyo • Ejército de los Andes • Gesta Emancipadora Suramericana
        </p>
      </footer>

      {/* CREATE CARD MODAL */}
      <CreateCardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddCard={handleAddCard}
      />

      {/* RULES MODAL */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2d2a26]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fdfaf5] border-2 border-[#2d2a26] max-w-xl w-full p-6 space-y-4 shadow-bento relative text-[#2d2a26]">
            <div className="flex items-center justify-between border-b-2 border-[#2d2a26] pb-3">
              <h3 className="font-serif font-black text-[#2d2a26] text-xl uppercase tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#1d3557]" />
                Reglamento del Juego de Cartas
              </h3>
              <button
                onClick={() => setIsRulesModalOpen(false)}
                className="p-1 text-[#2d2a26] hover:bg-[#e8e4d8] border border-[#2d2a26]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar font-sans">
              <div className="p-3.5 bg-[#f3efe6] border-2 border-[#2d2a26] shadow-bento-sm space-y-1.5">
                <div className="inline-block bg-[#1d3557] text-white px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest">
                  Sistema de Puntuación General
                </div>
                <p className="text-[#2d2a26] leading-relaxed font-semibold">
                  • <strong>100 Puntos:</strong> Equipo con respuesta/orden 100% correcto o la estimación más cercana.<br />
                  • <strong>50 Puntos:</strong> Equipo con acierto parcial (en secuencias u orden aproximado).<br />
                  • <strong>0 Puntos:</strong> Equipo que no acertó la pregunta.
                </p>
              </div>

              <div className="p-3.5 bg-white border-2 border-[#2d2a26] shadow-bento-sm space-y-1.5">
                <div className="inline-block bg-[#1d3557] text-white px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest">
                  Categoría 1: Las Vegas / El Erudito
                </div>
                <h4 className="font-serif font-bold text-sm text-[#2d2a26]">
                  Aproximación Numérica
                </h4>
                <p className="text-[#2d2a26] leading-relaxed">
                  Cada equipo arriesga un valor numérico estimado. El equipo con la respuesta exacta gana 100 puntos. El equipo con la cifra más cercana sin pasarse gana 50 puntos.
                </p>
              </div>

              <div className="p-3.5 bg-white border-2 border-[#2d2a26] shadow-bento-sm space-y-1.5">
                <div className="inline-block bg-[#1d3557] text-white px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest">
                  Categoría 2: Secuencias Cronológicas
                </div>
                <h4 className="font-serif font-bold text-sm text-[#2d2a26]">
                  Orden Histórico y Geográfico
                </h4>
                <p className="text-[#2d2a26] leading-relaxed">
                  Los equipos ordenan las opciones A, B, C y D del evento más antiguo al más reciente. Secuencia perfecta suma 100 puntos; secuencia parcial suma 50 puntos.
                </p>
              </div>

              <div className="p-3.5 bg-white border-2 border-[#2d2a26] shadow-bento-sm space-y-1.5">
                <div className="inline-block bg-[#2a9d8f] text-white px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest">
                  Categoría 3: Verdadero o Falso
                </div>
                <h4 className="font-serif font-bold text-sm text-[#2d2a26]">
                  Mito o Verdad Histórica
                </h4>
                <p className="text-[#2d2a26] leading-relaxed">
                  Los equipos evalúan la afirmación. Quienes elijan la opción correcta ganan 100 puntos; quienes se equivoquen obtienen 0 puntos.
                </p>
              </div>

              <div className="p-3.5 bg-white border-2 border-[#2d2a26] shadow-bento-sm space-y-1.5">
                <div className="inline-block bg-[#9c6644] text-white px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest">
                  Categoría 4: Opción Múltiple
                </div>
                <h4 className="font-serif font-bold text-sm text-[#2d2a26]">
                  Trivia Sanmartiniana
                </h4>
                <p className="text-[#2d2a26] leading-relaxed">
                  Selección múltiple entre 4 alternativas. La elección correcta otorga 100 puntos.
                </p>
              </div>

              <div className="p-3.5 bg-[#2d2a26] text-white border-2 border-[#2d2a26] shadow-bento-sm space-y-1">
                <h4 className="font-serif font-bold text-sm text-[#fdfaf5] uppercase tracking-wider">
                  Modo Mazo Didáctico y Estudio
                </h4>
                <p className="text-stone-300 text-xs">
                  Exploren todas las cartas, usen el filtro por dificultad o categoría, o impriman las fichas para jugar en vivo en el aula. Tocando cualquier carta se voltea en 3D para revelar la respuesta y el trasfondo histórico.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT TEAMS MODAL */}
      {isTeamsModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2d2a26]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fdfaf5] border-2 border-[#2d2a26] max-w-md w-full p-6 space-y-4 shadow-bento text-[#2d2a26]">
            <div className="flex items-center justify-between border-b-2 border-[#2d2a26] pb-3">
              <h3 className="font-serif font-black text-[#2d2a26] text-lg uppercase tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-[#1d3557]" />
                Configurar Equipos
              </h3>
              <button
                onClick={() => setIsTeamsModalOpen(false)}
                className="p-1 border border-[#2d2a26] hover:bg-[#e8e4d8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {teams.map((t, idx) => (
                <div key={t.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={t.avatar}
                    onChange={(e) => {
                      const updated = [...teams];
                      updated[idx].avatar = e.target.value;
                      setTeams(updated);
                    }}
                    className="w-10 bg-white border-2 border-[#2d2a26] p-1.5 text-center text-sm font-bold shadow-bento-sm"
                  />
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) => {
                      const updated = [...teams];
                      updated[idx].name = e.target.value;
                      setTeams(updated);
                    }}
                    className="flex-1 bg-white border-2 border-[#2d2a26] p-1.5 text-xs font-bold text-[#2d2a26] shadow-bento-sm"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsTeamsModalOpen(false)}
              className="w-full py-2.5 bg-[#1d3557] hover:bg-[#2d2a26] text-white border-2 border-[#2d2a26] font-bold text-xs uppercase tracking-wider shadow-bento-sm transition-all"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
