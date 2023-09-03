"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/app/globalStyles";

const Container = styled.div`
	position: relative;
	bottom: 0;
	left: 0;
	height: 120px;
	width: 100%;
	border-top: 1px solid #eaeaea;
	margin-top: 20px;
`;

const Info = styled.div`
	width: 1120px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	align-items: center;
`;

const TopArea = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const LeftArea = styled.div``;

const RightArea = styled.div`
	color: ${theme.color.beige[60]};
	font-size: 9px;
`;

const Item = styled.div``;

const Logo = styled.div`
	color: ${theme.color.beige[60]};
`;

export default function Footer() {
	return (
		<Container>
			<Info>
				<TopArea>
					<LeftArea>
						<Logo>瑾諺工程</Logo>
					</LeftArea>
					<RightArea>
						<Item>Copyright - 瑾諺工程</Item>
						<Item>
							<Link href="/login">Content Management System</Link>
						</Item>
					</RightArea>
				</TopArea>
			</Info>
		</Container>
	);
}
