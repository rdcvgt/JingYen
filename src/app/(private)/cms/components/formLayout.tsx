"use client";
import { useState, useRef } from "react";
import { theme } from "@/app/globalStyles";
import styled from "@emotion/styled";
import {
	defaultBtn,
	secondaryBtn,
	dangerousBtn,
} from "@/components/button/Button.style";
import { defaultInput } from "@/components/input/Input.style";
import { dangerousHint } from "@/components/hint/hint.style";
import UploadArea from "./uploadArea";
import CustomItemArea from "./customItemArea";
import {
	addNewCase,
	updateCaseData,
	deleteCaseFromDatabase,
} from "@/firebase/database";
import {
	uploadPhotoToStorage,
	deletePhotoFromStorage,
	deleteCaseFromStorage,
} from "@/firebase/storage";
import Card from "@/components/card/Card";
import { useRouter } from "next/navigation";
import { FormDefaultData, CustomItem, FormData, CardInfo } from "../types";

export const Container = styled.div`
	margin-left: 300px;
	margin-top: 50px;
	width: 1000px;
	height: 100%;
`;

export const Title = styled.div`
	${theme.font.editTitleStyle}
	border-bottom: 1px solid #ccc;
`;

const FormArea = styled.div`
	margin-top: 40px;
`;

export const Item = styled.div`
	margin-top: 30px;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

export const Input = styled.input`
	${defaultInput}
`;

const Select = styled.select`
	${defaultInput}
`;

const ConfirmArea = styled.div`
	position: fixed;
	bottom: 50px;
	right: 50px;
	display: flex;
	gap: 20px;
`;

const Hint = styled.div`
	position: fixed;
	bottom: 110px;
	right: 50px;
	${dangerousHint}
`;

const DeleteButton = styled.div`
	${dangerousBtn}
`;

const CancelButton = styled.div`
	${secondaryBtn}
`;

const SaveButton = styled.div<SaveButtonProps>`
	${defaultBtn}
	pointer-events: ${(props) => (props.isUploading ? "none" : "auto")};
