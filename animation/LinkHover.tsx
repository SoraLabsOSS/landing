import Link from "next/link";
import { TLinkHoverProps } from "@/types";

export default function LinkHover({ href, title, className }: TLinkHoverProps) {
  return (
    <div className="min-w-0 max-w-full">
      <Link
        className={`relative inline-block max-w-full font-NeueMontreal text-secondry before:absolute before:left-0 before:block before:w-full before:bg-secondry before:content-[''] before:origin-left before:scale-x-0 before:transition before:duration-[0.6s] before:ease-[cubic-bezier(0.19,1,0.22,1)] after:absolute after:left-0 after:block after:w-full after:bg-secondry after:content-[''] after:origin-right after:scale-x-100 after:transition after:duration-[0.6s] after:ease-[cubic-bezier(0.19,1,0.22,1)] after:delay-[0.25s] hover:before:scale-x-100 hover:before:delay-[0.25s] hover:after:scale-x-0 hover:after:delay-0 ${className ?? ""}`}
        href={href}
      >
        {title}
      </Link>
    </div>
  );
}
