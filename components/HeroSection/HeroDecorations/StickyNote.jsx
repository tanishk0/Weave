import { Sparkles } from "lucide-react";

export const StickyNoteDec = () => {
  return (
    <div className="relative inline-block select-none">
      {/* Sticky Note Card (Strict Square) */}
      <div className="relative w-48 h-48 aspect-square bg-[#e5efe6] p-6 rounded-2xl shadow-sm -rotate-4 flex flex-col justify-center">
        {/* Tape on Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#efe8d8]/65 -rotate-3 border border-white/20 pointer-events-none" />

        {/* Text Content */}
        <p className="font-caveat text-xl font-semibold leading-snug text-[#2c4e43]">
          Save ideas from<br />
          anywhere,<br />
          and let Weave<br />
          organize the<br />
          rest.
        </p>
      </div>

      {/* Sparkle Badge */}
      {/* <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-white rounded-2xl shadow-md shadow-zinc-200 border border-zinc-100/80 flex items-center justify-center -rotate-4">
        <Sparkles className="w-7 h-7 text-[#9370db]" />
      </div> */}
    </div>
  );
};

export default StickyNoteDec;