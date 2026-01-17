import { useState } from "react"
import BlogsLeft from "./BlogsLeft"
import BlogsRight from "./BlogsRight"

function Blogs() {
  const [blogId, setBlogId] = useState<number>(1);
  return (
    <div className="flex flex-col md:flex-row h-fit overflow-hidden  justify-center gap-5 py-10 px-5">
      <BlogsLeft updateId={(number) => { setBlogId(number) }} blogId={blogId} />
      <BlogsRight blogId={blogId} />
    </div>
  )
}

export default Blogs
