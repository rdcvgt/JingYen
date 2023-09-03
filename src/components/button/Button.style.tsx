import { theme } from "@/app/globalStyles";
import { css } from "@emotion/react";

const defaultStyle = css`
	width: 100px;
	height: 40px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s;
	cursor: pointer;
`;

export const defaultBtn = css`
	${defaultStyle}
	background-color: ${theme.color.beige[90]};
	color: #fff;
	transition: all 0.3s;

	&:hover {
		transition: all 0.3s;
		background-color: ${theme.color.beige[90]};
	}
`;

export const secondaryBtn = css`
	${defaultStyle}
	border: 1px solid #ccc;

	&:hover {
		transition: all 0.3s;
		border: 1px solid ${theme.color.beige[90]};
		color: ${theme.color.beige[90]};
	}
`;

export const dangerousBtn = css`
	${defaultStyle}
	border: 1px solid #ccc;

	&:hover {
		transition: all 0.3s;
		border: 1px solid ${theme.color.red[50]};
		color: ${theme.color.red[50]};
	}
`;
