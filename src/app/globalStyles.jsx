"use client";

// globalStyles.js
import { Global, css } from "@emotion/react";
export const globalStyles = css`
	/* 全局样式规则 */

	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	body {
		margin: 0;
		padding: 0;
	}

	html,
	body {
		max-width: 100vw;
		overflow-x: hidden;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	/* 其他全局样式规则 */
`;

export const theme = {
	color: {
		white: "#ffffff",
		neutral: {
			5: "#f7f9fc",
			10: "#eff2f9",
			15: "#e7eaf4",
			20: "#d9deeb",
			30: "#bec4d5",
			40: "#9fa6bb",
			50: "#828ba2",
			60: "#656e83",
			70: "#495163",
			80: "#303848",
			90: "#1e2532",
			100: "#0f141e",
		},
		blue: {
			10: "#eaf6ff",
			20: "#c3e5fe",
			30: "#92cdfc",
			40: "#54aff8",
			50: "#1a91f0",
			60: "#1170cd",
			70: "#10529b",
			80: "#0f3871",
			90: "#0c264c",
			100: "#09162d",
		},
		indigo: {
			10: "#f1f2ff",
			20: "#dbdeff",
			30: "#bec2fe",
			40: "#9ba1fb",
			50: "#7a82f5",
			60: "#5660e8",
			70: "#343ecc",
			80: "#282b8f",
			90: "#1a1c6a",
			100: "#0e0f47",
		},
		green: {
			10: "#e7f4ed",
			20: "#c6e4d2",
			30: "#96d0ad",
			40: "#48ba75",
			50: "#339d5d",
			60: "#217d47",
			70: "#135c37",
			80: "#094025",
			90: "#042b18",
			100: "#01180d",
		},
		amber: {
			10: "#fff2cc",
			20: "#fddb8c",
			30: "#f9ba44",
			40: "#ec930c",
			50: "#cf760d",
			60: "#a85a0e",
			70: "#7f400d",
			80: "#582c0c",
			90: "#3e1d0a",
			100: "#231007",
		},
		orange: {
			10: "#feebe3",
			20: "#fdd2c0",
			30: "#fbb092",
			40: "#f68559",
			50: "#ee571d",
			60: "#bf4213",
			70: "#8b3211",
			80: "#5e240e",
			90: "#3b180b",
			100: "#1c0c06",
		},
		red: {
			10: "#ffeaec",
			20: "#ffd0d5",
			30: "#ffacb5",
			40: "#fe7d8b",
			50: "#fb4458",
			60: "#da0c22",
			70: "#a10e1d",
			80: "#6f0e19",
			90: "#470c12",
			100: "#24090c",
		},
		beige: {
			10: "#f3f1eb",
			20: "#e1ddd2",
			30: "#cbc3b3",
			40: "#afa58f",
			50: "#968a70",
			60: "#776d59",
			70: "#575041",
			80: "#3c372d",
			90: "#27241d",
			100: "#15130f",
		},
	},
	display: {
		center: css`
			display: flex;
			justify-content: center;
			align-items: center;
		`,
	},

	font: {
		caseTitleStyle: css`
			font-size: 1.5rem;
			font-weight: 600;
			line-height: 1.4;
		`,

		caseDescStyle: css`
			font-size: 1rem;
			line-height: 1.4;
			font-weight: 300;
		`,
		editTitleStyle: css`
			font-size: 3rem;
			line-height: 1.4;
			font-weight: 300;
		`,
	},
};

export const GlobalStyles = () => <Global styles={globalStyles} />;
