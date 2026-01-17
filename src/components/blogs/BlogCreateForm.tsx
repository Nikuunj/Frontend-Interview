
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface BlogFormData {
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const inputStyles =
  "w-full border border-zinc-300 px-4 py-3 rounded outline-none " +
  "focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20";

function BlogCreateForm({ onClose }: { onClose: () => void }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const availableCategories = [
    { name: "FINANCE", icon: "📈" },
    { name: "CAREER", icon: "🎓" },
    { name: "REGULATIONS", icon: "📋" },
    { name: "SKILLS", icon: "💡" },
    { name: "TECHNOLOGY", icon: "💻" },
  ];

  // Cloudinary upload
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    return res.data.secure_url;
  };

  const mutation = useMutation({
    mutationFn: async (data: BlogFormData) => {
      const res = await axios.post(`${API_BASE_URL}/blogs`, data);
      return res.data;
    },
    onSuccess: () => {
      alert("Blog published successfully!");
      onClose();
    },
    onError: () => {
      alert("Failed to publish blog");
    },
  });

  const toggleCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageUrl = await uploadToCloudinary(file);
      setImagePreview(imageUrl);
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = () => {
    const title = titleRef.current?.value || "";
    const description = descriptionRef.current?.value || "";
    const content = contentRef.current?.value || "";
    const date = dateRef.current?.value || "";

    if (!title || !description || !content || categories.length === 0) {
      alert("Fill all required fields");
      return;
    }

    const data: BlogFormData = {
      title,
      description,
      content,
      date: new Date(date).toISOString(),
      coverImage:
        imagePreview ||
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
      category: categories,
    };

    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg scrollbar-hide ">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center border-zinc-300">
          <h2 className="text-2xl font-bold">Create Blog</h2>
          <button onClick={onClose} disabled={mutation.isPending}>
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cover Image */}
          <div className="space-y-2">
            <label className="font-semibold text-sm">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploadingImage || mutation.isPending}
              className={inputStyles}
            />

            {uploadingImage && (
              <p className="text-sm text-indigo-600">Uploading image...</p>
            )}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-64 object-cover rounded border border-zinc-300"
              />
            )}
          </div>

          {/* Title */}
          <div>
            <label className="font-semibold text-sm">Title *</label>
            <input
              ref={titleRef}
              type="text"
              className={`${inputStyles} text-xl font-bold`}
            />
          </div>

          {/* Categories */}
          <div>
            <label className="font-semibold text-sm">Categories *</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-2">
              {availableCategories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => toggleCategory(cat.name)}
                  className={`border border-zinc-300 rounded px-3 py-2 text-xs font-semibold
                    ${categories.includes(cat.name)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "hover:bg-zinc-100"
                    }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold text-sm">Date *</label>
            <input
              ref={dateRef}
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className={inputStyles}
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-sm">Description *</label>
            <textarea
              ref={descriptionRef}
              rows={3}
              className={inputStyles}
            />
          </div>

          {/* Content */}
          <div>
            <label className="font-semibold text-sm">Content *</label>
            <textarea
              ref={contentRef}
              rows={10}
              className={`${inputStyles} font-mono text-sm`}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="border border-zinc-300 px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={mutation.isPending || uploadingImage}
              className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-60"
            >
              {mutation.isPending ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCreateForm;

