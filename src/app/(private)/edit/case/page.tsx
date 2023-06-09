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
import UploadArea from "./components/uploadArea";
import CustomItemArea from "./components/customItemArea";
import { createNewCase } from "@/firebase/database";

const Container = styled.div`
	margin-left: 300px;
	margin-top: 50px;
	width: 1000px;
	height: 100%;
`;

const Title = styled.div`
	${theme.font.editTitleStyle}
	border-bottom: 1px solid #ccc;
`;

const FormArea = styled.div`
	margin-top: 40px;
`;

const Item = styled.div`
	margin-top: 30px;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

const Input = styled.input`
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

const CancelButton = styled.div`
	${secondaryBtn}
`;

const SaveButton = styled.div`
	${defaultBtn}
`;

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
		工程照片: File[];
	};
	custom: CustomItem[];
}

export default function Case() {
	const [customItem, setCustomItem] = useState<CustomItem[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const caseNameRef = useRef<HTMLInputElement>(null);
	const caseOwnerRef = useRef<HTMLInputElement>(null);
	const caseTypeRef = useRef<HTMLSelectElement>(null);
	const caseStatusRef = useRef<HTMLSelectElement>(null);
	const caseDigitsRef = useRef<HTMLInputElement>(null);

	const handleSaveClick = () => {
		const formData: FormData = {
			default: {
				工程名稱: caseNameRef.current?.value,
				工程業主: caseOwnerRef.current?.value,
				工程類型: caseTypeRef.current?.value,
				工程狀態: caseStatusRef.current?.value,
				模板數量: caseDigitsRef.current?.value,
				工程照片: selectedFiles,
			},
			custom: customItem,
		};

		if (
			formData.default.工程名稱 === "" ||
			formData.default.工程業主 === "" ||
			formData.default.模板數量 === ""
		) {
			console.log("錯誤");
			return;
		}
		createNewCase(formData);
	};

	return (
		<Container>
			<Title>新增工程案例</Title>
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
					<Input placeholder="必填" ref={caseNameRef} />
				</Item>
				<Item>
					工程業主：
					<Input placeholder="必填" ref={caseOwnerRef} />
				</Item>
				<Item>
					工程類型：
					<Select id="type" name="type" ref={caseTypeRef}>
						<option value="民宅">民宅</option>
						<option value="企業">企業</option>
						<option value="公有">公有</option>
					</Select>
				</Item>
				<Item>
					工程狀態：
					<Select id="status" name="status" ref={caseStatusRef}>
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
					/>{" "}
					㎡
				</Item>
				<CustomItemArea customItem={customItem} setCustomItem={setCustomItem} />
			</FormArea>
			<ConfirmArea>
				<CancelButton>取消</CancelButton>
				<SaveButton onClick={handleSaveClick}>儲存</SaveButton>
			</ConfirmArea>
		</Container>
	);
}
