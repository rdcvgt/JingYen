"use client";

import styled from "@emotion/styled";
import FormLayout from "../components/formLayout";
import { FormDefaultData } from "../types";

const Container = styled.div`
	margin-left: 300px;
	margin-top: 50px;
	width: 1000px;
	height: 100%;
`;

export default function AddCase() {
	const formDefaultData: FormDefaultData = {
		type: "add",
		title: "新增工程案例",
		caseName: "",
		caseOwner: "",
		caseType: "民宅",
		caseStatus: "已完成",
		caseDigits: "",
		customItem: [],
	};

	return (
		<>
			<FormLayout defaultData={formDefaultData} />
		</>
	);
}