`;

type SaveButtonProps = {
	isUploading: boolean;
};

interface ChildComponentProps {
	mainData: FormDefaultData;
}

export default function FormLayout(props: ChildComponentProps) {
	const { mainData } = props;

	const [customItem, setCustomItem] = useState<CustomItem[]>(mainData.custom);
	const [uploadedPhoto, setUploadedPhoto] = useState<
		FormDefaultData["other"]["uploadedPhoto"]
	>(mainData.other.uploadedPhoto);
	const [deleteUploadedPhoto, setDeleteUploadedPhoto] = useState<string[] | []>(
		[]
	);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [showWarning, setShowWaring] = useState<boolean>(false);
	const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const caseNameRef = useRef<HTMLInputElement>(null);
	const caseOwnerRef = useRef<HTMLInputElement>(null);
	const caseTypeRef = useRef<HTMLSelectElement>(null);
	const caseStatusRef = useRef<HTMLSelectElement>(null);
	const caseDigitsRef = useRef<HTMLInputElement>(null);

	const router = useRouter();

	const handleSaveClick = async () => {
		const formData: FormData = {
			main: {
				工程名稱: caseNameRef.current?.value,
				工程業主: caseOwnerRef.current?.value,
				工程類型: caseTypeRef.current?.value as
					| "民宅"
					| "企業"
					| "公有"
					| undefined,
				工程狀態: caseStatusRef.current?.value as
					| "已完成"
					| "進行中"
					| undefined,
				模板數量: caseDigitsRef.current?.value,
				工程照片: selectedFiles
					.map((file) => file.name)
					.concat(uploadedPhoto.map((file) => file.name)),
			},
			custom: customItem,
		};

		//檢驗欄位是否為空
		if (
			formData.main.工程名稱 === "" ||
			formData.main.工程業主 === "" ||
			formData.main.模板數量 === ""
		) {
			setShowWaring(true);
			return;
		} else {
			setShowWaring(false);
		}

		//取得 caseId並儲存照片、case data到資料庫
		setIsUploading(true);
		const caseId =
			mainData.other.type === "edit"
				? mainData.other.caseId
				: await addNewCase(formData);

		if (caseId && mainData.other.type === "edit") {
			await updateCaseData(caseId, formData);
		}
		if (caseId && formData.main.工程照片.length > 0) {
			await uploadPhotoToStorage(caseId, selectedFiles);
		}
		if (
			caseId &&
			mainData.other.type === "edit" &&
			deleteUploadedPhoto.length > 0
		) {
			await deletePhotoFromStorage(caseId, deleteUploadedPhoto);
		}

		//點及儲存後顯示卡片訊息
		const SuccessCardInfo: CardInfo = {
			title: mainData.other.type === "add" ? "新增成功" : "儲存成功",
			message: "",
			leftBtnName: "前往查看",
			rightBtnName: mainData.other.type === "add" ? "新增一筆" : "返回",
			leftBtnFunc: () => {
				router.push(`/case/${caseId}`);
			},
			rightBtnFunc:
				mainData.other.type === "add"
					? () => {
							window.location.href = "/cms/add-case";
					  }
					: () => {
							setCardInfo(null);
					  },
			closeFunc: () => {
				setCardInfo(null);
			},
		};

		setIsUploading(false);
		setCardInfo(SuccessCardInfo);
	};

	const handleCancelClick = () => {
		//傳遞卡片訊息並顯示
		const CancelCardInfo: CardInfo = {
			title: "是否取消編輯？",
			message: "選擇「是」，當前編輯進度將會遺失。",
			leftBtnName: "是",
			rightBtnName: "否",
			leftBtnFunc: () => {
				window.location.href =
					mainData.other.type === "add" ? "/cms/add-case" : "/cms/edit-case";
			},
			rightBtnFunc: () => {
				setCardInfo(null);
			},
			closeFunc: () => {
				setCardInfo(null);
			},
		};

		setCardInfo(CancelCardInfo);
	};

	const handleDeleteClick = () => {
		const DeleteCardInfo: CardInfo = {
			title: "確定要刪除此案例？",
			message:
				"選擇「確認」，此案例會被永久刪除。這個步驟通常會花費一些時間，完成刪除後頁面將重新整理。",
			leftBtnName: "確認",
			rightBtnName: "返回",
			leftBtnFunc: async () => {
				await deleteCaseFromDatabase(mainData.other.caseId);
				await deleteCaseFromStorage(mainData.other.caseId);
				window.location.href = "/cms/edit-case";
			},
			rightBtnFunc: () => {
				setCardInfo(null);
			},
			closeFunc: () => {
				setCardInfo(null);
			},
		};

		setCardInfo(DeleteCardInfo);
	};

	return (
		<Container>
			<Title>{mainData.other.title}</Title>
			<FormArea>
				<Item>
					工程照片：
					<UploadArea
						selectedFiles={selectedFiles}
						setSelectedFiles={setSelectedFiles}
						uploadedPhoto={uploadedPhoto}
						setUploadedPhoto={setUploadedPhoto}
						setDeleteUploadedPhoto={setDeleteUploadedPhoto}
					/>
				</Item>
				<Item>
					工程名稱：
					<Input
						placeholder="必填"
						ref={caseNameRef}
						defaultValue={mainData.main.工程名稱}
					/>
				</Item>
				<Item>
					工程業主：
					<Input
						placeholder="必填"
						ref={caseOwnerRef}
						defaultValue={mainData.main.工程業主}
					/>
				</Item>
				<Item>
					工程類型：
					<Select
						id="type"
						name="type"
						ref={caseTypeRef}
						defaultValue={mainData.main.工程類型}>
						<option value="民宅">民宅</option>
						<option value="企業">企業</option>
						<option value="公有">公有</option>
					</Select>
				</Item>
				<Item>
					工程狀態：
					<Select
						id="status"
						name="status"
						ref={caseStatusRef}
						defaultValue={mainData.main.工程狀態}>
						<option value="進行中">進行中</option>
						<option value="已完成">已完成</option>
					</Select>
				</Item>

				<Item>
					模板數量：
					<Input
						type="number"
						placeholder="必填，僅限輸入數字"
						ref={caseDigitsRef}
						defaultValue={mainData.main.模板數量}
					/>{" "}
					㎡
				</Item>
				<CustomItemArea customItem={customItem} setCustomItem={setCustomItem} />
			</FormArea>
			<ConfirmArea>
				{mainData.other.type === "edit" && (
					<DeleteButton onClick={handleDeleteClick}>刪除案例</DeleteButton>
				)}
				<CancelButton onClick={handleCancelClick}>取消編輯</CancelButton>
				<SaveButton onClick={handleSaveClick} isUploading={isUploading}>
					{isUploading ? "請稍候" : mainData.other.saveBtnName}
				</SaveButton>
			</ConfirmArea>
			{showWarning && <Hint>必填欄位不得為空</Hint>}
			{cardInfo && <Card cardInfo={cardInfo} />}
		</Container>
	);
}
