import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./init";
import { FormData } from "@/app/(private)/edit/case/page";

export async function addNewCase(caseConfig: FormData) {
	try {
		// 在 "case" 集合中創建新文件並獲取自動生成的文件 ID
		const newDocRef = await addDoc(collection(db, "case"), caseConfig);

		// 獲取新建文件的 ID
		const newDocId = newDocRef.id;
		return newDocId;
	} catch (error) {
		console.error("Error creating document:", error);
	}
}
