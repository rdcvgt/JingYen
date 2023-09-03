"use client";

import { useEffect, useState } from "react";
import { theme } from "@/app/globalStyles";
import styled from "@emotion/styled";
import { PhotoSlider } from "@/components/slider/Slider";
import { getCaseData } from "@/firebase/database";
import { getCasePhotos } from "@/firebase/storage";
import { FormData } from "@/app/(private)/cms/types";
import { notFound } from "next/navigation";

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

export interface CasePhotoArr {
	name: string;
	url: string;
}

const loading: CasePhotoArr = {
	name: "loading...",
	url: "/loading.png",
};

export default function Case({ params }: { params: { id: string } }) {
	const [caseData, setCaseData] = useState<FormData>();
	const [casePhotoArr, setCasePhotoArr] = useState<CasePhotoArr[] | []>([
		loading,
	]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = (await getCaseData(params.id)) as FormData | false;
				if (!data) {
					notFound();
				}
				setCaseData(data);
			} catch (error) {
				console.error("Error fetching case data:", error);
				notFound();
			}

			try {
				const data = (await getCasePhotos(params.id)) as CasePhotoArr[] | [];

				if (data.length === 0) {
					const noData: CasePhotoArr[] = [
						{ name: "no image", url: "/noCaseImg.png" },
					];
					setCasePhotoArr(noData);
					return;
				}
				setCasePhotoArr(data);
			} catch (error) {
				console.error("Error fetching case data:", error);
			}
		};

		fetchData();
	}, [params.id]);

	return (
		<Container>
			<CaseArea>
				{casePhotoArr.length > 0 && (
					<PhotoArea>
						<PhotoSlider casePhotoArr={casePhotoArr} />
					</PhotoArea>
				)}

				<Title>{caseData?.main.工程名稱}</Title>
				<Description>
					<Item>
						業主：
						<Detail>{caseData?.main.工程業主}</Detail>
					</Item>
					<Item>
						工程類型：
						<Detail>{caseData?.main.工程類型}</Detail>
					</Item>
					<Item>
						工程進度：
						<Detail>{caseData?.main.工程狀態}</Detail>
					</Item>

					<Item>
						模板數量：
						<Detail>{caseData?.main.模板數量} ㎡</Detail>
					</Item>
					{caseData &&
						caseData?.custom.length > 0 &&
						caseData?.custom.map((el, index) => {
							return (
								<Item key={index}>
									{el.title}：<Detail>{el.content}</Detail>
								</Item>
							);
						})}
				</Description>
			</CaseArea>
		</Container>
	);
}
