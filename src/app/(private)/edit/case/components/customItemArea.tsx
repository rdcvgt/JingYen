"use client";
import { useState } from "react";
import styled from "@emotion/styled";
import { secondaryBtn, dangerousBtn } from "@/components/button/Button.style";
import { defaultInput } from "@/components/input/Input.style";

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

const ShortInput = styled.input`
	${defaultInput}
	width: 90px;
	margin-left: 0;
`;

const DeleteItemButton = styled.div`
	${dangerousBtn}
	border-radius: 20px;
	width: 70px;
	margin-left: 10px;
`;

const AddItemButton = styled.div`
	${secondaryBtn}
	border-radius: 20px;
	margin-bottom: 120px;
`;

interface CustomItem {
	title: string;
	content: string | number;
}

interface ChildComponentProps {
	customItem: CustomItem[];
	setCustomItem: React.Dispatch<React.SetStateAction<CustomItem[]>>;
}

export default function CustomItemArea(props: ChildComponentProps) {
	const setCustomItem = props.setCustomItem;
	const customItem = props.customItem;

	const handleAddItemClick = () => {
		setCustomItem((prev) => {
			if (prev) {
				return [...prev, { title: "", content: "" }];
			}
			return [{ title: "", content: "" }];
		});
	};

	const handleNewTitleInput = (index: number, value: string) => {
		setCustomItem((prev) => {
			const updatedState = [...prev];
			updatedState[index].title = value;
			return updatedState;
		});
	};

	const handleNewContentInput = (index: number, value: string | number) => {
		setCustomItem((prev) => {
			const updatedState = [...prev];
			updatedState[index].content = value;
			return updatedState;
		});
	};

	const handleDeleteItemClick = (index: number) => {
		setCustomItem((prev) => {
			const updatedState = [...prev];
			updatedState.splice(index, 1);
			return updatedState;
		});
	};

	return (
		<>
			{customItem.length !== 0 &&
				customItem.map((el, index) => (
					<Item key={index}>
						<ShortInput
							type="text"
							value={el.title}
							onChange={(e) => {
								handleNewTitleInput(index, e.target.value);
							}}
							placeholder="請輸入標題"
						/>
						：
						<Input
							type="text"
							value={el.content}
							onChange={(e) => {
								handleNewContentInput(index, e.target.value);
							}}
							placeholder="請輸入內容"
						/>
						<DeleteItemButton
							onClick={() => {
								handleDeleteItemClick(index);
							}}>
							刪除
						</DeleteItemButton>
					</Item>
				))}
			<Item>
				<AddItemButton onClick={handleAddItemClick}>新增欄位</AddItemButton>
			</Item>
		</>
	);
}
