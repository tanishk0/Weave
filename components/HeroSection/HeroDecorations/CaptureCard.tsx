import { Type, Image, Mic} from "lucide-react"

const captureOptions = [
  {
    label: "Text",
    Icon: Type,
    bg: "bg-purple-100",
  },
  {
    label: "Image",
    Icon: Image,
    bg: "bg-green-100",
  },
  {
    label: "Voice",
    Icon: Mic,
    bg: "bg-yellow-100",
  },
];

export const CaptureCard = () => {
    return (
        <div className="flex flex-col border border-gray-200 rounded-2xl w-40 p-2 bg-white shadow-md shadow-zinc-200">
        <h2 className="mb-1 text-zinc-500 text-sm font-medium p-2">Capture from</h2>
        <div className="flex flex-col justify-between">
            <div className="flex gap-2 bg-purple-100 p-2 rounded-lg items-center">
                <Type className="h-8 w-8 text-zinc-700 bg-purple-100 p-2 rounded-lg" />
                <p className="ml-2 text-xs text-black">Text</p>
            </div>
            <div className="flex gap-2 p-2 rounded-lg items-center">
                <Image className="h-8 w-8 text-zinc-700 bg-green-100 p-2 rounded-lg" />
                <p className="ml-2 text-xs text-black">Image</p>
            </div>
            <div className="flex gap-2 p-2 rounded-lg items-center">
                <Mic className="h-8 w-8 text-zinc-700 bg-yellow-100 p-2 rounded-lg"/>
                <p className="ml-2 text-xs text-black">Voice</p>
            </div>
        </div>
    </div>
    )
}