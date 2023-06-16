"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { theme } from "@/app/globalStyles";
import styled from "@emotion/styled";
import { defaultInput } from "@/components/input/Input.style";
import { css } from "@emotion/react";
import { secondaryBtn, defaultBtn } from "@/components/button/Button.style";
import { getMainFieldsFromCases, MainFields } from "@/firebase/database";

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

const ButtonItem = styled.div`
	margin-top: 30px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const SubmitBtn = styled.div`
	${defaultBtn}
`;

export default function SearchCase() {
	return (
		<Container>
			<LeftArea>
				<Title>聯繫瑾諺，建築未來</Title>
				<Description>填寫右方表格，讓我們為您量身訂製版模工程。</Description>
			</LeftArea>

			<RightArea>
				<FormArea>
					<Item>
						姓名：
						<Input
							placeholder="請輸入您的姓名"
							// ref={caseNameRef}
							// defaultValue={mainData.main.工程名稱}
						/>
					</Item>
					<Item>
						電子信箱：
						<Input
							placeholder="請輸入您的工作電子信箱"
							// ref={caseNameRef}
							// defaultValue={mainData.main.工程名稱}
						/>
					</Item>
					<Item>
						聯絡電話：
						<Input
							placeholder="請輸入您的電話"
							// ref={caseNameRef}
							// defaultValue={mainData.main.工程名稱}
						/>
					</Item>
					<Item>
						公司名稱：
						<Input
							placeholder="請輸入您的公司名稱"
							// ref={caseNameRef}
							// defaultValue={mainData.main.工程名稱}
						/>
					</Item>
					<Item>
						工程地點：
						<Input
							placeholder="請輸入工程場址"
							// ref={caseNameRef}
							// defaultValue={mainData.main.工程名稱}
						/>
					</Item>
					<LongItem>
						需求說明：
						<LongInput
							placeholder="請簡單描述工程需求，我們將更能了解初步狀況並進行評估。"
							// ref={caseNameRef}
							// defaultValue={mainData.main.工程名稱}
						/>
					</LongItem>
					<ButtonItem>
						<SubmitBtn>聯繫業務</SubmitBtn>
					</ButtonItem>
				</FormArea>
			</RightArea>
		</Container>
	);
}
