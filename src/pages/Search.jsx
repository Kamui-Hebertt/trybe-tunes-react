import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './compoents/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './compoents/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameBoA: '',
      lockedBtn: true,
      isLoading: false,
      artist: '',
      album: [],
      clickedBtn: false,
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

  findingTheResult = async () => {
    this.setState({ clickedBtn: true });
    const { nameBoA } = this.state;
    this.setState({ isLoading: true });
    const request = await searchAlbumsAPI(nameBoA);

    this.setState({ isLoading: false, album: request, artist: nameBoA });
    this.setState({ nameBoA: '' });
  };

  render() {
    const { nameBoA, lockedBtn, isLoading, album, artist, clickedBtn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading /> : (
          <>
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
              onClick={ this.findingTheResult }
            >
              Pesquisar
            </button>

          </>

        )}
        {clickedBtn && (
          <p>
            Resultado de álbuns de:
            {' '}
            {artist}
          </p>

        )}

        {album.length > 0 && (album.map((elementAlbum) => (

          <Link
            data-testid={ `link-to-album-${elementAlbum.collectionId}` }
            key={ elementAlbum.artistId }
            to={ `/album/${elementAlbum.collectionId}` }
          >
            <div>
              {elementAlbum.collectionName}
              <img
                src={ elementAlbum.artworkUrl100 }
                alt={ elementAlbum.collectionName }
              />

            </div>

          </Link>

        ))) }
        {(album.length > 0) || (<p>Nenhum álbum foi encontrado</p>)}

      </div>
    );
  }
}

export default Search;
