import { useQuery } from "@tanstack/react-query"
import BlogsDetailsBox from "./BlogsDetailsBox"
import axios from "axios"
import type { BlogDataType } from "./BlogsLeft";

function BlogsRight({ blogId }: { blogId: number }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['fetchBlogDetails', blogId],
    queryFn: async (): Promise<BlogDataType> => {
      const req = await axios.get(`http://localhost:3001/blogs/${blogId}`);
      return req.data;
    }
  })

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div>
        is error
      </div>
    )
  }

  return (
    <div >
      <BlogsDetailsBox
        id={data.id}
        title={data.title}
        category={data.category}
        description={data.description}
        content={data.content}
        date={data.date}
        coverImage={data.coverImage}
      />
    </div>
  )
}

export default BlogsRight
