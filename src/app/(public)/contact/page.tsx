"use client";

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
import emailjs from "@emailjs/browser";

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
	color: ${theme.color.beige[90]};
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

const Input = styled.input<{ isEmpty: boolean }>`
	${defaultInput}
	font-size: 14px;

	border: 1px solid
		${({ isEmpty }) => (isEmpty ? `${theme.color.red[50]}` : "#ccc")};
`;

const LongItem = styled.div`
	margin-top: 30px;
	display: flex;
	align-items: start;
	justify-content: space-between;
`;

const LongInput = styled.textarea`
	${defaultInput}
	height: 200px;
	font-size: 14px;
	padding-top: 10px;
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
	const form = useRef(null);
	const [nameValue, setNameValue] = useState<string>("");
	const [emailValue, setEmailValue] = useState<string>("");
	const [phoneValue, setPhoneValue] = useState<string>("");
	const [companyValue, setCompanyValue] = useState<string>("");
	const [placeValue, setPlaceValue] = useState<string>("");
	const [nameEmpty, setNameEmpty] = useState<boolean>(false);
	const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
	const [phoneEmpty, setPhoneEmpty] = useState<boolean>(false);
	const [companyEmpty, setCompanyEmpty] = useState<boolean>(false);
	const [placeEmpty, setPlaceEmpty] = useState<boolean>(false);
	const [hintMessage, setHinMessage] = useState<HintMessage>({
		status: null,
		message: null,
	});

	const handleSendEmail = () => {
		setHinMessage({ status: null, message: null });

		if (nameValue === "") {
			setNameEmpty(true);
		}
		if (emailValue === "") {
			setEmailEmpty(true);
		}
		if (phoneValue === "") {
			setPhoneEmpty(true);
		}
		if (companyValue === "") {
			setCompanyEmpty(true);
		}
		if (placeValue === "") {
			setPlaceEmpty(true);
		}

		if (
			!nameValue ||
			!emailValue ||
			!phoneValue ||
			!companyValue ||
			!placeValue
		) {
			setHinMessage({ status: "fail", message: "請確認「必填」欄位皆已填寫" });
			return;
		}

		setHinMessage({ status: "pending", message: "請稍候..." });

		const test = form.current;
		if (
			!test ||
			!process.env.NEXT_PUBLIC_SERVICE_ID ||
			!process.env.NEXT_PUBLIC_TEMPLATE_ID ||
			!process.env.NEXT_PUBLIC_PUBLIC_KEY
		) {
			setHinMessage({ status: "fail", message: "發送失敗，請稍候再試" });
			return;
		}
		emailjs
			.sendForm(
				process.env.NEXT_PUBLIC_SERVICE_ID,
				process.env.NEXT_PUBLIC_TEMPLATE_ID,
				test,
				process.env.NEXT_PUBLIC_PUBLIC_KEY
			)
			.then((result) => {
				console.log(result.text);
				setHinMessage({ status: "success", message: "發送成功" });
			})
			.catch((error) => {
				setHinMessage({ status: "fail", message: "發送失敗，請稍候再試" });
				console.log(error.text);
			});
	};

	return (
		<Container>
			<LeftArea>
				<Title>聯繫瑾諺，建築未來</Title>
				<Description>填寫右方表格，讓我們為您量身訂製版模工程。</Description>
			</LeftArea>

			<RightArea>
				<FormArea>
					<form ref={form}>
						<Item>
							姓名：
							<Input
								placeholder="請輸入您的姓名（必填）"
								name="name"
								value={nameValue}
								onChange={(e) => {
									setNameValue(e.target.value);
									if (e.target.value !== "") {
										setNameEmpty(false);
									}
								}}
								isEmpty={nameEmpty}
							/>
						</Item>
						<Item>
							電子信箱：
							<Input
								name="email"
								placeholder="請輸入您的工作電子信箱（必填）"
								value={emailValue}
								onChange={(e) => {
									setEmailValue(e.target.value);
									if (e.target.value !== "") {
										setEmailEmpty(false);
									}
								}}
								isEmpty={emailEmpty}
							/>
						</Item>
						<Item>
							聯絡電話：
							<Input
								name="phone"
								placeholder="請輸入您的電話（必填）"
								value={phoneValue}
								onChange={(e) => {
									setPhoneValue(e.target.value);
									if (e.target.value !== "") {
										setPhoneEmpty(false);
									}
								}}
								isEmpty={phoneEmpty}
							/>
						</Item>
						<Item>
							公司名稱：
							<Input
								name="company"
								placeholder="請輸入您的公司名稱（必填）"
								value={companyValue}
								onChange={(e) => {
									setCompanyValue(e.target.value);
									if (e.target.value !== "") {
										setCompanyEmpty(false);
									}
								}}
								isEmpty={companyEmpty}
							/>
						</Item>
						<Item>
							工程地點：
							<Input
								name="place"
								placeholder="請輸入工程場址（必填）"
								value={placeValue}
								onChange={(e) => {
									setPlaceValue(e.target.value);
									if (e.target.value !== "") {
										setPlaceEmpty(false);
									}
								}}
								isEmpty={placeEmpty}
							/>
						</Item>
						<LongItem>
							需求說明：
							<LongInput
								name="message"
								placeholder="請簡單描述工程需求，我們將更能了解初步狀況並進行評估。"
							/>
						</LongItem>

						<RightItem>
							{hintMessage.status && (
								<Hint hintMessage={hintMessage}>{hintMessage.message}</Hint>
							)}
							<SubmitBtn onClick={handleSendEmail}>聯繫業務</SubmitBtn>
						</RightItem>
					</form>
				</FormArea>
			</RightArea>
		</Container>
	);
}
