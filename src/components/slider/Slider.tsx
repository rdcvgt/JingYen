"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import Image from "next/image";
import first from "../../photo/1.jpg";
import second from "../../photo/2.webp";
import third from "../../photo/3.webp";

export function PhotoSlider() {
	return (
		<Splide
			aria-label="My Favorite Images"
			options={{
				rewind: true,
				width: "100vw",
				heightRatio: 0.6,
				autoHeight: true,
				gap: "1rem",
			}}>
			<SplideSlide>
				<Image
					src={first}
					alt="Image 1"
					fill={true}
					style={{ objectFit: "contain" }}
				/>
			</SplideSlide>
			<SplideSlide>
				<Image
					src={second}
					alt="Image 2"
					fill={true}
					style={{ objectFit: "contain" }}
				/>
			</SplideSlide>
			<SplideSlide>
				<Image
					src={third}
					alt="Image 2"
					fill={true}
					style={{ objectFit: "contain" }}
				/>
			</SplideSlide>
		</Splide>
	);
}
