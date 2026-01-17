import Blogs from "./components/blogs/Blogs"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div >
      <Navbar />
      <div className="py-7 flex flex-col items-center gap-1 sm:gap-4 px-4">
        <h1 className="font-extrabold text-2xl sm:text-[40px]">
          CA Monk Blog
        </h1>
        <p className="text-gray-500 max-w-lg text-center text-balance text-xs sm:text-base">
          Stay updated with the latest trend in finance, accounting and career growth
        </p>
      </div>
      <Blogs />
    </div>
  )
}

export default App
