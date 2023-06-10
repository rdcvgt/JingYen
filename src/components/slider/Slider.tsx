"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import Image from "next/image";

interface ChildComponentProps {
	casePhotoArr: string[] | [];
}

export function PhotoSlider(props: ChildComponentProps) {
	const { casePhotoArr } = props;
	if (casePhotoArr.length === 0) {
		return <></>;
	}

	return (
		<Splide
			aria-label="Case Images"
			options={{
				rewind: true,
				width: "100vw",
				heightRatio: 0.6,
				autoHeight: true,
				gap: "1rem",
			}}>
			{casePhotoArr.map((url, index) => {
				return (
					<SplideSlide key={index}>
						<Image
							src={url}
							alt={`工程照片-${index + 1}`}
							fill={true}
							style={{ objectFit: "contain" }}
						/>
					</SplideSlide>
				);
			})}
		</Splide>
	);
}
