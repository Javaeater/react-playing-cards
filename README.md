# Deal a Hand

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Built by Cesser Jackson
## Problem

Let's build an app to deal a hand of 5 cards!

There are 52 differe nt cards in a standard deck of cards. We would like to deal multiple 5-card hands of random cards without repeating cards between hands.

Suits: Clubs, Hearts, Spades, Diamonds
Values: A,2,3,4,5,6,7,8,9,10,J,Q,K


## Solution

### Design Choices
My version of Deal a Hand was built using the MUI library in React to create a UI that can be used across a variety of devices. 

The app is responsive and can be used on mobile, tablet, and desktop devices. The amount of cards per row shown will vary based on screen size. The best experience is done on a desktop device.

### Functionality

The app is built to deal a hand of 5 cards. The user can click the "Deal Hand" button to deal a new hand of 5 cards. The cards are dealt randomly and will not repeat between hands. When no more cards are available, the user will be notified that the deck is empty. The user can click the "Reset Deck" button at any time to shuffle the deck.

This app is designed to look good with any number of cards delt. Feel free to change the number of cards delt by passing any positive int up to 52 to the generate hand function on the dealButton.

Try hovering over a card to reveal the back of the card!

### Installation

Please run `npm install` to install all dependencies.

Use `yarn start` to run the app.

Use `yarn test` to run the tests.
