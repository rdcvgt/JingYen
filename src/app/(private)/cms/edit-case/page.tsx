"use client";

import { useState, useRef } from "react";
import styled from "@emotion/styled";
import FormLayout from "../components/formLayout";
import { FormDefaultData } from "../types";
import { secondaryBtn } from "@/components/button/Button.style";
import { dangerousHint } from "@/components/hint/hint.style";
import { Container, Title, Item, Input } from "../components/formLayout";

const SearchArea = styled.div`
	margin-top: 40px;
`;

const SearchBtn = styled.div`
	${secondaryBtn}
	margin-left: 5px;
`;

const Hint = styled.div`
	${dangerousHint}
	margin-left: 10px;
`;

export default function EditCase() {
	const [searchErrorMsg, setSearchErrorMsg] = useState<string | null>(null);
	const searchCaseRef = useRef<HTMLInputElement>(null);

	const formDefaultData: FormDefaultData = {
		type: "edit",
		title: "2. 編輯工程案例",
		caseName: "",
		caseOwner: "",
		caseType: "民宅",
		caseStatus: "已完成",
		caseDigits: "",
		customItem: [],
		saveBtnName: "更新",
	};

	const handleSearchClick = () => {
		const link = searchCaseRef.current?.value;
		if (!link || link === "") {
			setSearchErrorMsg("欄位不得為空");
			return;
		}
		setSearchErrorMsg(null);
	};

	return (
		<>
			<Container>
				<SearchArea>
					<Title>1. 搜尋案例</Title>
					<Item>
						案例網址：
						<Input placeholder="請貼上案例網址" ref={searchCaseRef} />
						<SearchBtn onClick={handleSearchClick}>搜尋</SearchBtn>
						{searchErrorMsg && <Hint>{searchErrorMsg}</Hint>}
					</Item>
				</SearchArea>
			</Container>

			<FormLayout defaultData={formDefaultData} />
		</>
	);
}
