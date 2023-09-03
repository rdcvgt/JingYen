"use client";

import { useState } from "react";

import Image from "next/image";
import { Container, Typography } from "@mui/material";

import styled from "@emotion/styled";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { grey } from "@mui/material/colors";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Square = styled.div`
	width: 250px;
	height: 250px;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.9);
	position: absolute;
	top: -180px;
	right: 0;
`;

const Blur = styled.div`
	width: 250px;
	height: 250px;
	border-radius: 50px;
	border: 1px solid #ccc;
	--webkit-backdrop-filter: saturate(180%) blur(10px);
	backdrop-filter: saturate(180%) blur(10px);
	background-color: rgba(256, 256, 256, 0.1);
	box-shadow: none;
	position: absolute;
	right: 120px;
	top: -80px;
`;

const projects = [
	{
		scale: "110,323㎡",
		name: "大潤發湳雅街商場",
		photo:
			"https://firebasestorage.googleapis.com/v0/b/jingyen-45c98.appspot.com/o/home%2Fprojects%2F%E5%A4%A7%E6%BD%A4%E7%99%BC.png?alt=media&token=e393b7b5-79de-4c11-a9b2-1d7f115b0e20",
	},
	{
		scale: "89,912㎡",
		name: "國家中山科學研究院",
		photo:
			"https://firebasestorage.googleapis.com/v0/b/jingyen-45c98.appspot.com/o/home%2Fprojects%2F%E7%A0%94%E7%A9%B6%E9%99%A2.png?alt=media&token=579df52a-c851-47bf-b581-c02fc3adda3a",
	},
	{
		scale: "147,407㎡",
		name: "陸軍湖口三營區",
		photo:
			"https://firebasestorage.googleapis.com/v0/b/jingyen-45c98.appspot.com/o/home%2Fprojects%2F%E9%99%B8%E8%BB%8D.png?alt=media&token=cfbb334a-e0d8-4157-b960-125c2f38b6bd",
	},
	{
		scale: "63,548㎡",
		name: "四知四村都更案",
		photo:
			"https://firebasestorage.googleapis.com/v0/b/jingyen-45c98.appspot.com/o/home%2Fprojects%2F%E9%83%BD%E6%9B%B4%E6%A1%88.png?alt=media&token=57c8faf8-7402-4374-ab94-44e8ff95beb7",
	},
];

const services = [
	{
		title: "以下項目皆為範例",
		content: "我可以根據公司實際營運狀況與服務項目提出調整。",
	},
	{
		title: "建築設計",
		content:
			"我們提供建築師設計的建築圖紙和平面圖，以滿足客戶的特定需求和規格。",
	},
	{
		title: "規劃和土地利用分析",
		content:
			"協助您的建案確定最佳土地利用方式，考慮到環境、法規和可持續性因素。",
	},
	{
		title: "施工圖和詳細設計",
		content: "創建施工所需的詳細圖紙，包括結構設計、電氣、管道和機械系統。",
	},
	{
		title: "預算和成本估算",
		content: "協助您估算建造項目的預算，並監控成本以確保在預算內完成。",
	},
	{
		title: "建造管理",
		content:
			"提供建造項目的管理和監督，以確保工程順利進行，符合時間表和質量標準。",
	},
	{
		title: "建築許可和法規遵循",
		content: "協助您處理建築許可和確保項目遵循當地建築法規和規定。",
	},
];

const serviceImg =
	"https://firebasestorage.googleapis.com/v0/b/jingyen-45c98.appspot.com/o/home%2Fservices%2Fservice.png?alt=media&token=8457fb74-0c6b-4533-9daf-671a0192e94e";

export default function Home() {
	const [isSelectedService, setIsSelectedService] = useState(-1);

	const handleClick = (index: number) => {
		if (index === isSelectedService) {
			setIsSelectedService(-1);
			return;
		}

		setIsSelectedService(index);
	};

	return (
		<Container sx={{ mt: 5 }}>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<Box
							sx={{
								height: 800,
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								position: "relative",
							}}>
							<Box sx={{ position: "absolute", right: 0 }}>
								<Square />
								<Blur />
								{/* <Round /> */}
								{/* <LogoBox>
									<Image width={200} height={200} alt="" src="/logo.png" />
								</LogoBox> */}
							</Box>
							<Typography variant="h1" sx={{ width: "100%", fontWeight: 500 }}>
								專業版模，
								<br />
								成就非凡建築。
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						container
						xs={12}
						md={12}
						sx={{
							height: "auto",
							marginBottom: "100px",
						}}>
						<Grid item xs={12} md={12}>
							<Box>
								<Typography variant="h2" sx={{ width: "100%" }}>
									案例實績
								</Typography>
								<Divider sx={{ mt: 2 }} />
							</Box>
						</Grid>
						<Grid item xs={0} md={3} lg={3}></Grid>
						<Grid
							item
							xs={9}
							md={9}
							lg={9}
							sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
							<Box
								sx={{
									width: "100%",
									display: "flex",
									justifyContent: "flex-end",
									flexWrap: "wrap",
									gap: 5,
								}}>
								{projects.map((el) => (
									<Box key={el.scale}>
										<Image
											width={320}
											height={320}
											alt={el.name}
											src={el.photo}
											style={{ objectFit: "cover" }}
										/>
										<Typography
											variant="subtitle2"
											sx={{ width: "100%", color: grey[600] }}>
											{el.scale}
										</Typography>
										<Typography variant="subtitle2" sx={{ width: "100%" }}>
											{el.name}
										</Typography>
									</Box>
								))}
							</Box>
						</Grid>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box
							sx={{
								height: "auto",
								mb: 10,
							}}>
							<Typography variant="h2" sx={{ width: "100%" }}>
								服務項目
							</Typography>
							<Divider sx={{ mt: 2, mb: 4 }} />

							<Box
								sx={{
									display: "flex",
									gap: "20px",
									justifyContent: "space-evenly",
								}}>
								<List
									sx={{
										width: "50%",
										bgcolor: "background.paper",
									}}
									component="nav"
									aria-labelledby="nested-list-subheader">
									{services.map((item, index) => (
										<div key={item.title}>
											<ListItemButton
												onClick={() => handleClick(index)}
												sx={{ height: "80px" }}
												divider>
												<ListItemText primary={item.title} />
												{isSelectedService === index &&
												isSelectedService !== -1 ? (
													<ExpandLess />
												) : (
													<ExpandMore />
												)}
											</ListItemButton>
											<Collapse
												in={isSelectedService === index}
												timeout="auto"
												unmountOnExit>
												<List component="div" disablePadding>
													<ListItemButton sx={{ pl: 4, minHeight: "80px" }}>
														<ListItemText primary={item.content} />
													</ListItemButton>
												</List>
											</Collapse>
										</div>
									))}
								</List>
								<Image
									width={420}
									height={600}
									alt="瑾諺提供專業服務"
									src={serviceImg}
									style={{ objectFit: "cover" }}
								/>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
