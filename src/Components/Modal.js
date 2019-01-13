import React from 'react';
import { BackDrop, Dialogue, ButtonDialogue } from "../Styles/Styled";

const Modal = (props) => {
	return (
		<BackDrop>
			<Dialogue>
				<h3>{ props.message }</h3>

				<ButtonDialogue onClick={() => props.reset()}>
					<span role="img" alt="trophy" aria-label="trophy">🏆</span>
					Start a new game
				</ButtonDialogue>
			</Dialogue>
		</BackDrop>
	)
}
export default Modal;