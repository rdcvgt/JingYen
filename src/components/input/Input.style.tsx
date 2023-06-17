import { css } from "@emotion/react";
import { theme } from "@/app/globalStyles";

export const defaultInput = css`
	outline: none;
	border: 1px solid #ccc;
	width: 500px;
	height: 40px;
	border-radius: 5px;
	padding: 5px;
	margin: 0 5px;
	transition: all 0.3s;

	&:focus {
		transition: all 0.3s;
		border: 1px solid ${theme.color.green[50]};
	}
`;
