"use client";
import Editor from "@/components/Editor";
import { useState } from "react";

function QuestionForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your API call here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 p-8 rounded-xl border border-border shadow-2xl max-w-4xl mx-auto my-12"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold text-main-text">
          Ask a Question
        </h1>
        <p className="text-secondary-text text-sm">
          Be specific and imagine you’re asking a question to another person.
        </p>
      </div>

      {/* Title Field */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="title"
          className="text-lg font-semibold text-main-text flex items-center gap-2"
        >
          Question Title
          <span className="text-danger text-2xl font-normal">*</span>
        </label>
        <p className="text-secondary-text text-xs italic">
          What’s the main problem you’re facing?
        </p>
        <input
          id="title"
          type="text"
          placeholder="e.g. How do I center a div in Tailwind CSS?"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="bg-input-background border border-border text-main-text rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
        />
      </div>

      {/* Tags Field */}
      <div className="flex flex-col gap-3">
        <label htmlFor="tags" className="text-lg font-semibold text-main-text">
          Tags
        </label>
        <p className="text-secondary-text text-xs italic">
          Add up to 5 tags to describe what your question is about. Separate
          with commas.
        </p>
        <input
          id="tags"
          type="text"
          placeholder="e.g. react, nextjs, tailwind"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="bg-input-background border border-border text-main-text rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
        />
      </div>

      {/* Editor Content Field */}
      <div className="flex flex-col gap-3">
        <label className="text-lg font-semibold text-main-text">
          Detailed Explanation
        </label>
        <p className="text-secondary-text text-xs italic mb-2">
          Include all the information someone would need to answer your
          question.
        </p>
        <Editor
          value={formData.content}
          onChange={(v) => setFormData({ ...formData, content: v })}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-accent hover:bg-hover text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg mt-4"
      >
        Post Your Question
      </button>
    </form>
  );
}

export default QuestionForm;
