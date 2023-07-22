"use client";
import { lightTheme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

export default function ThemeProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
