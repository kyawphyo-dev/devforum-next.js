import Link from "next/link";

function TopTags() {
  return (
    <div className="card-wrapper p-6">
      <h2 className="text-xl font-bold mb-4">Top Tags</h2>

      <Link
        href=""
        className="space-x-2 gap-2 bg-input-background hover:bg-hover border border-border rounded-md px-3 py-1.5 transition-all duration-200 cursor-pointer group"
      >
        <span className="text-sm font-medium text-secondary-text group-hover:text-main-text">
          Laravel
        </span>
        <span className="text-[10px] px-1.5 py-0.5 bg-primary/50 text-text-muted rounded-full">
          20
        </span>
      </Link>
    </div>
  );
}
export default TopTags;
