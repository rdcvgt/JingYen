"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/app/globalStyles";
import { auth } from "@/firebase/init";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Side = styled.div`
	background-color: ${theme.color.green[70]};
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 200px;
	padding-top: 100px;
`;

const Button = styled.div`
	width: 100%;
	height: 50px;
	color: #fff;
	${theme.display.center}
	transition: all 0.3s;

	&:hover {
		background-color: ${theme.color.green[50]};
		transition: all 0.3s;
	}
`;

export default function Sidebar() {
	const router = useRouter();
	const handleSignOutClick = () => {
		signOut(auth)
			.then(() => {
				router.push("/login");
			})
			.catch((error) => {
				router.push("/login");
			});
	};

	return (
		<Side>
			<Link href="/" passHref>
				<Button>回首頁</Button>
			</Link>
			<Link href="/cms/add-case" passHref>
				<Button>新增案件</Button>
			</Link>
			<Link href="/cms/edit-case" passHref>
				<Button>編輯案例</Button>
			</Link>
			<Link href="/" passHref>
				<Button onClick={handleSignOutClick}>登出</Button>
			</Link>
		</Side>
	);
}
