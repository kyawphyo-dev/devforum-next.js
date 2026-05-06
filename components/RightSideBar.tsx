import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const topQuestions = [
  {
    id: 1,
    title: "How to center a div in Tailwind CSS?",
    link: "/questions/1",
  },
  {
    id: 2,
    title: "Best practices for React 19 server components",
    link: "/questions/2",
  },
  { id: 3, title: "Next.js 15 vs 14: What's new?", link: "/questions/3" },
  {
    id: 4,
    title: "How to implement authentication in Next.js?",
    link: "/questions/4",
  },
  {
    id: 5,
    title: "Handling state in complex React forms",
    link: "/questions/5",
  },
];

const popularTags = [
  { id: 1, name: "React", count: 120 },
  { id: 2, name: "Next.js", count: 85 },
  { id: 3, name: "Tailwind", count: 64 },
  { id: 4, name: "Typescript", count: 52 },
  { id: 5, name: "CSS", count: 41 },
];

function RightSideBar() {
  return (
    <div className="flex flex-col gap-10 my-12 px-6">
      {/* Top Questions Section */}
      <section className="flex flex-col gap-5">
        <h3 className="text-xl font-bold text-main-text border-b border-border pb-3">
          Top Questions
        </h3>
        <div className="flex flex-col gap-4">
          {topQuestions.map((question) => (
            <Link
              key={question.id}
              href={question.link}
              className="group flex items-start justify-between gap-3 text-secondary-text hover:text-lg hover:text-accent hover:-translate-x-1 hover:pb-3 border-border transition-all duration-300 cursor-pointer"
            >
              <span className="text-sm leading-snug line-clamp-2">
                {question.title}
              </span>
              <FaChevronRight className="mt-1 text-xs text-border group-hover:text-accent shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tags Section */}
      <section className="flex flex-col gap-5">
        <h3 className="text-xl font-bold text-main-text border-b border-border pb-3">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.name.toLowerCase()}`}
              className="flex items-center justify-between gap-2 bg-input-background hover:bg-hover border border-border rounded-md px-3 py-1.5 transition-all duration-200 cursor-pointer group"
            >
              <span className="text-xs font-medium text-secondary-text group-hover:text-main-text">
                {tag.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-primary/50 text-text-muted rounded-full">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Community Stats (Optional but good) */}
      <section className="bg-card-background border border-border rounded-xl p-5 flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-main-text">
          Community Stats
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-accent">1.2k</span>
            <span className="text-[10px] uppercase tracking-wider text-text-muted">
              Questions
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-accent">5.4k</span>
            <span className="text-[10px] uppercase tracking-wider text-text-muted">
              Members
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RightSideBar;
