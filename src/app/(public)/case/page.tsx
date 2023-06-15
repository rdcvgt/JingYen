"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { theme } from "@/app/globalStyles";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { secondaryBtn, defaultBtn } from "@/components/button/Button.style";
import { getMainFieldsFromCases, MainFields } from "@/firebase/database";

const Container = styled.div`
	margin: 120px auto;
	width: 1120px;
	height: 100%;
	overflow-y: auto;
	scrollbar-gutter: stable;
`;

const Condition = styled.div`
	padding-bottom: 20px;
	border-bottom: 1px solid #ccc;
	width: 100%;
`;

const ConditionTitle = styled.div`
	${theme.font.pageTitleStyle}
	margin-bottom: 20px;
	color: ${theme.color.green[70]};
`;

const OptionsArea = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 50px;
	gap: 20px;
	margin-bottom: 20px;
`;

const Option = styled.div<{ isSelected: boolean }>`
	${({ isSelected }) =>
		isSelected
			? css`
					${defaultBtn}
			  `
			: css`
					${secondaryBtn}
			  `}

	width: 10%;
	height: 100%;
	border-radius: 50px;
`;

const Result = styled.div`
	width: 100%;
	margin-top: 20px;
`;

const Case = styled.div`
	border-bottom: 1px solid ${theme.color.beige[10]};
	padding: 30px 0;
`;

const Title = styled.div`
	${theme.font.caseTitleStyle}
	color: ${theme.color.green[70]};
	padding-bottom: 10px;
	transition: all 0.3s;
	&:hover {
		color: ${theme.color.green[50]};
		transition: all 0.3s;
	}
`;

const Item = styled.div`
	${theme.font.caseDescStyle}
	display: flex;
	align-items: center;
	padding-top: 5px;
`;

const Detail = styled.div``;

export default function SearchCase() {
	const [caseData, setCaseData] = useState<MainFields[] | undefined>();
	const [filteredData, setFilteredData] = useState<MainFields[] | []>();
	const [isCompleted, setIsCompleted] = useState<boolean>(true);
	const [isOngoing, setIsOngoing] = useState<boolean>(false);
	const [isPersonal, setIsPersonal] = useState<boolean>(true);
	const [isGovernment, setIsGovernment] = useState<boolean>(true);

	useEffect(() => {
		const getData = async () => {
			const data = (await getMainFieldsFromCases()) as MainFields[];
			setCaseData(data);
		};
		getData();
	}, []);

	useEffect(() => {
		if (!caseData) return;
		const newData = [] as MainFields[];
		if (isPersonal) {
			newData.push(
				...caseData.filter((el) => el.mainField.工程類型 === "民間")
			);
		}
		if (isGovernment) {
			newData.push(
				...caseData.filter((el) => el.mainField.工程類型 === "公有")
			);
		}
		const finalData = [] as MainFields[];
		if (isCompleted) {
			finalData.push(
				...newData.filter((el) => el.mainField.工程狀態 === "已完成")
			);
		}
		if (isOngoing) {
			finalData.push(
				...newData.filter((el) => el.mainField.工程狀態 === "進行中")
			);
		}

		setFilteredData(finalData);
	}, [caseData, isPersonal, isGovernment, isCompleted, isOngoing]);

	return (
		<Container>
			<ConditionTitle>成功案例</ConditionTitle>
			<Condition>
				<OptionsArea>
					工程進度：
					<Option
						isSelected={isCompleted}
						onClick={() => {
							setIsCompleted(!isCompleted);
							setIsOngoing(!isOngoing);
						}}>
						已完成
					</Option>
					<Option
						isSelected={isOngoing}
						onClick={() => {
							setIsOngoing(!isOngoing);
							setIsCompleted(!isCompleted);
						}}>
						進行中
					</Option>
				</OptionsArea>
				<OptionsArea>
					工程類型：
					<Option
						isSelected={isPersonal}
						onClick={() => {
							setIsPersonal(!isPersonal);
						}}>
						民宅
					</Option>
					<Option
						isSelected={isGovernment}
						onClick={() => {
							setIsGovernment(!isGovernment);
						}}>
						公有
					</Option>
				</OptionsArea>
			</Condition>
			<Result>
				{filteredData &&
					filteredData.map((el) => (
						<Link
							key={el.caseId}
							href={`/case/${el.caseId}`}
							rel="noopener noreferrer"
							target="_blank">
							<Case>
								<Title>{el.mainField.工程名稱}</Title>
								<Item>
									業主：<Detail>{el.mainField.工程業主}</Detail>
								</Item>
								<Item>
									模板數量：<Detail>{el.mainField.模板數量} ㎡</Detail>
								</Item>
							</Case>
						</Link>
					))}
				{filteredData?.length === 0 && <Title>尚未有相關工程案例</Title>}
			</Result>
		</Container>
	);
}
