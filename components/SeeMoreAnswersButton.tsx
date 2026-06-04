"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SeeMoreAnswersButton({ remaining }: { remaining: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("showAll", "true");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-center pt-2">
      <button
        type="button"
        onClick={handleClick}
        className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-main-text transition-colors hover:border-accent hover:text-accent"
      >
        See more ({remaining} {remaining === 1 ? "answer" : "answers"})
      </button>
    </div>
  );
}

export default SeeMoreAnswersButton;
