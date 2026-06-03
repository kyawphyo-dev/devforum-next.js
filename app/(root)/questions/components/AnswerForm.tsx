"use client";

import Editor from "@/components/Editor";
import { IAnswerDoc } from "@/database/answer.model";
import { CreateAnswer } from "@/lib/actions/CreateAnswer.action";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AnswerForm({ questionId }: { questionId: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log(content);
    try {
      const { data, success, message } = await CreateAnswer({
        questionId,
        content,
      });
      if (success) {
        toast.success("Answer submitted successfully");
        setContent("");
        setIsSubmitting(false);

        router.push(ROUTES.QUESTION_DETAILS(questionId));

        return;
      } else {
        toast.error(message || "Failed to submit answer");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
      setIsSubmitting(false);
    } finally {
      setContent("");
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* CONTENT */}
      <div className="flex flex-col gap-3">
        <label className="text-lg font-semibold text-main-text">
          Detailed Answer
        </label>

        <p className="text-secondary-text text-xs italic">
          Please answer the question in detail.
        </p>

        <Editor value={content} onChange={(v) => setContent(v)} />
      </div>
      {/* SUBMIT BUTTON */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent hover:bg-hover text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Answer"}
        </button>
      </div>
    </form>
  );
}

export default AnswerForm;
