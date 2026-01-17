import { useQuery } from "@tanstack/react-query"
import BlogsDetailsBox from "./BlogsDetailsBox"
import axios from "axios"
import type { BlogDataType } from "./BlogsLeft";

function BlogsRight({ blogId }: { blogId: number }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['fetchBlogDetails', blogId],
    queryFn: async (): Promise<BlogDataType> => {
      const req = await axios.get(`http://localhost:3001/blogs/${blogId}`);
      if (req.data) {
        return req.data;
      }
      throw Error('Not found')
    }
  })

  if (isLoading) {
    <div>
      Loading...
    </div>
  }
  if (isError) {
    <div>
      is error
    </div>
  }
  return (
    <div>
      <BlogsDetailsBox
        id={data.id}
      />
    </div>
  )
}

export default BlogsRight
