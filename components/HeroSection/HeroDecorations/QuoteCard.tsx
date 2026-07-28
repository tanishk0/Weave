import { Quote } from "lucide-react";

export const QuoteCard = () => {
  return (
    <div className="relative inline-block select-none">
      {/* Quote Card (Strict Square) */}
      <div className="relative w-48 h-40 bg-[#f3effe] p-6 rounded-2xl shadow-sm border border-[#e7defd]/60 flex flex-col justify-between">
        {/* Quote Mark */}
        <div className="text-zinc-600 font-serif text-4xl font-bold leading-none select-none">
          “
        </div>

        {/* Quote Content */}
        <div className="space-y-1">
          <p className="text-zinc-800 font-medium text-[15px] leading-tight">
            Search less.
          </p>
          <p className="text-zinc-800 font-medium text-[15px] leading-tight">
            Remember more.
          </p>
          <div className="relative inline-block">
            <p className="text-zinc-800 font-medium text-[15px] leading-tight">
              Do better.
            </p>
            {/* Lavender Underline Brush */}
            <svg
              className="absolute -bottom-1.5 left-0 w-full h-2 text-[#c3aafd]"
              viewBox="0 0 80 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.5C20 2.5 55 6.5 79 3"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;