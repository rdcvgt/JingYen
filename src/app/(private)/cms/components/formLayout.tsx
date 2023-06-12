"use client";
import { useState, useRef } from "react";
import { theme } from "@/app/globalStyles";
import styled from "@emotion/styled";
import { defaultBtn, secondaryBtn } from "@/components/button/Button.style";
import { defaultInput } from "@/components/input/Input.style";
import { dangerousHint } from "@/components/hint/hint.style";
import UploadArea from "./uploadArea";
import CustomItemArea from "./customItemArea";
import { addNewCase } from "@/firebase/database";
import { uploadPhotoToStorage } from "@/firebase/storage";
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

const CancelButton = styled.div`
	${secondaryBtn}
`;

const SaveButton = styled.div<SaveButtonProps>`
	${defaultBtn}
	pointer-events: ${(props) => (props.isUploading ? "none" : "auto")};
`;

type SaveButtonProps = {
	isUploading: boolean;
	// 其他屬性...
};

interface ChildComponentProps {
	defaultData: FormDefaultData;
}

export default function FormLayout(props: ChildComponentProps) {
	const { defaultData } = props;

	const [customItem, setCustomItem] = useState<CustomItem[]>(
		defaultData.customItem
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
			default: {
				工程名稱: caseNameRef.current?.value,
				工程業主: caseOwnerRef.current?.value,
				工程類型: caseTypeRef.current?.value,
				工程狀態: caseStatusRef.current?.value,
				模板數量: caseDigitsRef.current?.value,
				工程照片: selectedFiles.map((file) => file.name),
			},
			custom: customItem,
		};

		//檢驗欄位是否為空
		if (
			formData.default.工程名稱 === "" ||
			formData.default.工程業主 === "" ||
			formData.default.模板數量 === ""
		) {
			setShowWaring(true);
			return;
		} else {
			setShowWaring(false);
		}

		//取得 caseId並儲存照片到資料庫
		setIsUploading(true);
		const caseId = await addNewCase(formData);
		if (caseId && formData.default.工程照片.length > 0) {
			await uploadPhotoToStorage(caseId, selectedFiles);
		}

		//傳遞卡片訊息並顯示
		const SuccessCardInfo: CardInfo = {
			title: defaultData.type === "add" ? "新增成功" : "儲存成功",
			message: "",
			leftBtnName: "前往查看",
			rightBtnName: defaultData.type === "add" ? "新增一筆" : "返回",
			leftBtnFunc: () => {
				router.push(`/case/${caseId}`);
			},
			rightBtnFunc:
				defaultData.type === "add"
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
			message: "選擇「是」，當前編輯資料將會清除。",
			leftBtnName: "是",
			rightBtnName: "否",
			leftBtnFunc: () => {
				window.location.href =
					defaultData.type === "add" ? "/cms/add-case" : "/cms/edit-case";
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

	return (
		<Container>
			<Title>{defaultData.title}</Title>
			<FormArea>
				<Item>
					工程照片：
					<UploadArea
						selectedFiles={selectedFiles}
						setSelectedFiles={setSelectedFiles}
					/>
				</Item>
				<Item>
					工程名稱：
					<Input
						placeholder="必填"
						ref={caseNameRef}
						defaultValue={defaultData.caseName}
					/>
				</Item>
				<Item>
					工程業主：
					<Input
						placeholder="必填"
						ref={caseOwnerRef}
						defaultValue={defaultData.caseOwner}
					/>
				</Item>
				<Item>
					工程類型：
					<Select
						id="type"
						name="type"
						ref={caseTypeRef}
						defaultValue={defaultData.caseType}>
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
						defaultValue={defaultData.caseStatus}>
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
						defaultValue={defaultData.caseDigits}
					/>{" "}
					㎡
				</Item>
				<CustomItemArea customItem={customItem} setCustomItem={setCustomItem} />
			</FormArea>
			<ConfirmArea>
				<CancelButton onClick={handleCancelClick}>取消</CancelButton>
				<SaveButton onClick={handleSaveClick} isUploading={isUploading}>
					{isUploading ? "請稍候" : defaultData.saveBtnName}
				</SaveButton>
			</ConfirmArea>
			{showWarning && <Hint>必填欄位不得為空</Hint>}
			{cardInfo && <Card cardInfo={cardInfo} />}
		</Container>
	);
}
