import React, { PropTypes, Component } from 'react';
import assign from 'lodash/assign';
import { connect } from 'react-redux';
import Cards from '../components/Cards';
import { removeCard } from '../actions/cardsActions';
import { removeCardId } from '../actions/listsActions';
import CreateCardModal from './CreateCardModal';

class CardsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null,
    };

    this.handleCardRemoveClick = this.handleCardRemoveClick.bind(this);
    this.handleAddCardBtnClick = this.handleAddCardBtnClick.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.setState({ modal: null });
  }

  handleAddCardBtnClick() {
    this.setState({
      modal: {
        name: 'createCard',
      },
    });
  }

  handleCardRemoveClick(cardId) {
    const { dispatch, listId } = this.props;
    dispatch(removeCard(cardId));
  }

  render() {
    const { cards, listId } = this.props;
    const { modal } = this.state;
    return (
      <div>
        <Cards
          cards={cards}
          onCardRemoveClick={this.handleCardRemoveClick}
          onAddCardBtnClick={this.handleAddCardBtnClick}
        />
        {modal && modal.name === 'createCard' ? (
          <CreateCardModal
            hideModal={this.hideModal}
            listId={listId}
          />
        ) : null}
      </div>
    );
  }
}

CardsContainer.propTypes = {
  cards: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { cards } = state.entities;
  const cardsIds = ownProps.cardsIds || [];

  return {
    cards: cardsIds.map(cardId =>
      assign({}, cards[cardId], {
        href: cards[cardId].link,
      })
    ),
  };
}

export default connect(
  mapStateToProps
)(CardsContainer);
