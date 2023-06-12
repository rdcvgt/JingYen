"use client";
import styled from "@emotion/styled";
import { defaultBtn, secondaryBtn } from "@/components/button/Button.style";
import { theme } from "@/app/globalStyles";
import { CardInfo } from "@/app/(private)/cms/types";

const Background = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	z-index: 2;
	position: absolute;
	top: 0;
	left: 0;
`;

const CardArea = styled.div`
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 500px;
	height: 250px;
	background-color: #fff;
	padding: 30px;
	border-radius: 10px;
`;

const CloseBtn = styled.div`
	position: absolute;
	top: 30px;
	right: 30px;
	cursor: pointer;
`;

const Icon = styled.svg`
	width: 1.5em;
	height: 1.5em;
	transition: all 0.3s;

	& path,
	& polygon,
	& rect {
		fill: #ccc;
	}
`;

const Title = styled.div`
	${theme.font.caseTitleStyle}
	font-size: 20px;
	margin-bottom: 20px;
`;

const Message = styled.div`
	${theme.font.caseDescStyle}
`;

const ButtonArea = styled.div`
	${theme.display.center}
	gap: 15px;
	position: absolute;
	bottom: 30px;
	right: 30px;
`;

const LeftBtn = styled.div`
	${secondaryBtn}
`;
const RightBtn = styled.div`
	${defaultBtn}
`;

interface ChildComponentProps {
	cardInfo: CardInfo;
}

export default function Card(props: ChildComponentProps) {
	const { cardInfo } = props;

	return (
		<>
			<Background>
				<CardArea>
					<CloseBtn onClick={cardInfo.closeFunc}>
						<Icon className="svg-icon" viewBox="0 0 20 20">
							<path
								fill="none"
								d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						</Icon>
					</CloseBtn>

					<Title>{cardInfo.title}</Title>
					<Message>{cardInfo.message}</Message>
					<ButtonArea>
						<LeftBtn onClick={cardInfo.leftBtnFunc}>
							{cardInfo.leftBtnName}
						</LeftBtn>
						<RightBtn onClick={cardInfo.rightBtnFunc}>
							{cardInfo.rightBtnName}
						</RightBtn>
					</ButtonArea>
				</CardArea>
			</Background>
		</>
	);
}
