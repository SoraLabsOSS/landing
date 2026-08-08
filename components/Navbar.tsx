"use client";

import Link from "next/link";
import { useState } from "react";
import { navVariants } from "@/motion";
import { TextHover } from "@/animation";
import { navbarItems } from "@/constants";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import MobileNav from "./MobileNav";

export default function Navbar() {
	const [hidden, setHidden] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious();
		if (previous && latest > previous) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	});

	return (
		<>
			<motion.nav
				variants={navVariants}
				className="w-full h-[8vh] padding-x fixed top-0 left-0 z-50 backdrop-blur-[7px] flex items-center justify-between sm:hidden xm:hidden md:hidden"
				animate={hidden ? "hidden" : "vissible"}>
				<div className="w-[50%]">
					<Link
						href="/"
						className="paragraph font-semibold font-NeueMontreal text-secondry uppercase tracking-tight">
						Soralabs
					</Link>
				</div>
				<div className="flex gap-x-[20px] w-[50%]">
					{navbarItems.map((item) =>
						item.disabled ? (
							<span
								key={item.id}
								aria-disabled="true"
								className={`w-fit paragraph font-medium font-NeueMontreal text-secondry/35 capitalize cursor-not-allowed select-none ${
									item.id === 5 && "ml-auto"
								}`}>
								{item.title}
							</span>
						) : (
							<Link
								key={item.id}
								className={`w-fit paragraph font-medium font-NeueMontreal text-secondry capitalize flex flex-col hover ${
									item.id === 5 && "ml-auto"
								}`}
								href={item.href}>
								<TextHover
									titile1={item.title}
									titile2={item.title}
								/>
							</Link>
						),
					)}
				</div>
			</motion.nav>
			<MobileNav />
		</>
	);
}
