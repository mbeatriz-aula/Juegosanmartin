import React, { useState } from 'react';
import { CardItem } from '../types';
import { sound } from '../utils/sound';
import { RotateCw, Star, Trophy, Calendar, Compass, HelpCircle, CheckCircle2, Info, Eye } from 'lucide-react';

interface CardItemViewProps {
  card: CardItem;
  onSelect?: () => void;
  isCompact?: boolean;
}

export const CardItemView: React.FC<CardItemViewProps> = ({ card, onSelect, isCompact = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playCardFlip();
    setIsFlipped(!isFlipped);
  };

  const getDifficultyStars = (level: number) => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <Star
        key={idx}
        className={`w-3.5 h-3.5 ${
          idx < level ? 'fill-[#d62828] text-[#2d2a26]' : 'text-stone-300'
        }`}
      />
    ));
  };

  const isCategory1 = card.category === 'aproximacion';

  return (
    <div
      className={`group relative perspective-1000 ${
        isCompact ? 'h-[370px]' : 'h-[500px]'
      } w-full cursor-pointer select-none`}
      onClick={onSelect}
    >
      <div
        className={`w-full h-full duration-700 transform-style-3d relative transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT OF THE CARD (BENTO BEIGE / WHITE BLOCK) */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-[#f3efe6] border-2 border-[#2d2a26] text-[#2d2a26] flex flex-col justify-between overflow-hidden shadow-bento">
          {/* Card Top Header */}
          <div className="p-3 pb-2 border-b-2 border-[#2d2a26] bg-[#e8e4d8] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-sans font-black uppercase tracking-widest px-2 py-0.5 bg-[#1d3557] text-white border border-[#2d2a26]">
                {card.categoryName || (card.category === 'aproximacion' ? '🎲 Las Vegas' : card.category === 'secuencia' ? '⏳ Secuencias' : card.category === 'verdaderofalso' ? '🛡️ V / F' : '💡 M. Choice')}
              </span>
              <span className="text-[11px] font-mono font-extrabold text-[#2d2a26] bg-white px-2 py-0.5 border border-[#2d2a26]">
                #{card.numberId}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-white px-2 py-0.5 border border-[#2d2a26]">
              {getDifficultyStars(card.characteristics.difficultyLevel)}
            </div>
          </div>

          {/* Card Image Banner */}
          <div className="relative h-44 overflow-hidden border-b-2 border-[#2d2a26] bg-[#2d2a26] group-hover:brightness-105 transition-all">
            <img
              src={card.imageUrl}
              alt={card.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a26]/80 via-transparent to-transparent" />
            
            {/* Tactical Value Badge & Points */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
              <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#2d2a26] bg-white px-2.5 py-0.5 border border-[#2d2a26] flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#1d3557]" />
                {card.characteristics.tacticalValue}
              </span>
              <span className="text-xs font-black uppercase text-white bg-[#d62828] border border-[#2d2a26] px-2.5 py-0.5 shadow-bento-sm flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                {card.points} pts
              </span>
            </div>
          </div>

          {/* Card Body & Question */}
          <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar">
            <div>
              <h3 className="font-serif text-lg font-bold italic text-[#2d2a26] mb-2 leading-tight">
                {card.title}
              </h3>
              <p className="text-[#2d2a26] text-sm leading-snug font-sans font-medium">
                {card.question}
              </p>

              {/* Sequence preview badges if sequence category */}
              {!isCategory1 && card.sequenceItems && (
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {card.sequenceItems.map((item) => (
                    <div
                      key={item.id}
                      className="text-[11px] bg-white border border-[#2d2a26] px-2 py-1 text-[#2d2a26] truncate flex items-center gap-1 font-sans"
                    >
                      <span className="font-black text-white bg-[#1d3557] px-1 text-[10px]">
                        {item.letter}
                      </span>
                      <span className="truncate font-semibold">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Prompt to flip */}
            <div className="mt-3 pt-3 border-t-2 border-[#2d2a26] flex items-center justify-between text-xs text-[#2d2a26] font-bold">
              <span className="flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                <Eye className="w-3.5 h-3.5 text-[#1d3557]" />
                Clic para respuesta
              </span>
              <button
                onClick={handleFlip}
                className="px-3 py-1.5 bg-[#1d3557] hover:bg-[#2d2a26] text-white border border-[#2d2a26] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-bento-sm active:translate-y-0.5"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Voltear
              </button>
            </div>
          </div>
        </div>

        {/* BACK OF THE CARD (BENTO DARK CHARCOAL / RED BLOCK) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#2d2a26] text-[#fdfaf5] border-2 border-[#2d2a26] flex flex-col justify-between overflow-hidden shadow-bento-navy">
          {/* Back Header */}
          <div className="p-3 pb-2 border-b-2 border-[#fdfaf5]/20 bg-[#1d3557] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-white font-sans font-bold text-xs uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Respuesta Revelada
            </div>
            <span className="text-xs font-mono font-bold text-[#2d2a26] bg-[#fdfaf5] px-2 py-0.5 border border-black">
              #{card.numberId}
            </span>
          </div>

          {/* Back Body Content */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            {/* Highlighted Answer Box */}
            <div className="p-3 bg-[#d62828] text-white border-2 border-[#2d2a26] shadow-bento-sm">
              <div className="text-[10px] font-sans font-bold uppercase tracking-widest mb-1 opacity-90 underline decoration-white">
                Respuesta Correcta:
              </div>
              <div className="font-sans font-black text-xl sm:text-2xl tracking-wide uppercase">
                {card.answer}
              </div>
            </div>

            {/* Sequence detail list if sequence card */}
            {!isCategory1 && card.correctSequenceOrder && card.sequenceItems && (
              <div className="space-y-1.5 bg-[#3d3d3d] p-2.5 border border-[#4d4d4d]">
                <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-amber-300 mb-1">
                  Orden Cronológico Correcto:
                </div>
                {card.correctSequenceOrder.map((letter, idx) => {
                  const item = card.sequenceItems?.find((s) => s.letter === letter);
                  return (
                    <div
                      key={idx}
                      className="text-xs flex items-center justify-between bg-[#2d2a26] p-1.5 border border-[#4d4d4d] text-stone-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white text-[#2d2a26] font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-amber-300">{item?.letter})</span>
                        <span className="truncate max-w-[180px] font-medium">{item?.text}</span>
                      </div>
                      {item?.detail && (
                        <span className="text-[10px] text-stone-400 italic">
                          {item.detail}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Explanation & Didactic context */}
            <div className="space-y-2">
              <div className="text-xs text-stone-200 leading-relaxed bg-[#3d3d3d] p-2.5 border border-[#4d4d4d]">
                <span className="font-bold text-amber-300 block mb-0.5 flex items-center gap-1 font-sans uppercase tracking-wider text-[11px]">
                  <Info className="w-3.5 h-3.5 text-amber-300 inline" />
                  Explicación Histórica:
                </span>
                {card.explanation}
              </div>

              {card.historicalContext && (
                <div className="text-[11px] text-amber-200 leading-snug italic bg-[#1d3557]/80 p-2 border border-white/20">
                  <span className="font-bold text-amber-300 not-italic uppercase tracking-wide">
                    Dato Histórico:{' '}
                  </span>
                  {card.historicalContext}
                </div>
              )}
            </div>
          </div>

          {/* Back Footer */}
          <div className="p-3 border-t-2 border-[#fdfaf5]/20 bg-[#1d3557] flex items-center justify-between">
            <span className="text-xs font-sans uppercase font-bold text-white">
              Valor: <strong className="text-amber-300 font-mono">{card.points} pts</strong>
            </span>
            <button
              onClick={handleFlip}
              className="px-3.5 py-1.5 bg-[#fdfaf5] hover:bg-white text-[#2d2a26] font-bold text-xs uppercase tracking-wider border border-[#2d2a26] shadow-bento-sm flex items-center gap-1.5 transition-all active:translate-y-0.5"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#1d3557]" />
              Volver a la Pregunta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
