import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favorites: [],

    };
  }

  addingFavoritesSongs = (event) => {
    const { value } = event.target;

    this.setState({ isLoading: true });

    console.log(value);
    addSong(value)
      .then(() => this.setState((prev) => ({ favorites: [...prev.favorites, value],
        isLoading: false })));
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading && <Loading />}

        <h3>{trackName}</h3>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteCheckBox">
          Favorita
          <input
            type="checkbox"
            name="favoriteCheckBox"
            id="favoriteCheckBox"
            data-testid={ `checkbox-music-${trackId}` }
            ckecked={ this.addingFavoritesSongs }
            onChange={ this.addingFavoritesSongs }
            value={ trackId }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,

  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
export default MusicCard;
