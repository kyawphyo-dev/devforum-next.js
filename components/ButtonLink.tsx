import Link from "next/link";
import { IconType } from "react-icons";

interface ButtonProps {
  icon?: IconType;
  children?: React.ReactNode;
  style?: "normal" | "outline";
  href?: string;
}

function ButtonLink({ icon: Icon, children, style, ...props }: ButtonProps) {
  return (
    <Link
      href={props.href || ""}
      {...props}
      className={`w-full flex h-10 items-center justify-center rounded-md border border-border  px-4 py-2 text-sm font-medium text-main-text  transition-colors ${style === "outline" ? "bg-outline-border text-white hover:bg-secondary" : " bg-accent hover:bg-blue-600"}`}
    >
      {Icon && <Icon className="text-lg me-2" />}
      {children}
    </Link>
  );
}

export default ButtonLink;
