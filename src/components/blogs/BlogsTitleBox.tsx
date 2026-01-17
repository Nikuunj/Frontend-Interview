function BlogsTitleBox({ id, category, title, description, updateId }: { id: number, category: string[], title: string, description: string, updateId: (val: number) => void }) {
  return (
    <div>{id}title
      <span onClick={() => updateId(id)}>
        click me
      </span>
    </div>
  )
}

export default BlogsTitleBox
