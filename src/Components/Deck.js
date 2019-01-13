import React from "react";
import { Card } from "../Styles/Styled";

const Deck = ({ played, suits, values }) => (
	<>
		{suits.map(suit => {
			return (
			<div key={suit}>
				{values.map(value => {
					let isSelected = null;
					if(played.indexOf(value+suit) > -1) {
						isSelected = {selected : true}
					}
					return (
						<Card key={suit+value} suit={suit} value={value} isSelected >
							{value}
						</Card>
					)
				})}
			</div>
		)})}
	</>
);

export default Deck;
