"use client";

import { theme } from "@/app/globalStyles";
import styled from "@emotion/styled";
import { defaultBtn, secondaryBtn } from "@/components/button/Button.style";
import { defaultInput } from "@/components/input/Input.style";

const Container = styled.div`
	margin-left: 300px;
	margin-top: 50px;
	width: 1000px;
	height: 100%;
	border: 1px solid #ccc;
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
`;

const Input = styled.input`
	${defaultInput}
`;

const Select = styled.select`
	${defaultInput}
`;

const AddItemButton = styled.div`
	${secondaryBtn}
	border-radius: 20px;
`;

const ConfirmArea = styled.div`
	position: absolute;
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

export default function Case() {
	return (
		<Container>
			<Title>新增工程案例</Title>
			<FormArea>
				<Item>
					工程名稱：
					<Input />
				</Item>
				<Item>
					工程業主：
					<Input />
				</Item>
				<Item>
					工程類型：
					<Select id="type" name="type">
						<option value="personal">民宅</option>
						<option value="enterprise">企業</option>
						<option value="government">公有</option>
					</Select>
				</Item>
				<Item>
					工程狀態：
					<Select id="status" name="status">
						<option value="ongoing">進行中</option>
						<option value="completed">已完成</option>
					</Select>
				</Item>

				<Item>
					模板數量：
					<Input /> ㎡
				</Item>
				<Item>
					上傳圖片：
					<Input />
				</Item>
				<Item>
					<AddItemButton>新增欄位</AddItemButton>
				</Item>
			</FormArea>
			<ConfirmArea>
				<CancelButton>取消</CancelButton>
				<SaveButton>儲存</SaveButton>
			</ConfirmArea>
		</Container>
	);
}
