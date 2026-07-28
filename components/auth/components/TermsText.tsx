import Link from "next/link";

export const TermsText = () => {
  return (
    <p className="text-center text-[13px] text-zinc-500 font-normal leading-relaxed mt-6">
      By creating an account, you agree to our{" "}
      <br/>
      <Link href="/terms" className="text-zinc-500 underline underline-offset-2 hover:text-black transition-colors font-semibold">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="text-zinc-500 underline underline-offset-2 hover:text-black transition-colors font-semibold">
        Privacy Policy
      </Link>
      .
    </p>
  );
};
