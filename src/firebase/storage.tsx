import { storage } from "./init";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export async function uploadPhotoToStorage(caseId: string, files: File[]) {
	const storageRef = ref(storage, `case/${caseId}`); // 設定儲存路徑

	// 遍歷所有檔案並上傳至 Firebase Storage
	for (const file of files) {
		const fileRef = ref(storageRef, file.name); // 設定檔案名稱
		await uploadBytes(fileRef, file); // 上傳檔案至 Firebase Storage
	}

	console.log("Images uploaded successfully");
}

export async function getCasePhotos(caseId: string) {
	const storageRef = ref(storage, `case/${caseId}`);

	try {
		const result = await listAll(storageRef);
		const photoUrls = result.items.map(async (item) => {
			const downloadUrl = await getDownloadURL(item);
			return {
				name: item.name,
				url: downloadUrl,
			};
		});

		return Promise.all(photoUrls);
	} catch (error) {
		console.error("Error getting case photos:", error);
		return [];
	}
}
