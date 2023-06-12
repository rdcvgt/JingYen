/** @type {import('next').NextConfig} */

//請確保在 next.config.js 的最頂部加入 require("dotenv").config()，這樣 Next.js 在啟動時會載入 .env 檔案中的環境變數。
require("dotenv").config();

const nextConfig = {
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
};

module.exports = nextConfig;
