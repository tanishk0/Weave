import { ArrowRight } from "lucide-react";
import Link from "next/link";

type GetStartedProps = {
  text: string;
  showArrow?: boolean;
};

export default function GetStarted({
  text,
  showArrow = false,
}: GetStartedProps) {
  return (
    <Link href="/signup" >
      <div className="flex cursor-pointer items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm text-white">
        {text}
        {showArrow && <ArrowRight size={16} />}
      </div>
    </Link>
  );
}