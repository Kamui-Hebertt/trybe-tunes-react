import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Loading from './Loading';
// import getFavoriteSongs, ;
import { addSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favorites: [],
      isChecked: false,
    };
  }

  componentDidMount() {
    this.gettingTheSongs();
  }

  gettingTheSongs = async () => {
    const { trackId } = this.props;
    const request = await getFavoriteSongs();
    const checkTheLocalStorageToVerify = request
      .find((elementTrack) => elementTrack.trackId === trackId);
    console.log(checkTheLocalStorageToVerify);
    if (checkTheLocalStorageToVerify) {
      this.setState({ isChecked: true });
    }
  };

  addingFavoritesSongs = (event) => {
    const { isChecked } = this.state;
    if (!isChecked) { this.setState({ isChecked: true }); }
    const { value } = event.target;
    this.setState({ isLoading: true });
    console.log(value);
    addSong(value)
      .then(() => this.setState((prev) => ({ favorites: [...prev.favorites, value],
        isLoading: false })));
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;
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
            onChange={ this.addingFavoritesSongs }
            value={ trackId }
            checked={ isChecked }
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
