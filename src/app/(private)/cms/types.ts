export interface FormDefaultData extends FormData {
	other: {
		type: "edit" | "add" | "pending";
		title: string;
		caseId: string | null;
		saveBtnName: "更新" | "儲存";
		uploadedPhoto: { name: string; url: string }[] | [];
	};
}

export interface CustomItem {
	title: string;
	content: string | number;
}

interface Main {
	工程名稱: string | undefined;
	工程業主: string | undefined;
	工程類型: "民間" | "公有" | undefined;
	工程狀態: "已完成" | "進行中" | undefined;
	模板數量: string | undefined;
	工程照片: string[];
}

export interface FormData {
	main: Main;
	custom: CustomItem[];
}

export interface CardInfo {
	title: string;
	message: string;
	leftBtnName: string;
	rightBtnName: string;
	leftBtnFunc: () => void;
	rightBtnFunc: () => void;
	closeFunc: () => void;
}
