import styled, { css } from "styled-components";

export const fullSize = (type:"fixed"|"absolute"="absolute") => css`
	position: ${type};
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`