"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { theme } from "@/app/globalStyles";
import styled from "@emotion/styled";
import {
	dangerousHint,
	neutralHint,
	successfulHint,
} from "@/components/hint/hint.style";

import { defaultInput } from "@/components/input/Input.style";
import { defaultBtn } from "@/components/button/Button.style";
import loginToCMS from "@/firebase/auth";

const Container = styled.div`
	margin: 120px auto;
	width: 1120px;
	height: 100%;
	overflow-y: auto;
	scrollbar-gutter: stable;
	display: flex;
	gap: 40px;
`;

const LeftArea = styled.div`
	width: 35%;
	height: 100%;
`;

const RightArea = styled.div`
	width: 65%;
`;

const FormArea = styled.div`
	width: 100%;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 20px;
`;

const Title = styled.div`
	${theme.font.pageTitleStyle}
	margin-bottom: 20px;
	color: ${theme.color.green[70]};
`;

const Description = styled.div`
	${theme.font.caseDescStyle}
`;

const Item = styled.div`
	margin-top: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Input = styled.input`
	${defaultInput}
	font-size: 14px;
`;

const RightItem = styled.div`
	margin-top: 30px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const SubmitBtn = styled.div`
	${defaultBtn}
`;

interface HintMessage {
	status: null | "pending" | "fail" | "success";
	message: null | string;
}

const Hint = styled.div<{ hintMessage: HintMessage }>`
	${({ hintMessage }) => {
		if (hintMessage.status === "fail") {
			return dangerousHint;
		}

		if (hintMessage.status === "pending") {
			return neutralHint;
		}

		if (hintMessage.status === "success") {
			return successfulHint;
		}

		return dangerousHint;
	}};

	width: auto;
	margin-right: 20px;
`;

export default function SearchCase() {
	const router = useRouter();
	const form = useRef(null);
	const [accountValue, setAccountValue] = useState<string>("");
	const [passwordValue, setPasswordValue] = useState<string>("");
	const [hintMessage, setHinMessage] = useState<HintMessage>({
		status: null,
		message: null,
	});

	const handleLogin = async () => {
		setHinMessage({ status: null, message: null });

		if (accountValue === "") {
		}
		if (passwordValue === "") {
		}

		if (!accountValue || !passwordValue) {
			setHinMessage({ status: "fail", message: "欄位不得為空" });
			return;
		}

		setHinMessage({ status: "pending", message: "請稍候..." });

		const result = await loginToCMS(accountValue, passwordValue);
		if (result.status) {
			setHinMessage({ status: "success", message: result.message });
			router.push("/cms/add-case");
		} else {
			setHinMessage({ status: "fail", message: result.message });
		}
	};

	return (
		<Container>
			<LeftArea>
				<Title>登入後台</Title>
				<Description>請輸入帳號及密碼後登入。</Description>
			</LeftArea>

			<RightArea>
				<FormArea>
					<form ref={form}>
						<Item>
							帳號：
							<Input
								placeholder="請輸入帳號"
								name="name"
								value={accountValue}
								onChange={(e) => {
									setAccountValue(e.target.value);
								}}
							/>
						</Item>
						<Item>
							密碼：
							<Input
								name="email"
								placeholder="請輸入密碼"
								type="password"
								value={passwordValue}
								onChange={(e) => {
									setPasswordValue(e.target.value);
								}}
							/>
						</Item>

						<RightItem>
							{hintMessage.status && (
								<Hint hintMessage={hintMessage}>{hintMessage.message}</Hint>
							)}
							<SubmitBtn onClick={handleLogin}>登入</SubmitBtn>
						</RightItem>
					</form>
				</FormArea>
			</RightArea>
		</Container>
	);
}
