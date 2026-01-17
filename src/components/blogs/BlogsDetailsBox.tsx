import type { BlogDataType } from "./BlogsLeft"

function BlogsDetailsBox({ id, title, category, description, date, coverImage, content }: BlogDataType) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const formatContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    ));
  };
  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };
  return (
    <div className=" bg-gray-50 rounded-lg  h-screen overflow-y-auto scrollbar-hide">
      <div className="relative w-full h-96 bg-gray-900 overflow-hidden rounded-t-lg">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
            {category[0]}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-500">
            {calculateReadTime(content)}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {title}
        </h1>

        <div className="bg-gray-100 rounded-lg p-6 mb-8 grid grid-cols-3 gap-4">
          <div className="border-r  border-zinc-300">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Category</p>
            <p className="text-sm font-semibold text-gray-900">
              {category.join(' & ')}
            </p>
          </div>
          <div className="border-r  border-zinc-300">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Read Time</p>
            <p className="text-sm font-semibold text-gray-900">
              {calculateReadTime(content).split(' ')[0]} Mins
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatDate(date)}
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-800 leading-relaxed mb-8 font-medium">
          {description}
        </p>

        <div className="prose prose-lg max-w-none">
          {formatContent(content)}
        </div>

      </div>
    </div>
  );
}

export default BlogsDetailsBox
