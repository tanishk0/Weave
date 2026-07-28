import { ArrowUp, Image, Mic, Paperclip, Type } from "lucide-react"

export const Composer = () => {

  return (
    <div className="p-4 border-2 border-zinc-300 rounded-lg flex items-center justify-between bg-white">
      <input placeholder="Paste anything here ..." className="m-2 text-md w-full outline-none border-none placeholder:font-medium placeholder:text-zinc-400" />
      <div className="flex items-center gap-2">
        <div className="flex gap-6"> 
          <Type className="h-4.5 w-4.5 text-zinc-600 stroke-[2] cursor-pointer" />
          <Image className="h-4.5 w-4.5 text-zinc-600 stroke-[2] cursor-pointer" />
          <Mic className="h-4.5 w-4.5 text-zinc-600 stroke-[2] cursor-pointer" />
          <Paperclip className="h-4.5 w-4.5 text-zinc-600 stroke-[2] cursor-pointer" />
        </div>
        <hr className="w-8 rotate-90 text-zinc-300 rounded-md" />
        <div className="btn flex items-center">
          <button className="bg-black rounded-md cursor-pointer h-10 w-10 text-white flex items-center justify-center">
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

  )
}