# Grabyo Poker

## Instructions

You need to create a poker application. The user interface is already built and your goal is it to make the whole thing functional.

### Requirements

* A game can have between 2 and 6 players.
* You can add, remove, and edit a player
* Cards from the deck should be drag and droppable into a player's hand
* The same card can not be present in two players hand
* A card needs to be "selected" in the card deck if it is added to a player's hand
* You are free to display the winner the way you want after clicking on the "Find the winner" button

### Bonus

Unit tests and Enzyme tests are encouraged :-)

### Packages

Below are two packages that you can use to solve the poker hand comparison or the drag and drop

https://www.npmjs.com/package/poker-hands
https://www.npmjs.com/package/react-dnd

If you're not familiar with those or if you know something more suited to solve this problem, you are more than welcome to use your preferred solution.

## Technical details

### Develop

To start

```
npm start
```

To add a package to the application you should run the following command

```
yarn add <package-name>
```

### Unit test

The tests are running using Jest and Enzyme

```
npm test
npm test -- --watch
```