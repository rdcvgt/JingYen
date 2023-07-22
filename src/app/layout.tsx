import { Inter } from "next/font/google";
import ThemeProviders from "./theme/ThemeProviders";
import { GlobalStyles } from "./globalStyles";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "瑾諺工程",
	description: "",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProviders>{children}</ThemeProviders>
				<GlobalStyles />
			</body>
		</html>
	);
}
