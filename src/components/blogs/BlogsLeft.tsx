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

function BlogsLeft({ updateId }: { updateId: (val: number) => void }) {
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
    description={val.description}
    category={val.category}
    updateId={updateId}
  />)
  return (
    <div>
      {renderBlog}
    </div>
  )
}

export default BlogsLeft
