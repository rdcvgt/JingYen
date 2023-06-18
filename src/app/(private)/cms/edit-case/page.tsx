"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { auth } from "@/firebase/init";
import { onAuthStateChanged } from "firebase/auth";

import { getCaseData } from "@/firebase/database";
import { getCasePhotos } from "@/firebase/storage";

import { FormDefaultData, FormData } from "../types";
import FormLayout, {
	Container,
	Title,
	Item,
	Input,
} from "../components/formLayout";
import { secondaryBtn } from "@/components/button/Button.style";
import { dangerousHint } from "@/components/hint/hint.style";

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

const handleCaseId = (link: string): string => {
	const linkArr = link.split("/");
	const caseId = linkArr[linkArr.length - 1];
	return caseId;
};

const handleDefaultFormData = (
	caseData: FormData,
	photoArr: FormDefaultData["other"]["uploadedPhoto"] | [],
	caseId: string
) => {
	const { main, custom } = caseData;
	const formDefaultData: FormDefaultData = {
		other: {
			type: "edit",
			title: "2. 編輯工程案例",
			caseId,
			saveBtnName: "更新",
			uploadedPhoto: photoArr,
		},
		main,
		custom,
	};
	return formDefaultData;
};

export default function EditCase() {
	const [searchErrorMsg, setSearchErrorMsg] = useState<string | null>(null);
	const [isSearch, setIsSearch] = useState<boolean>(false);
	const [formDefaultData, setFormDefaultData] =
		useState<FormDefaultData | null>(null);
	const searchCaseRef = useRef<HTMLInputElement>(null);

	const handleSearchClick = async () => {
		const link = searchCaseRef.current?.value;
		if (!link || link === "") {
			setSearchErrorMsg("欄位不得為空");
			return;
		}
		const caseId = handleCaseId(link);
		setIsSearch(true);
		const caseData = (await getCaseData(caseId)) as FormData;

		setIsSearch(false);
		if (!caseData) {
			setSearchErrorMsg("查無案例，請檢查網址");
			return;
		}

		const photoArr = (await getCasePhotos(caseId)) as
			| FormDefaultData["other"]["uploadedPhoto"]
			| [];
		setSearchErrorMsg(null);
		setFormDefaultData(handleDefaultFormData(caseData, photoArr, caseId));
	};

	const router = useRouter();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				return;
			} else {
				router.push("/login");
			}
		});
	}, []);

	return (
		<>
			<Container>
				<SearchArea>
					<Title>1. 搜尋案例</Title>
					<Item>
						案例網址：
						<Input placeholder="請貼上案例網址" ref={searchCaseRef} />
						<SearchBtn onClick={handleSearchClick}>
							{isSearch ? "搜尋中" : "搜尋"}
						</SearchBtn>
						{searchErrorMsg && <Hint>{searchErrorMsg}</Hint>}
					</Item>
				</SearchArea>
			</Container>
			{formDefaultData && <FormLayout mainData={formDefaultData} />}
		</>
	);
}
