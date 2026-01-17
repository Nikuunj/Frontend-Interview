import { useQuery } from "@tanstack/react-query"
import BlogsTitleBox from "./BlogsTitleBox"
import axios from 'axios'

export interface BlogDataType {
  id: string;
  title: string;
  category: string[];
  description: string,
  date: string;
  coverImage: string;
  content: string;
}

function BlogsLeft({ updateId, blogId }: { updateId: (val: number) => void, blogId: number }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['fetchData'],
    queryFn: async (): Promise<BlogDataType[]> => {
      const req = await axios.get('http://localhost:3001/blogs');
      return req.data
    }
  })

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        is error
      </div>
    )
  }
  const renderBlog = data?.map((val: BlogDataType, idx: number) => <BlogsTitleBox
    key={idx}
    id={Number(val.id)}
    title={val.title}
    date={val.date}
    description={val.description}
    category={val.category}
    updateId={updateId}
    blogId={blogId}
  />)
  return (
    <div>
      <p className="font-bold text-2xl   pb-6">
        Articles
      </p>
      <div className="flex md:flex-col w-screen  pe-7   overflow-x-auto md:overflow-y-auto md:max-w-sm md:space-y-6 md:space-x-0 space-x-6 scrollbar-hide">
        {renderBlog}
      </div>
    </div>
  )
}

export default BlogsLeft
