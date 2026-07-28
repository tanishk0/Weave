"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, MoreVertical, Pencil, Trash2 } from "lucide-react";

interface PlaybookItemProps {
  id: string;
  name: string;
}

export function PlaybookItem({
  id,
  name,
}: PlaybookItemProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const href = `/playbooks/${id}`;
  const active = pathname === href;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      className={`group relative flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition ${
        active ? "bg-zinc-100 font-medium" : "hover:bg-zinc-200"
      }`}
    >
      <Link href={href} className="flex items-center gap-2 min-w-0 flex-1">
        <BookOpen size={14} className="shrink-0 text-zinc-600" />
        <span className="truncate text-md">{name}</span>
      </Link>

      <div className="relative flex items-center" ref={menuRef}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className={`p-1 rounded hover:bg-zinc-300/60 transition text-zinc-600 ${
            menuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          aria-label="More options"
        >
          <MoreVertical size={14} />
        </button>

        {menuOpen && (
          <div
            className="absolute right-7 top-0 w-32 rounded-md border border-zinc-200 bg-white py-1 shadow-lg z-50 text-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-zinc-700 hover:bg-zinc-100 transition"
            >
              <Pencil size={13} />
              <span>Rename</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-red-600 hover:bg-red-50 transition"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

