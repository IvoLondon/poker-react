import styled, { css } from "styled-components";
import { getColourForSuit } from "../utils";

export const Main = styled.main`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;

	.row {
		text-align: center
	}
`

export const Header = styled.header`
	max-width: 800px;
	padding: 20px 0;
	margin: 0 auto;
	border-bottom: 1px solid #eee;
	display: flex;
	align-items: center;

	img {
		margin-right: 20px;
	}
`

export const Card = styled.div`

	width: 30px;
	height: 55px;
	line-height: 55px;
	border-radius: 3px;
	background: #fff;
	box-shadow: 0 0 0 2px #fff;
	position: relative;
	display: inline-block;
	text-align: center;
	margin: 5px;
	font-weight: 700;

	border: 2px solid;
	border-color: ${props => getColourForSuit(props.suit)};
	color: ${props => getColourForSuit(props.suit)};

	&:after,
	&:before {
		content: "${props => props.suit}";
		position: absolute;
		font-size: 12px;
		line-height: 1.2;
		font-weight: 400;
	}

	&:after {
		top: 5px;
		right: 5px;
	}

	&:before {
		bottom: 5px;
		left: 5px;
	}

	${props => props.selected
		? css`
			background: ${getColourForSuit(props.suit)}
			box-shadow: 0 0 0 2px ${getColourForSuit(props.suit)};
			color: white;
			border-color: white;
		`
		: null
	}
`

export const Footer = styled.footer`
	border-top: 1px solid #eee;
	margin-top: 20px;
	padding: 20px 0;
`;

export const Button = styled.button`
	background: transparent;
	border: 1px solid #eee;
	border-radius: 5px;
	color: #eee;
	padding: .5em;

	& + & {
		margin-left: 20px;
	}
`

export const PlayerHand = styled.div`
	background: #888;
	padding: 10px;
	border-radius: 5px;
	min-height: 55px;
`;


export const BackDrop = styled.div`
	background: rgba(0,0,0,0.7);
	position:fixed;
	top:0;
	bottom:0;
	left:0;
	right:0;
	z-index:99;
`;

export const Dialogue = styled.div`
	background: #D8D8D8;
	position:absolute;
	top:50%;
	left:50%;
	max-width:300px;
	width:100%;
	padding:50px;
	transform:translate(-50%, -50%);
	z-index:999;
	color:#050505;
	text-align:center;
`;

export const ButtonDialogue = styled.button`
	background: transparent;
	border: 1px solid #050505;
	border-radius: 5px;
	color: #050505;
	padding: .5em;

	& + & {
		margin-left: 20px;
	}
`
