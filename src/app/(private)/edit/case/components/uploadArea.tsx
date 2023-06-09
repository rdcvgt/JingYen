"use client";
import styled from "@emotion/styled";
import { theme } from "@/app/globalStyles";
import { secondaryBtn } from "@/components/button/Button.style";
import { ChangeEvent } from "react";
import Image from "next/image";

const Button = styled.div`
	${secondaryBtn}
	margin-left: 5px;
`;

const Input = styled.input`
	display: none;
`;

const Warn = styled.div`
	color: #333;
	margin-left: 10px;
`;

const PreviewArea = styled.div`
	width: 100%;
	margin-top: 20px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	gap: 20px;
	overflow-x: auto;
`;

const ImageBox = styled.div`
	min-width: 100px;
	height: 100px;
	border: 1px solid #ccc;
	border-radius: 5px;
	overflow: hidden;
	cursor: pointer;
	position: relative;
	transition: all 0.3s;

	&:hover {
		border: 1px solid ${theme.color.red[50]};
		transition: all 0.3s;
	}
`;

const DeleteArea = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 1;
	color: ${theme.color.red[50]};
	opacity: 0;
	${theme.display.center}
	transition: all 0.3s;

	&:hover {
		background-color: rgba(256, 256, 256, 0.9);
		opacity: 1;
		transition: all 0.3s;
	}
`;

interface ChildComponentProps {
	selectedFiles: File[];
	setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function UploadArea(props: ChildComponentProps) {
	const selectedFiles = props.selectedFiles;
	const setSelectedFiles = props.setSelectedFiles;
	const short = require("short-uuid");

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const files = Array.from(event.target.files);
			console.log(files);

			const maxSize = 5 * 1024 * 1024; // 限制檔案大小為 5MB

			const selectedFiles = files
				.filter((file) => file.size <= maxSize)
				.map((file) => {
					const newName = `${short.generate()}`; // 使用 uuid 生成新的檔案名稱
					const fileType = file.type; // 保存原始檔案的 type
					const newFile = new File([file], newName); // 建立新的檔案物件，並指定新的名稱
					Object.defineProperty(newFile, "type", { value: fileType });
					return newFile;
				});

			setSelectedFiles((prev) => {
				if (prev.length > 0) {
					return [...prev, ...selectedFiles];
				}
				return selectedFiles;
			});
		}
	};

	const handleDeleteClick = (index: number) => {
		setSelectedFiles((prev) => {
			const updatedState = [...prev];
			updatedState.splice(index, 1);
			return updatedState;
		});
	};

	return (
		<>
			<label htmlFor="file-input">
				<Input
					type="file"
					id="file-input"
					accept="image/*"
					multiple
					onChange={handleFileChange}
				/>
				<Button as="span">上傳</Button>
			</label>
			<Warn>單張照片大小不得超過 5 Mb，否則無法上傳</Warn>

			<PreviewArea>
				{/* 顯示選擇的圖片 */}
				{selectedFiles.map((file, index) => (
					<ImageBox key={index}>
						<Image
							src={URL.createObjectURL(file)}
							alt={`Image ${index}`}
							style={{ objectFit: "contain" }}
							width={100}
							height={100}
						/>
						<DeleteArea
							onClick={() => {
								handleDeleteClick(index);
							}}>
							刪除
						</DeleteArea>
					</ImageBox>
				))}
			</PreviewArea>
		</>
	);
}
