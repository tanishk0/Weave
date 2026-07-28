import { Folder } from "lucide-react";

export const PlaybookCard = () => {
  const items = [
    { label: "Brand Positioning", color: "bg-[#b09efe]" },
    { label: "Visual Identity", color: "bg-[#86efac]" },
    { label: "Tone of Voice", color: "bg-[#fde047]" },
    { label: "Inspiration", color: "bg-[#f472b6]" },
  ];

  return (
    <div className="relative inline-block select-none w-56">
      {/* Folder Back Tab at Top-Left */}
      <div className="absolute -top-4 left-0 w-24 h-7 bg-[#f6ebd4] rounded-tl-2xl rounded-tr-xl border-t border-l border-r border-[#eadcc0]" />

      {/* Main Playbook Card Body */}
      <div className="relative w-56 bg-[#fdf9f0] p-4.5 rounded-2xl border border-[#efe3cc] shadow-md shadow-amber-950/5">
        {/* Header Section */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white rounded-xl shadow-xs border border-zinc-100 flex items-center justify-center shrink-0">
            <Folder className="w-5 h-5 text-zinc-800 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="text-zinc-800 font-semibold text-[14px] leading-tight">
              Branding Playbook
            </h3>
            <p className="text-zinc-400 text-[11px] font-medium mt-0.5">
              24 insights
            </p>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-zinc-200/50 my-3.5" />

        {/* Insights List */}
        <div className="flex flex-col gap-2.5">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
              <span className="text-zinc-600 font-medium text-xs tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaybookCard;
