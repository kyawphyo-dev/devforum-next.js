import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Code } from "bright";
Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light",
};

function Preview({ content }: { content: string }) {
  return (
    <div
      className="prose
    prose-invert
    max-w-none
    "
    >
      <MDXRemote
        source={content}
        components={{
          h1: (props) => (
            <h1
              {...props}
              className="text-4xl font-bold text-gray-100 mt-8 mb-4"
            />
          ),

          h2: (props) => (
            <h2
              {...props}
              className="text-3xl font-semibold text-gray-100 mt-6 mb-3"
            />
          ),

          h3: (props) => (
            <h3
              {...props}
              className="text-2xl font-semibold text-gray-100 mt-4 mb-2"
            />
          ),

          p: (props) => (
            <p {...props} className="text-gray-400 leading-7 mb-4" />
          ),

          ul: (props) => (
            <ul {...props} className="list-disc pl-6 text-gray-400 mb-4" />
          ),

          ol: (props) => (
            <ol {...props} className="list-decimal pl-6 text-gray-400 mb-4" />
          ),

          li: (props) => <li {...props} className="mb-1" />,

          a: (props) => (
            <a
              {...props}
              className="text-blue-400 underline hover:text-blue-400"
            />
          ),

          code: (props) => (
            <code
              {...props}
              className="bg-gray-800 px-1 py-0.5 rounded text-sm"
            />
          ),

          pre: (props) => (
            <Code {...props} lineNumbers className="shadow-light-200" />
          ),
        }}
      />
    </div>
  );
}

export default Preview;
