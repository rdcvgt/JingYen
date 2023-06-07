"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/app/globalStyles";

const Nav = styled.div`
	background-color: ${theme.color.white};
	position: fixed;
	top: 0;
	left: 0;
	height: 68px;
	width: 100%;
	border-bottom: 1px solid ${theme.color.neutral[10]};
`;

const Container = styled.div`
	max-width: 1200px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #333;
	padding: 0 40px 0 40px;
	margin: 0 auto;
`;

const LeftBlock = styled.div``;

const Logo = styled.div``;

const RightBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 30px;
`;

const Page = styled.div``;

const Button = styled.div`
	width: 100px;
	height: 40px;
	border-radius: 30px;
	background-color: ${theme.color.green[70]};
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	transition: all 0.3s;

	&:hover {
		background-color: ${theme.color.green[50]};
	}
`;

export default function Navbar() {
	return (
		<Nav>
			<Container>
				<LeftBlock>
					<Logo>瑾諺工程</Logo>
				</LeftBlock>
				<RightBlock>
					<Link href="/edit/case" passHref>
						<Button>編輯後台</Button>
					</Link>
					<Link href="/case" passHref>
						<Page>成功案例</Page>
					</Link>
					<Link href="/about-us" passHref>
						<Page>關於我們</Page>
					</Link>
					<Link href="/contact" passHref>
						<Button>聯繫業務</Button>
					</Link>
				</RightBlock>
			</Container>
		</Nav>
	);
}
