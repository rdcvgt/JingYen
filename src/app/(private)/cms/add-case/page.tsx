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
		other: {
			type: "add",
			title: "新增工程案例",
			saveBtnName: "儲存",
			uploadedPhoto: [],
		},
		main: {
			工程名稱: "",
			工程業主: "",
			工程類型: "民宅",
			工程狀態: "已完成",
			模板數量: "",
			工程照片: [],
		},
		custom: [],
	};

	return (
		<>
			<FormLayout mainData={formDefaultData} />
		</>
	);
}
