import React, { Component } from 'react';

import './Card.css';

const FOUND = 'found';

class Card extends Component {
  constructor(props) {
    super(props);

    this.onClickFaceUp = this.onClickFaceUp.bind(this);
  }

  onClickFaceUp() {
    this.props.onFlipCard(this.props.index);
  }

  renderCardFound() {
    return (
      <div className="card found">
      </div>
    )
  }

  renderCardFaceDown() {
    return (
      <div className="card" onClick={this.onClickFaceUp}>
        <div className="card-face">
          <img height='120' width='100' src="https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_1024x1024.png?v=1494193481" alt=""/>
        </div>
      </div>
    );
  }

  renderCard() {
    const { value, shape } = this.props.card;
    return (
      <div className="card flipped" onClick={this.onClickFaceUp}>
        <div className="number-top">
          { value }
        </div>
        <div className="card-face">
          <img height='40' width='40' src={shape} alt=""/>
        </div>
        <div className="number-bottom">
          { value }
        </div>
      </div>
    );
  }

  render() {
    const { flipped } = this.props.card;
    if (this.props.card === FOUND) {
      return this.renderCardFound();
    } else if (!flipped) {
      return this.renderCardFaceDown();
    }

    return this.renderCard();
  }
}

export default Card;
