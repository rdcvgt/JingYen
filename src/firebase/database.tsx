import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./init";
import { FormData } from "@/app/(private)/cms/types";

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

export async function getCaseData(caseId: string) {
	try {
		const docRef = doc(db, "case", caseId);
		const docSnapshot = await getDoc(docRef);

		if (docSnapshot.exists()) {
			const caseData = docSnapshot.data();

			return caseData;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error getting case data:", error);
	}
}

export async function updateCaseData(caseId: string, formData: FormData) {
	const caseRef = doc(db, `case/${caseId}`);
	try {
		await setDoc(caseRef, formData);
		console.log("Case data updated successfully");
	} catch (error) {
		console.error("Error updating case data:", error);
	}
}
