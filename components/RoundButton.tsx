import Link from "next/link";
import Rounded from "./Rounded";
import { ArrowUpRight } from "lucide-react";

export default function RoundButton({
	href,
	title,
	className,
	bgcolor,
	style,
	disabled = false,
}: {
	href: string;
	title: string;
	className?: string;
	bgcolor: string;
	style: React.StyleHTMLAttributes<HTMLDivElement>["style"];
	disabled?: boolean;
}) {
	const inner = (
		<Rounded
			className="py-[6px]"
			backgroundColor={bgcolor}>
			<p
				className="z-10 px-[10px] ml-[15px] py-[6px]"
				style={style}>
				{title}
			</p>
			<div
				className={`p-[10px] rounded-full scale-[0.3] mr-[10px] group-hover:scale-[0.9] transition-all z-10 transform duration-[0.3s] ease-[.215,.61,.355,1] ${className}`}>
				<ArrowUpRight
					strokeWidth={1.5}
					size={30}
					className="scale-[0] group-hover:scale-[1]"
				/>
			</div>
		</Rounded>
	);

	if (disabled) {
		return (
			<span
				aria-disabled="true"
				className="small-text uppercase font-normal font-NeueMontreal opacity-40 cursor-not-allowed select-none pointer-events-none">
				{inner}
			</span>
		);
	}

	return (
		<Link
			className="small-text uppercase font-normal font-NeueMontreal"
			href={href}>
			{inner}
		</Link>
	);
}
