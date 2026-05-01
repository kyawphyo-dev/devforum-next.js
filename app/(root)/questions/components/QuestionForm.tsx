"use client";
import Editor from "@/components/Editor";
import { useState } from "react";

function QuestionForm() {
  const [value, setValue] = useState("");
  return (
    <>
      <Editor
        value={value}
        onChange={(v) => setValue(v)}
        label="ANY QUESTIONS?"
      />
    </>
  );
}

export default QuestionForm;
