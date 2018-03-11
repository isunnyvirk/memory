import React, { Component } from 'react';
import Card from '../card/Card.js';
import Banner from '../banner/Banner.js';

import { Deck } from '../assets/data.js';
import { shuffle } from 'lodash';

import './Board.css';

const FOUND = 'found';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: shuffle(Deck),
      firstCard: null,
      firstCardIndex: null,

      matchedPairs: 0,
      foundPairs: [],

      cardsFlipped: 0,
    }

    this.onFlipCard = this.onFlipCard.bind(this);
    this.onFoundPair = this.onFoundPair.bind(this);
    this.onFlipCardsFaceDown = this.onFlipCardsFaceDown.bind(this);
  }

  onFoundPair(indexOne, indexTwo) {
    let { deck, foundPairs, matchedPairs } = this.state;

    let firstCard = deck[indexOne];
    let secondCard = deck[indexTwo];

    foundPairs.push(firstCard);
    foundPairs.push(secondCard);

    // increase count of number of pairs found
    matchedPairs++;

    // FOUND is key to distinguish cards found
    deck[indexOne] = FOUND;
    deck[indexTwo] = FOUND;

    this.setState({
      deck,
      foundPairs,
      matchedPairs,
      firstCard: null,
      firstCardIndex: null,

      cardsFlipped: 0,
    });
  }

  onFlipCardsFaceDown(indexOne, indexTwo) {
    let { deck } = this.state;

    // revert card state back to false if non matching
    deck[indexOne].flipped = false;
    deck[indexTwo].flipped = false;

    this.setState({
      firstCard: null,
      firstCardIndex: null,
      deck,

      cardsFlipped: 0,
    })
  }

  analyze(index) {
    let { deck } = this.state;

    deck[index].flipped = true;
    this.setState({
      deck,
      cardsFlipped: this.state.cardsFlipped + 1,
    });

    if (!this.state.firstCard) {
      this.setState({
        firstCard: deck[index],
        firstCardIndex: index,
      });
    } else if (this.state.firstCardIndex === index) {
      return;
    } else {
      const { firstCard, firstCardIndex } = this.state;
      const secondCard = deck[index];

      // set timeouts allow for a nice transition, can also use Promise.delay
      if (firstCard.value === secondCard.value) {
        setTimeout(() => {
          this.onFoundPair(firstCardIndex, index);
        }, 1000)
      }

      if (firstCard.value !== secondCard.value) {
        setTimeout(() => {
          this.onFlipCardsFaceDown(firstCardIndex, index);
        }, 1000)
      }
    }
  }

  onFlipCard(index) {
    const { cardsFlipped } = this.state;

    // ensures that user can't continuously click on > 2 cards at a time
    if (cardsFlipped < 2) {
      this.analyze(index);
    }
  }

  renderCards() {
    const { deck } = this.state;

    return deck.map((card, index) => {
      return <Card card={card} index={index} onFlipCard={this.onFlipCard} />
    });
  }

  renderFoundPairs() {
    const { foundPairs } = this.state;

    return foundPairs.map((card, index) => {
      return <Card card={card} index={index} />
    })
  }

  renderWinBanner() {
    const { matchedPairs } = this.state;

    if (matchedPairs === 26) {
      return (
        <Banner />
      );
    }
  }

  render() {
    const { matchedPairs } = this.state;

    return (
      <div className="board">
        { this.renderWinBanner() }
        <div className="set">
          { this.renderCards() }
        </div>
        <div className="game-log">
          <div className="matched-pairs">
            <span>
              Pairs Found: { matchedPairs }
            </span>
          </div>
          <div className="found-pairs">
            { this.renderFoundPairs() }
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
