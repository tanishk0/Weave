import { LucideIcon } from "lucide-react"

type AuthInputProps = {
  label: string;
  Icon: LucideIcon;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AuthInput = (
    {label, Icon, placeholder, type = "text", name, value, required = false, onChange}: AuthInputProps) => {
    return (
        <div className="flex flex-col w-full gap-1.5">
            <label htmlFor={name} className="text-xs sm:text-[13px] font-semibold text-zinc-800">
                {label}
            </label>
            <div className="flex items-center gap-2.5 h-10 px-3.5 border-2 border-zinc-200 rounded-lg bg-white focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-100 transition-all">
                <Icon className="w-4 h-4 text-zinc-700 shrink-0 stroke-[2.25]" />
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    required={required}
                    onChange={onChange}
                    className="w-full text-[13px] text-zinc-700 placeholder:font-semibold bg-transparent outline-none"
                />
            </div>
        </div>
    )
}