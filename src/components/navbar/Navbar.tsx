"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const pages = [
	{ name: "工程實績", url: "/case" },
	{ name: "關於我們", url: "/about-us" },
	{ name: "聯繫業務", url: "/contact" },
];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar
			position="fixed"
			color="transparent"
			sx={{
				WebkitBackdropFilter: "saturate(180%) blur(5px)",
				backdropFilter: "saturate(180%) blur(5px)",
				backgroundColor: "rgba(256, 256, 256 ,0.7)",
				boxShadow: "none",
				borderBottom: "1px solid #eaeaea",
			}}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Link href="/">
						<Box
							sx={{
								mr: 1,
								display: { xs: "none", md: "flex" },
								gap: "5px",
								alignItems: "center",
							}}>
							<Image width={20} height={20} alt="" src="/logo.png" />
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{
									display: "inline-block",
									height: "100%",
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: ".2rem",
									color: "inherit",
									textDecoration: "none",
								}}>
								瑾諺工程
							</Typography>
						</Box>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit">
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}>
							{pages.map((page) => (
								<Link href={page.url} passHref key={page.url}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign="center">{page.name}</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}>
						瑾諺工程
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Link href={page.url} passHref key={page.url}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "#000000", display: "block" }}>
									{page.name}
								</Button>
							</Link>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
