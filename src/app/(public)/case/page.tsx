"use client";

import Image from "next/image";
import { theme } from "@/app/globalStyles";
import styled from "@emotion/styled";
import { PhotoSlider } from "@/components/slider/Slider";

const Container = styled.div`
	margin: 0 auto;
	width: 1120px;
	height: 100%;
`;

const CaseArea = styled.div`
	width: 792px;
	height: auto;
	padding-top: 120px;
	margin: 0 auto;
`;

const PhotoArea = styled.div`
	border-radius: 20px;
	margin: 0 auto;
	overflow: hidden;
`;

const Title = styled.div`
	margin-top: 30px;
	${theme.font.caseTitleStyle}
	color: ${theme.color.green[80]};
`;

const Description = styled.div`
	margin: 30px 0 50px 0;
	${theme.font.caseDescStyle}
	color: ${theme.color.neutral[70]};
`;

const Item = styled.div`
	display: flex;
	margin-top: 10px;
`;

const Detail = styled.div`
	display: flex;
`;

export default function Case() {
	return (
		<Container>
			<CaseArea>
				<PhotoArea>
					<PhotoSlider />
				</PhotoArea>
				<Title>
					三峽-行天宮醫療志業醫療財團法人
					恩主公醫院附設橫溪恩主公護理之家新建工程
				</Title>
				<Description>
					<Item>
						業主：
						<Detail>猛揮營造股份有限公司</Detail>
					</Item>
					<Item>
						模板數量：
						<Detail>26,533 ㎡</Detail>
					</Item>
				</Description>
			</CaseArea>
		</Container>
	);
}
