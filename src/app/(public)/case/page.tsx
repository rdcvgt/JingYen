"use client";

import { useEffect, useState } from "react";
import { theme } from "@/app/globalStyles";
import styled from "@emotion/styled";
import { secondaryBtn, defaultBtn } from "@/components/button/Button.style";
import { FormData } from "@/app/(private)/cms/types";

const Container = styled.div`
	margin: 120px auto;
	width: 1120px;
	height: 100%;
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

const Option = styled.div`
	${secondaryBtn}
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
	padding: 20px 0;
`;

const Title = styled.div`
	${theme.font.caseTitleStyle}
	color: ${theme.color.green[70]};
	padding-bottom: 10px;
`;

const Item = styled.div`
	${theme.font.caseDescStyle}
	display: flex;
	align-items: center;
	padding-top: 5px;
`;

const Detail = styled.div``;

export default function SearchCase() {
	const [caseData, setCaseData] = useState<FormData | false>();

	useEffect(() => {}, []);

	return (
		<Container>
			<ConditionTitle>成功案例</ConditionTitle>
			<Condition>
				<OptionsArea>
					工程進度：
					<Option>已完成</Option>
					<Option>進行中</Option>
				</OptionsArea>
				<OptionsArea>
					工程類型：
					<Option>民宅</Option>
					<Option>企業</Option>
					<Option>公有</Option>
				</OptionsArea>
			</Condition>
			<Result>
				<Case>
					<Title>標題</Title>
					<Item>
						業主：<Detail>朋勝委</Detail>
					</Item>
					<Item>
						模板數量：<Detail>wqerqwrqwer ㎡</Detail>
					</Item>
				</Case>
			</Result>
		</Container>
	);
}
