"use client";

import Image from "next/image";
import { Container, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { palette } from "@mui/system";
import { grey } from "@mui/material/colors";

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

export default function Home() {
	return (
		<Container sx={{ mt: 5 }}>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<Box
							sx={{
								height: 800,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}>
							<Typography variant="h1" sx={{ width: "100%" }}>
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
								height: 1000,
							}}>
							<Typography variant="h2" sx={{ width: "100%" }}>
								服務項目
							</Typography>
							<Divider sx={{ mt: 2 }} />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
