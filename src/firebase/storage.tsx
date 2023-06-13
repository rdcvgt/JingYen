import { storage } from "./init";
import {
	ref,
	uploadBytes,
	listAll,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";

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

export async function deletePhotoFromStorage(
	caseId: string | null | undefined,
	deleteUploadedPhoto: string[]
) {
	const storageRef = ref(storage, `case/${caseId}`);

	try {
		for (const photoName of deleteUploadedPhoto) {
			const photoRef = ref(storageRef, photoName);
			await deleteObject(photoRef);
		}
		console.log("Photos deleted successfully.");
	} catch (error) {
		console.error("Error deleting photos:", error);
	}
}

export async function deleteCaseFromStorage(caseId: string | null | undefined) {
	if (!caseId) {
		return;
	}

	const folderPath = `case/${caseId}`;
	await deleteFolderRecursively(folderPath);
}

export async function deleteFolderRecursively(folderPath: string) {
	const folderRef = ref(storage, folderPath);

	// 取得資料夾內的所有檔案和子資料夾
	const { items } = await listAll(folderRef);

	// 刪除資料夾內的所有檔案
	const deleteFilePromises = items.map((item) => deleteObject(item));

	try {
		// 等待所有刪除動作完成
		await Promise.all(deleteFilePromises);
	} catch (error) {
		console.error("刪除檔案", error);
	}
}
