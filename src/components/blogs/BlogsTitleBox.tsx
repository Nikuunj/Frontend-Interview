function BlogsTitleBox({ id, category, title, description, date, updateId, blogId }: { id: number, category: string[], title: string, description: string, updateId: (val: number) => void, blogId: number, date: string }) {

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      FINANCE: "📈",
      CAREER: "🎓",
      REGULATIONS: "📋",
      SKILLS: "💡",
      TECHNOLOGY: "💻"
    };
    return icons[category] || "📄";
  };

  return (
    <div
      onClick={() => updateId(id)}
      className={`bg-white rounded-lg p-4 cursor-pointer transition-all  min-w-[280px] hover:shadow-md border-l-4 ${blogId === id ? 'border-indigo-600 shadow-md' : 'border-transparent'
        } `}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase">
          <span>{getCategoryIcon(category[0])}</span>
          <span className="font-semibold">{category[0]}</span>
        </div>
        <span className="text-xs text-gray-400">{getTimeAgo(date)}</span>
      </div>

      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

    </div>
  )
}

export default BlogsTitleBox
