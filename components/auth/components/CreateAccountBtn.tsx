import { LucideArrowRight, Loader2 } from "lucide-react";

type CreateAccountBtnProps = {
  isLoading?: boolean;
};

export const CreateAccountBtn = ({
  isLoading = false,
}: CreateAccountBtnProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="flex w-full mb-4 items-center justify-center gap-2 h-11 rounded-lg bg-black px-4 text-sm text-white shadow-xs transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer mt-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Creating account...</span>
        </>
      ) : (
        <>
          <span>Create account</span>
          <LucideArrowRight className="w-4 h-4 stroke-[2] ml-2" />
        </>
      )}
    </button>
  );
};