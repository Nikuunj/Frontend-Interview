import type { BlogDataType } from "./BlogsLeft"

function BlogsDetailsBox({ id, title, category, description, date, coverImage, content }: BlogDataType) {
  return (
    <div>
      {id}
      {title}
      {category}
    </div>
  )
}

export default BlogsDetailsBox
