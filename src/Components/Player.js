import React from 'react';
import { Card, PlayerHand, Button } from "../Styles/Styled";

const Player = (props) => (
	<article key={props.player.id}>
		<p>
			{props.player.editMode ? <input value={props.player.name} data-player={props.player.id} onChange={props.editName} /> : props.player.name}
			
			<Button data-player={props.player.id} onClick={props.editMode}>
				<span role="img" alt="pencil" aria-label="pencil">✏️</span>
				{props.player.editMode ? 'Confirm' : 'Edit'}
			</Button>
			<Button data-player={props.player.id} onClick={props.remove}>
				<span role="img" alt="flame" aria-label="flame">🔥</span>
				Remove
			</Button>
		</p>
		<PlayerHand>
			{props.player.cardsInHand.map((card) => {
				return (
					<Card key={card} suit={card.charAt(1)} value={card.charAt(0)}>
						{card.charAt(0)}
					</Card>
				)
			})}
		</PlayerHand>
	</article>
)


export default Player;