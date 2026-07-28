import { Search } from "lucide-react"

export const SearchBar = () => {
    return (
        <div className="p-3 flex gap-3 border-2 border-zinc-300 rounded-md items-center bg-white w-72">
            <Search className="w-4 h-4 text-zinc-500 stroke-[2.5]" />
            <input type="text" 
                placeholder="Search anything..."
                className="outline-none bg-transparent text-sm placeholder:font-medium placeholder:text-zinc-400"
            />
        </div>
    )
}