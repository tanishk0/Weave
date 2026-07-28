import { AuthInput } from "./AuthInput"
import { User } from "lucide-react"

export function AuthCard({children}: {children: React.ReactNode}){
    return (
        <div className="w-[520px] bg-white border border-zinc-200 shadow-sm rounded-xl px-10 py-8  flex flex-col">
            {children}
        </div>
    )
}