import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import {GiCrown, GiImperialCrown, GiQueenCrown} from "react-icons/gi";
import { ImSpades, ImClubs, ImDiamonds, ImHeart } from "react-icons/im";
import React from "react";
import { useState } from 'react';
import "./App.css";


const dealHand = (deck: any, amount: number) => {
    let hand = []

    if (deck.length < amount) {
        return null
    }

    //pop the top card off the deck and add it to the hand
    for (let i = 0; i < amount; i++) {
        hand.push(deck.pop())
    }

    return hand
}

const generateDeck = () => {
    const values = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K']
    let deck = []

    /*generate all the cards in the deck, originally I was going to store the suit as a separate array and generate cards using a double nested for loop,
    since suits do not change I found it more efficient to push all four in one for loop */
    for (let i = 0; i < values.length; i++) {
        deck.push({suit: "Hearts", value: values[i]}, {suit: "Diamonds", value: values[i]}, {suit: "Spades", value: values[i]}, {suit: "Clubs", value: values[i]})
    }

    // shuffle the deck using Fisher Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck
}

const getCardCenter = (card: any) => {
    let cardColor = 'black';

    if (card.suit === "Hearts" || card.suit === "Diamonds") {
        cardColor = 'red';
    }

    if (typeof card.value === 'number') {
        let iconArry = [];
        //fill the array with the number of icons equal to the value of the card
        for (let i = 0; i < card.value; i++) {
            iconArry.push(getIcon(card))
        }

        //return a grid item for each icon in the array
        return iconArry.map((icon, index) => <Grid item key={card.suit + card.number + index}>{icon}</Grid>)
    }

    else if (card.value === 'A') {
        return <Grid item>{getIcon(card, 100)}</Grid>
    }

    else if (card.value === 'J') {
        return <Grid item><GiImperialCrown size={100} color={cardColor}/></Grid>
    }

    else if (card.value === 'Q') {
        return <Grid item><GiQueenCrown size={100} color={cardColor}/></Grid>
    }

    else if (card.value === 'K') {
        return <Grid item><GiCrown size={100} color={cardColor}/></Grid>
    }
}

const getIcon = (card: any, size?: number) => {
    let suit = card.suit

    if (size === undefined) {
        size = 15
    }

    if (suit === "Spades") {
        return <ImSpades size={size}/>
    }

    else if (suit === "Hearts") {
        return <ImHeart color='red' size={size}/>
    }

    else if (suit === "Diamonds") {
        return <ImDiamonds color='red' size={size}/>
    }

    else if (suit === "Clubs") {
        return <ImClubs size={size}/>
    }
}

function App() {
    //React states are used and game data is lost on refresh. If we want game data to be saved on refresh we can use the browser local storage
    const [deck, setDeck] = useState(generateDeck());
    const [hand, setHand] = useState([{suit: null, value: null}]);
    let handList = null

    function generateHand(amount?: number) {
        if (amount === undefined) {
            amount = 5
        }

        let currentHand = dealHand(deck, amount)

        //if there are enough cards in the deck to deal a hand, set the state to the delt hand
        if (currentHand != null) {
            setHand(currentHand)
        }

        //If there are not enough cards in the deck to deal a hand, an alert will pop up to let the user know
        else {
            alert("Not enough cards in the deck to deal a hand")
        }
    }

    function resetDeck() {
        //set the deck state to a new deck and set the hand state to empty
        setDeck(generateDeck())
        setHand([{suit: null, value: null}])
    }

    /*if the hand is full, set the handList to the hand.
    This will generate a grid item for each card in the hand and will allow for any number of cards to be delt. */
    if (hand.length !== 1 && hand[0].suit !== null ) {
        handList = hand.map((card) =>
            <Grid item key={card.suit + " " + card.value}><div className='playingCard'>
                    <Card className='cardFace front' sx={{boxShadow: "8px 4px 8px #1F2420;"}}><CardContent>
                        <p className='cardFrontTop'>{card.value}<br/> {getIcon(card)}</p>
                        <Grid container spacing={2} justifyContent='center' className='cardFrontCenter'>{getCardCenter(card)}</Grid>
                        <p className='cardFrontBottom'>{card.value} <br/> {getIcon(card)}</p>
                    </CardContent></Card>
                    <Card className="cardFace back" sx={{boxShadow: "8px 4px 8px #000000;"}}></Card>
            </div></Grid>)
    }

  return (
    <div className="App">
      <h1 className="title" data-testid="title">Deal a Hand</h1>
        <p className="cardCount" data-testid="cardCount">{deck.length} cards remaining</p>
        <Grid container spacing={2} justifyContent="center">
            {handList}
        </Grid>
        <Grid container justifyContent='center' spacing={2}>
            <Grid item>
                <button onClick={() => generateHand()} className="button dealButton" data-testid="dealButton">Deal Hand</button>;
            </Grid>
            <Grid item>
                <button onClick={() => resetDeck() } className="button deckResetButton" data-testid="resetButton">Reset Deck</button>;
            </Grid>
        </Grid>
    </div>
  );
}

export default App;
