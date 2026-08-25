import OperationCard from './OperationCard';
import { operations, type Operation } from '../data/operations';

interface OperationsSectionProps {
  selectedDomain?: string | null;
  onOpenModal?: (operation: Operation) => void;
  onResetDomain?: () => void;
}

export default function OperationsSection({
  selectedDomain,
  onOpenModal,
  onResetDomain,
}: OperationsSectionProps) {
  const filteredOperations = selectedDomain
    ? operations.filter((op) => op.domain === selectedDomain)
    : operations;

  return (
    <section id="operations" className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-4 pb-20">
      <div className="flex flex-col xl:flex-row items-start gap-12 lg:gap-14">
        {/* Left Intro (approximately 25-28%) */}
        <div className="w-full xl:w-[280px] shrink-0">
          {/* Eyebrow */}
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#999999] mb-4 flex items-center justify-between">
            <span>FEATURED WORK</span>
            {selectedDomain && (
              <button
                onClick={onResetDomain}
                className="text-[9px] uppercase font-mono text-[#080808] underline cursor-pointer"
              >
                Clear filter [x]
              </button>
            )}
          </div>

          {/* Heading */}
          <h2 className="text-[38px] md:text-[44px] font-[900] tracking-[-0.03em] uppercase leading-[0.95] text-[#080808] mb-6">
            SELECTED<br />OPERATIONS
          </h2>

          {/* Description */}
          <p className="text-[14px] text-[#666666] leading-relaxed mb-8 max-w-[280px]">
            {selectedDomain
              ? `Filtered domain: ${selectedDomain.toUpperCase()}. Click any project card to open interactive threat simulator.`
              : 'A collection of offensive security research, red teaming toolkits, and defensive engineering tools.'}
          </p>

          {/* View All Operations CTA */}
          <a
            href="https://github.com/sudhir734"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#080808] pb-1 border-b border-[#080808] hover:opacity-70 transition-opacity"
          >
            VIEW ALL REPOSITORIES
            <span className="text-[8px] transform group-hover:translate-x-1 transition-transform">◆</span>
          </a>
        </div>

        {/* Right Cards Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredOperations.map((op) => (
            <OperationCard key={op.id} operation={op} onOpen={onOpenModal} />
          ))}
        </div>
      </div>
    </section>
  );
}
