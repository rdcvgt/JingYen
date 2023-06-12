export interface FormDefaultData {
	type: "add" | "edit";
	title: string;
	caseName: string;
	caseOwner: string;
	caseType: "民宅" | "企業" | "公有";
	caseStatus: "已完成" | "進行中";
	caseDigits: string | number;
	customItem: [];
	saveBtnName: "儲存" | "更新";
}

export interface CustomItem {
	title: string;
	content: string | number;
}

export interface FormData {
	default: {
		工程名稱: string | undefined;
		工程業主: string | undefined;
		工程類型: string | undefined;
		工程狀態: string | undefined;
		模板數量: string | undefined;
		工程照片: string[];
	};
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
