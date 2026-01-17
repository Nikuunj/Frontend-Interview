import { GraduationCap, SquarePen } from "lucide-react";

function Navbar() {
  return (
    <div className="flex justify-between px-5 py-3 border-b border-zinc-200">
      <span className="flex gap-2 items-center font-bold text-lg">
        <span className="px-1 py-1 bg-blue-600/90 rounded-md ">
          <GraduationCap className="fill-white text-white size-5" />
        </span>
        CA MONK
      </span>
      <span className="bg-blue-600/90 px-2 py-1.5 text-white rounded-md flex items-center gap-1.5 text-sm">
        <SquarePen className="size-4" />
        <span className="hidden sm:block font-semibold">
          Write
        </span>
      </span>
    </div>
  )
}

export default Navbar
