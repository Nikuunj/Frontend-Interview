import { GraduationCap, SquarePen } from "lucide-react";
import { useState } from "react";
import BlogCreateForm from "./blogs/BlogCreateForm";

function Navbar() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className="flex justify-between px-5 py-3 border-b border-zinc-200 bg-white sticky  top-0 w-full z-10">
      <span className="flex gap-2 items-center font-bold text-lg">
        <span className="px-1 py-1 bg-blue-600/90 rounded-md ">
          <GraduationCap className="fill-white text-white size-5" />
        </span>
        CA MONK
      </span>
      <span className="bg-blue-600/90 px-2 py-1.5 text-white rounded-md flex items-center gap-1.5 text-sm" onClick={() => setVisible(true)}>
        <SquarePen className="size-4" />
        <span className="hidden sm:block font-semibold">
          Write
        </span>
      </span>
      {visible && <BlogCreateForm onClose={() => setVisible(false)} />}
    </div>
  )
}

export default Navbar
