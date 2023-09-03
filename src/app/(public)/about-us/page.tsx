"use client";

import { Container, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Image from "next/image";

const companyImgUrl =
	"https://firebasestorage.googleapis.com/v0/b/jingyen-45c98.appspot.com/o/home%2Fabout-us%2Fcompany.png?alt=media&token=3e874576-ff69-4945-99e4-34840919a876";

export default function AboutUs() {
	return (
		<Container sx={{ mt: 14 }}>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
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
								<Typography
									variant="h2"
									sx={{ width: "100%", textAlign: "center" }}>
									關於瑾諺
								</Typography>
								<Divider
									sx={{
										margin: 4,
									}}
								/>
								<Box
									sx={{
										margin: "0 auto",
										width: "60%",
										display: "flex",
										flexWrap: "wrap",
										justifyContent: "center",
									}}>
									<Typography variant="body2" sx={{ width: "100%", mb: 4 }}>
										瑾諺長期致力於建築模板解決方案。匯聚了業界領先的建築師、工程師和專案管理專家，我們的目標是為客戶提供卓越的模板建築設計、施工管理和工程執行服務。
									</Typography>
									<Typography variant="body2" sx={{ width: "100%", mb: 4 }}>
										提供的服務包括建築設計、3D建模和渲染、土地利用分析、施工圖和詳細設計、預算和成本估算、建造管理、可持續設計和能源效率優化、室內設計，以及建築許可和法規遵循等方面。
									</Typography>
									<Typography variant="body2" sx={{ width: "100%", mb: 4 }}>
										不論您的項目規模如何，我們都具備經驗和專業知識，以確保您的建築項目達到最高標準。我們期待著為您的建築需求提供優秀的解決方案。請與我們聯繫，讓我們共同實現您的建築願景。
									</Typography>
								</Box>
							</Box>
						</Grid>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box
							sx={{
								height: "auto",
								width: "100%",
								mb: 10,
							}}>
							<Typography
								variant="h2"
								sx={{ width: "100%", textAlign: "center" }}>
								組織架構
							</Typography>
							<Divider sx={{ margin: 4 }} />
							<Box sx={{ display: "flex", justifyContent: "center" }}>
								<Image
									width={1000}
									height={400}
									alt="組織架構圖"
									src={companyImgUrl}
									style={{ objectFit: "cover" }}></Image>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
