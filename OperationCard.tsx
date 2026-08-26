import { ArrowUpRight } from 'lucide-react';
import CardGeometry from './CardGeometry';
import type { Operation } from '../data/operations';

interface OperationCardProps {
  operation: Operation;
  onOpen?: (op: Operation) => void;
}

export default function OperationCard({ operation, onOpen }: OperationCardProps) {
  const numberSubscripts: Record<string, string> = {
    '01': '1',
    '02': '2',
    '03': '3',
    '04': '4',
  };

  const sub = numberSubscripts[operation.number] || operation.number.slice(1);

  return (
    <article
      onClick={() => onOpen && onOpen(operation)}
      className="group bg-white border border-[#e8e8e8] rounded-[24px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#111111] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* Top Section: Card Meta Header & Geometric Graphic */}
      <div className="pt-6 px-6 pb-2 border-b border-[#f3f3f3] bg-[#fcfcfc]">
        {/* Top bar with 0x and status */}
        <div className="flex items-center justify-between mb-2">
          {/* Number 0₁ style */}
          <div className="flex items-baseline font-black tracking-tight text-[#080808]">
            <span className="text-[18px] leading-none">0</span>
            <span className="text-[12px] leading-none font-bold ml-[1px]">{sub}</span>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.16em] uppercase">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                operation.status === 'ACTIVE' ? 'bg-[#080808]' : 'bg-[#666666]'
              }`}
            />
            <span
              className={
                operation.status === 'ACTIVE' ? 'text-[#080808]' : 'text-[#666666]'
              }
            >
              {operation.status}
            </span>
          </div>
        </div>

        {/* Geometric 3D Artwork */}
        <div className="h-40 flex items-center justify-center">
          <CardGeometry variant={operation.id} />
        </div>
      </div>

      {/* Bottom Section: Project Information */}
      <div className="p-7 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 className="text-[15px] font-extrabold tracking-[0.04em] uppercase text-[#080808] mb-1.5 leading-snug">
            {operation.title}
          </h3>

          {/* Category */}
          <div className="text-[12px] font-medium text-[#777777] mb-4">
            {operation.category}
          </div>

          {/* Description */}
          <p className="text-[13px] text-[#555555] leading-relaxed mb-6 font-normal">
            {operation.description}
          </p>
        </div>

        {/* Tech Stack & Arrow Link */}
        <div className="flex items-end justify-between gap-3 pt-4 border-t border-[#f5f5f5]">
          <div className="text-[11px] font-medium text-[#888888] tracking-normal leading-relaxed">
            {operation.technologies.join('  ·  ')}
          </div>

          {operation.link ? (
            <a
              href={operation.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${operation.title} repository`}
              className="w-8 h-8 shrink-0 rounded-full border border-[#e0e0e0] group-hover:border-[#080808] group-hover:bg-[#080808] group-hover:text-white flex items-center justify-center text-[#080808] transition-all duration-300"
            >
              <ArrowUpRight size={15} strokeWidth={2} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <div className="w-8 h-8 shrink-0 rounded-full border border-[#e0e0e0] flex items-center justify-center text-[#999999]">
              <ArrowUpRight size={15} strokeWidth={2} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
