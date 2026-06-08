"use client";
import BookMarkAction from "@/lib/actions/BookMarkAction.action";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function BookMarkCard({
  questionId,
  saved,
}: {
  questionId: string;
  saved?: boolean;
}) {
  //   const router = useRouter();
  const [isBookmarked, setIsBookMarked] = useState(saved ?? false);
  useEffect(() => {
    setIsBookMarked(saved ?? false);
  }, [saved]);

  const clickHandle = async () => {
    try {
      const { success, data, message } = await BookMarkAction({
        questionId,
      });
      if (success && data) {
        setIsBookMarked(data.saved);
        toast.success(data.saved ? "Question saved" : "Question unsaved");
      } else {
        toast.error(message || "Failed to bookmark");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };
  return (
    <div>
      <button
        type="button"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all
    ${
      isBookmarked
        ? "bg-secondary text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
        onClick={clickHandle}
      >
        {isBookmarked ? (
          <FaBookmark size={18} />
        ) : (
          <FaRegBookmark className="text-secondary" size={18} />
        )}

        <span
          className={`text-sm font-medium ${isBookmarked ? "text-white" : "text-secondary"}`}
        >
          {isBookmarked ? "Unsave" : "Save"}
        </span>
      </button>
    </div>
  );
}

export default BookMarkCard;
