"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/init";
import { onAuthStateChanged } from "firebase/auth";

import { FormDefaultData } from "../types";
import FormLayout from "../components/formLayout";

const formDefaultData: FormDefaultData = {
	other: {
		type: "add",
		title: "新增工程案例",
		caseId: null,
		saveBtnName: "儲存",
		uploadedPhoto: [],
	},
	main: {
		工程名稱: "",
		工程業主: "",
		工程類型: "民間",
		工程狀態: "已完成",
		模板數量: "",
		工程照片: [],
	},
	custom: [],
};

export default function AddCase() {
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
			<FormLayout mainData={formDefaultData} />
		</>
	);
}
