import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./init";
import { FormData } from "@/app/(private)/edit/case/page";

export async function createNewCase(caseConfig: FormData) {
	try {
		console.log("hi");
		// 在 "case" 集合中創建新文件並獲取自動生成的文件 ID
		const newDocRef = await addDoc(collection(db, "case"), caseConfig);
		console.log(newDocRef);

		// 獲取新建文件的 ID
		const newDocId = newDocRef.id;
		console.log(newDocId);

		// // 建立指向新建文件的參考
		// const newDocPath = doc(db, "case", newDocId);

		// // 設定 "data" 欄位的資料
		// await setDoc(newDocPath, {
		// 	data: caseConfig,
		// });

		console.log("New document created with ID:", newDocId);
	} catch (error) {
		console.error("Error creating document:", error);
	}
}
