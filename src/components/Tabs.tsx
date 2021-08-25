import React, { useState } from "react";
import styled, { css } from "styled-components";

interface TabsProps {
	tabs: {
		label: string;
		content: React.ReactNode;
	}[];
}

export const Tabs = ( { tabs }: TabsProps ) => {
	const [ activeIndex, setActiveIndex ] = useState<number>(0);

	return (
		<Wrap>
			<TabWrap>
				{tabs.map(({ label }, index) => (
					<Tab active={index === activeIndex} onClick={() => setActiveIndex(index)}>
						{label}
					</Tab>
				))}
			</TabWrap>
			<ContentWrap>
				{tabs[activeIndex].content}
			</ContentWrap>
		</Wrap>
	);
}

const Wrap = styled.div`
	height: 100%;
	min-height: 100%;
`;
const TabWrap = styled.div`
	display: flex;
	justify-items: stretch;
	justify-content: space-evenly;
	align-items: stretch;
`;
const ContentWrap = styled.div`
	border: 1px solid black;
	border-top: none;
	padding: 10px;
`;

const activeTab = css`
	
`;

const inactiveTab = css`
	border-bottom: 1px solid black;
	background-color: #00000022;
`;
interface TabButtonProps {
	active: boolean;
}
const Tab = styled.h4<TabButtonProps>`
	text-align: center;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	border: 1px solid black;
	border-bottom: none;
	flex: 1;
	margin: 0;
	padding: 10px;
	cursor: pointer;
	${p => p.active ? activeTab : inactiveTab};
`;
