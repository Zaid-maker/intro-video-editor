"use client";

import React from "react";
import { templates } from "@/lib/data";
import { IMAGES } from "../../../../assets/Images";
import Link from "next/link";
import Image from "next/image";

function Template() {
	return (
		<div className="p-6">
			<h2 className="text-white text-2xl font-semibold mb-6">
				Start with Templates
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
				{templates.map((template, index: number) => {
					const src = IMAGES[`previewPic${index + 1}` as keyof typeof IMAGES];
					return (
						<Link
							key={template.id}
							href={`/editor`}
							className="rounded-xl cursor-pointer"
						>
							<div className="w-full rounded-lg overflow-hidden mb-3">
								{src ? (
									<Image
										src={src}
										alt={template.id}
										height={100}
										width={100}
										className="w-full h-auto hover:scale-125 transition-all ease-in-out object-contain"
									/>
								) : (
									<div className="w-full h-[100px] bg-gray-800 flex items-center justify-center text-gray-400">
										No Preview
									</div>
								)}
							</div>
							<p className="text-white text-center font-medium text-base">
								{template.id}
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default Template;
