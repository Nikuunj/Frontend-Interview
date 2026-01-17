import { useState } from "react"
import BlogsLeft from "./BlogsLeft"
import BlogsRight from "./BlogsRight"

function Blogs() {
  const [blogId, setBlogId] = useState<number>(1);
  return (
    <div>
      <BlogsLeft updateId={(number) => { setBlogId(number) }} />
      <BlogsRight blogId={blogId} />
    </div>
  )
}

export default Blogs
