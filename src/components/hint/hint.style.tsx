import { theme } from "@/app/globalStyles";
import { css } from "@emotion/react";

export const defaultStyle = css`
	${theme.display.center}
	width: auto;
	height: 40px;
	border-radius: 5px;
	padding: 10px;
`;

export const successfulHint = css`
	${defaultStyle}
	background-color: ${theme.color.green[10]};
	color: ${theme.color.green[50]};
	border: 1px solid ${theme.color.green[50]};
`;

export const dangerousHint = css`
	${defaultStyle}
	background-color: ${theme.color.red[10]};
	color: ${theme.color.red[50]};
	border: 1px solid ${theme.color.red[50]};
`;

export const neutralHint = css`
	${defaultStyle}
	background-color: ${theme.color.beige[10]};
	color: ${theme.color.beige[50]};
	border: 1px solid ${theme.color.beige[50]};
`;
