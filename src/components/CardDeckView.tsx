import React, { useState } from 'react';
import { CardItem, CardCategory, CardDifficulty } from '../types';
import { CardItemView } from './CardItemView';
import { sound } from '../utils/sound';
import { Search, Filter, Grid, Layers, Printer, Sparkles, ChevronLeft, ChevronRight, PlusCircle, Bookmark, Compass } from 'lucide-react';

interface CardDeckViewProps {
  cards: CardItem[];
  onOpenCreateModal: () => void;
}

export const CardDeckView: React.FC<CardDeckViewProps> = ({ cards, onOpenCreateModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CardCategory | 'todos'>('todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState<CardDifficulty | 'todas'>('todas');
  const [viewMode, setViewMode] = useState<'grid' | 'study'>('grid');
  const [studyIndex, setStudyIndex] = useState(0);

  // Filter logic
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'todos' || card.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'todas' || card.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handlePrintCards = () => {
    sound.playClick();
    window.print();
  };

  const currentStudyCard = filteredCards[studyIndex] || filteredCards[0];

  return (
    <div className="space-y-6">
      {/* Search & Filter Control Bar (Bento Box) */}
      <div className="bg-[#f3efe6] border-2 border-[#2d2a26] p-4 shadow-bento flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-[#2d2a26]">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#2d2a26]" />
          <input
            type="text"
            placeholder="Buscar palabra clave, prócer o evento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-2 border-[#2d2a26] pl-10 pr-4 py-2 text-[#2d2a26] placeholder:text-stone-500 text-xs font-bold focus:outline-none focus:bg-[#fdfaf5] shadow-bento-sm"
          />
        </div>

        {/* Category & Difficulty Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border-2 border-[#2d2a26] shadow-bento-sm text-xs font-bold">
            <Filter className="w-3.5 h-3.5 text-[#1d3557]" />
            <span className="text-[#2d2a26]">Categoría:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as CardCategory | 'todos')}
              className="bg-transparent text-[#1d3557] font-black focus:outline-none cursor-pointer uppercase text-[11px]"
            >
              <option value="todos">Todas las cartas (31)</option>
              <option value="aproximacion">🎲 Las Vegas (Aproximación)</option>
              <option value="secuencia">⏳ Secuencias (Cronología)</option>
              <option value="verdaderofalso">🛡️ Verdadero o Falso</option>
              <option value="multiplechoice">💡 Opción Múltiple (Trivia)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border-2 border-[#2d2a26] shadow-bento-sm text-xs font-bold">
            <span className="text-[#2d2a26]">Dificultad:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as CardDifficulty | 'todas')}
              className="bg-transparent text-[#1d3557] font-black focus:outline-none cursor-pointer uppercase text-[11px]"
            >
              <option value="todas">Todas</option>
              <option value="Fácil">Fácil</option>
              <option value="Medio">Medio</option>
              <option value="Desafío">Desafío</option>
              <option value="Erudito">Erudito</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#e8e4d8] p-1 border-2 border-[#2d2a26]">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('grid');
              }}
              className={`px-3 py-1 text-xs font-extrabold uppercase flex items-center gap-1 transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#1d3557] text-white border border-[#2d2a26] shadow-bento-sm'
                  : 'text-[#2d2a26] hover:bg-white/50'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              Mazo
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('study');
              }}
              className={`px-3 py-1 text-xs font-extrabold uppercase flex items-center gap-1 transition-all ${
                viewMode === 'study'
                  ? 'bg-[#1d3557] text-white border border-[#2d2a26] shadow-bento-sm'
                  : 'text-[#2d2a26] hover:bg-white/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Estudio 1 a 1
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={onOpenCreateModal}
            className="px-3 py-2 bg-[#d62828] hover:bg-red-700 text-white border-2 border-[#2d2a26] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-bento-sm active:translate-y-0.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-white" />
            Crear Carta
          </button>

          <button
            onClick={handlePrintCards}
            className="px-3 py-2 bg-white hover:bg-[#e8e4d8] text-[#2d2a26] border-2 border-[#2d2a26] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-bento-sm print:hidden"
            title="Imprimir mazo de cartas didácticas"
          >
            <Printer className="w-3.5 h-3.5 text-[#2d2a26]" />
            Imprimir
          </button>
        </div>
      </div>

      {/* Counter indicator */}
      <div className="flex items-center justify-between text-xs text-[#2d2a26] font-bold px-1">
        <span>
          Mostrando <strong className="text-[#d62828] font-mono text-sm">{filteredCards.length}</strong> de {cards.length} cartas históricas
        </span>
        <span className="text-stone-600 italic font-medium">
          Tip: Clic en cualquier carta para voltearla y ver la respuesta.
        </span>
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <CardItemView key={card.id} card={card} />
          ))}
        </div>
      )}

      {/* STUDY / FLASHCARD FOCUS MODE */}
      {viewMode === 'study' && currentStudyCard && (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          <div className="flex items-center justify-between bg-[#f3efe6] p-3 border-2 border-[#2d2a26] shadow-bento">
            <button
              onClick={() => {
                sound.playClick();
                setStudyIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
              }}
              className="px-4 py-2 bg-[#1d3557] hover:bg-[#2d2a26] text-white border border-[#2d2a26] font-bold text-xs uppercase tracking-wider shadow-bento-sm flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            <span className="text-xs font-mono font-black text-[#2d2a26] bg-white px-3 py-1 border border-[#2d2a26]">
              Carta {studyIndex + 1} de {filteredCards.length}
            </span>

            <button
              onClick={() => {
                sound.playClick();
                setStudyIndex((prev) => (prev + 1) % filteredCards.length);
              }}
              className="px-4 py-2 bg-[#1d3557] hover:bg-[#2d2a26] text-white border border-[#2d2a26] font-bold text-xs uppercase tracking-wider shadow-bento-sm flex items-center gap-1.5"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <CardItemView card={currentStudyCard} />
        </div>
      )}

      {filteredCards.length === 0 && (
        <div className="text-center py-16 bg-[#f3efe6] border-2 border-[#2d2a26] shadow-bento space-y-3">
          <p className="text-[#2d2a26] font-bold text-base">No se encontraron cartas con esos criterios de búsqueda.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todos');
              setSelectedDifficulty('todas');
            }}
            className="px-4 py-2 bg-[#1d3557] text-white font-bold border-2 border-[#2d2a26] shadow-bento-sm uppercase text-xs"
          >
            Restablecer Filtros
          </button>
        </div>
      )}
    </div>
  );
};
