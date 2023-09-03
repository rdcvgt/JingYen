"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { theme } from "@/app/globalStyles";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { secondaryBtn, defaultBtn } from "@/components/button/Button.style";
import { getMainFieldsFromCases, MainFields } from "@/firebase/database";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

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
	color: ${theme.color.beige[90]};
`;

const Result = styled.div`
	width: 100%;
`;

const Title = styled.div`
	${theme.font.caseTitleStyle}
	color: ${theme.color.beige[90]};
	padding-bottom: 10px;
	transition: all 0.3s;
`;

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

	const handleClickCompleted = () => {
		setIsCompleted(!isCompleted);
		setIsOngoing(!isOngoing);
	};

	const handleClickOngoing = () => {
		setIsOngoing(!isOngoing);
		setIsCompleted(!isCompleted);
	};

	return (
		<Container>
			<ConditionTitle>工程實績</ConditionTitle>
			<Condition>
				<Stack direction="row" spacing={1} sx={{ mb: 4, alignItems: "center" }}>
					工程進度：
					<Chip
						label="已完成"
						variant={isCompleted ? "filled" : "outlined"}
						onClick={handleClickCompleted}
					/>
					<Chip
						label="進行中"
						variant={isOngoing ? "filled" : "outlined"}
						onClick={handleClickOngoing}
					/>
				</Stack>
				<Stack direction="row" spacing={1} sx={{ mb: 4, alignItems: "center" }}>
					工程類型：
					<Chip
						label="民宅"
						variant={isPersonal ? "filled" : "outlined"}
						onClick={() => {
							setIsPersonal(!isPersonal);
						}}
					/>
					<Chip
						label="公有"
						variant={isGovernment ? "filled" : "outlined"}
						onClick={() => {
							setIsGovernment(!isGovernment);
						}}
					/>
				</Stack>
			</Condition>
			<Result>
				<List
					sx={{ width: "100%", bgcolor: "background.paper" }}
					component="nav">
					{filteredData &&
						filteredData.map((el) => (
							<Link
								key={el.caseId}
								href={`/case/${el.caseId}`}
								rel="noopener noreferrer"
								target="_blank">
								<ListItemButton divider sx={{ height: "100px" }}>
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: "black" }}>
											<HomeWorkIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={el.mainField.工程名稱}
										secondary={`模版數量：${el.mainField.模板數量} ㎡`}
									/>
								</ListItemButton>
							</Link>
						))}
				</List>
				{filteredData?.length === 0 && <Title>尚未有相關工程案例</Title>}
			</Result>
		</Container>
	);
}
