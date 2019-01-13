import React from "react";
import { Card } from "../Styles/Styled";

const Deck = ({ played, suits, values }) => (
	<>
		{suits.map(suit => {
			return (
			<div key={suit}>
				{values.map(value => {
					return (
						<Card key={suit+value} suit={suit} value={value} { ...played.indexOf(value+suit) > -1 ? null : {selected : true}} >
							{value}
						</Card>
					)
				})}
			</div>
		)})}
	</>
);

export default Deck;
