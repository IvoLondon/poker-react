import React, { Component } from 'react';

import { suits, values } from "../utils";

import Layout from "./Layout";
import Deck from "./Deck";
import Modal from "./Modal";
import Player from "./Player"
import { Card, PlayerHand, Button, Footer } from "../Styles/Styled";

import poker from 'poker-hands';

class App extends Component {
	constructor() {
		super();
		this.state = {
			players : [
				{
					id: 0,
					name  : 'Player 1 name',
					editMode : false,
					cardsInHand : [],
				},
				{
					id: 1,
					name  : 'Player 2 name',
					editMode : false,
					cardsInHand : [],
				}
			],
			cardsInGame : [],
			msgModal : null,
		}
	}

	componentDidMount() {
		this.dealCardsHandler();
	}

	dealCardsHandler = () => {
		this.cardsHolder = [];

		const newState = { ...this.state }
		const playersList = [ ...newState.players ]

		//Clear cards in came
		this.setState({
			cardsInGame : [],
			msgModal : null,
		})

		playersList.map((player, idx) => {
			//Return cards
			const cardsList = []; 

			//Deal new cards
			for(let i = 0; i < 5; i++) {
				cardsList.push(this.createCard());
			}
			playersList[idx].cardsInHand = cardsList;
		})

		this.setState({
			players : playersList
		})
	}
	createCard() {
		//creates a cards
		let cardValue = values[Math.random() * values.length | 0];
		let cardSuit = suits[Math.random() * suits.length | 0];
		let card = cardValue+cardSuit;

		let checkCard = this.cardsHolder.find((cardIn) => { 
			return cardIn === card;
		});

		if(checkCard === undefined) {
			//if card is unique on table
			this.cardsHolder.push(card);
			this.setState(prevState => ({
				cardsInGame : [ ...prevState.cardsInGame, card]
			}))
			return {
				value : cardValue,
				suit : cardSuit
			}
		} else {
			//if card exist on table
			return this.createCard();
		}		
	}

	addPlayerHandler = () => {
		const newState = { ...this.state }
		if(newState.players.length >= 6) {
			alert('Maximum number of players is reached');
			return
		}
		const playersList = [...newState.players];

		let newPlayer = {
			id: newState.players.length,
			name : 'Player Name',
			editMode : false,
			cardsInHand : [],
		}
		for (var i=0; i < playersList.length; i++) {
	        if (playersList[i].id === newPlayer.id) {
	        	newPlayer.id++;
	        }
	    }
	    
		this.setState({
			players : newState.players.concat([newPlayer]),
		}, () => {
			this.dealCardsHandler();
		})
		
	}
	removePlayerHandler = (ev) => {

		// Get player and current state
		const id = ev.currentTarget.dataset.player;
		const player = {...this.state.players[this.state.players.findIndex(p => p.id == id)]}
		const newState = { ...this.state }

		if(newState.players.length <= 2) {
			alert('Maximum number of 2 players is reached')
			return
		}

		// Remove player from array
		const playersList = newState.players.concat();
		for (var i=0; i < playersList.length; i++) {
	        if (playersList[i].id === player.id) {
	        	playersList.splice(i, 1);
	        }
	    }
	    this.setState({
	    	players : playersList
	    })
	}
	editPlayerHandler = (ev) => {
		const id = ev.currentTarget.dataset.player;
		const player = { ...this.state.players[this.state.players.findIndex(p => p.id == id)] }

		// Get current state
		const newState = { ...this.state }
		const playersList = [...newState.players];
		

		// Change editmode
		for (var i=0; i < playersList.length; i++) {
	        if (playersList[i].id === player.id) {
	        	playersList[i].editMode = !player.editMode;
	        }
	    }
	    this.setState({
			players : playersList,
		})
	}

	enterPlayerNameHandler = (ev) => {
		const id = ev.currentTarget.dataset.player;
		const player = { ...this.state.players[this.state.players.findIndex(p => p.id == id)] }

		// Get current state
		const newState = { ...this.state }
		const playersList = [...newState.players];

		// Find player and compare val
		for (var i=0; i < playersList.length; i++) {
	        if (playersList[i].id === player.id) {
	        	playersList[i].name = ev.target.value;
	        }
	    }
	    this.setState({
			players : playersList,
		})
	}
	checkWinnerHandler = () => {
		let collectHands = [];
		let winnerHandMessage;

		this.state.players.map(player => {
			let playerHand = [];
			player.cardsInHand.map(hand => {
				const getHand = hand.value+hand.suit;			
					playerHand.push(getHand);
			})
			collectHands.push(playerHand.join(' '));
		})

		let winChallenger = collectHands[0];
		for(let i=1; i < collectHands.length; i++) {
			const duel = [winChallenger, collectHands[i]];
			if(poker.judgeWinner(duel)){
				winChallenger = collectHands[i];
			}
		}

		// Set winner message
		if(poker.hasRoyalFlush(winChallenger)){
			winnerHandMessage = 'Royal Flush';
		} else if(poker.hasStraightFlush(winChallenger)) {
			winnerHandMessage = 'Straight Flush';
		} else if(poker.hasFourOfAKind(winChallenger)) {
			winnerHandMessage = 'Four of a kind';
		} else if(poker.hasFullHouse(winChallenger)) {
			winnerHandMessage = 'Full House';
		} else if(poker.hasFlush(winChallenger)) {
			winnerHandMessage = 'Flush';
		} else if(poker.hasStraight(winChallenger)) {
			winnerHandMessage = 'Straight';
		} else if(poker.hasThreeOfAKind(winChallenger)) {
			winnerHandMessage = 'Three of a kind';
		} else if(poker.hasTwoPairs(winChallenger)) {
			winnerHandMessage = 'Two pair';
		} else if(poker.hasPair(winChallenger)) {
			winnerHandMessage = 'Single pair';
		} else {
			winnerHandMessage = 'High card';
		}

		this.setState({
			msgModal : 'The winner is ' + this.state.players[collectHands.findIndex(hnd => hnd == winChallenger)].name + ' with a ' + winnerHandMessage,
		})
	}

	render() {
		let players = null;

		if(this.state.players) {
			players = this.state.players.map(player => {
				return (
					<Player key={player.id} player={player}
							remove={this.removePlayerHandler}
							editMode={this.editPlayerHandler}
							editName={this.enterPlayerNameHandler} />
				)
			})
		}
		
		return (
				<Layout>
					
					<section>
						<h1>
						Cards deck
						</h1>
						<Deck played={this.state.cardsInGame} suits={suits} values={values} />
						
					</section>
					<section>
						<header>
							<h1>Players</h1>
						</header>
						<section>
							{players}
						</section>
						<Footer>
								<Button onClick={() => this.addPlayerHandler()}>
									<span role="img" alt="woman raising hand" aria-label="woman raising hand">🙋‍♀️</span>
									Add new player
								</Button>
								<Button onClick={() => this.checkWinnerHandler()}>
									<span role="img" alt="trophy" aria-label="trophy">🏆</span>
									Find the winner
								</Button>
						</Footer>
					</section>
					{ this.state.msgModal ? <Modal message={this.state.msgModal} reset={this.dealCardsHandler} /> : null }
				</Layout>
		);
	}
}

export default App;
