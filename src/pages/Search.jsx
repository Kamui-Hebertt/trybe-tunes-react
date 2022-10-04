import React, { Component } from 'react';
import Header from './compoents/Header';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameBoA: '',
      lockedBtn: true,
    };
  }

  typing = (event) => {
    const { value } = event.target;
    this.setState({ nameBoA: value }, this.unlockBtn);
  };

  unlockBtn = () => {
    const { nameBoA } = this.state;
    const two = 2;
    if (nameBoA.length
       >= two) {
      this.setState({ lockedBtn: false });
    } else { this.setState({ lockedBtn: true }); }
  };

  render() {
    const { nameBoA, lockedBtn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          placeholder="insira o nome da banda ou artista"
          data-testid="search-artist-input"
          onChange={ this.typing }
          value={ nameBoA }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ lockedBtn }
        >
          Pesquisar
        </button>

      </div>
    );
  }
}

export default Search;
