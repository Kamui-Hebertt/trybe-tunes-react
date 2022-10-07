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
    const { anyprop } = this.props;
    const request = await getFavoriteSongs();
    const checkTheLocalStorageToVerify = request

      .some((elementTrack) => elementTrack.trackId === anyprop.trackId);
    console.log(checkTheLocalStorageToVerify);
    if (checkTheLocalStorageToVerify) {
      this.setState({ isChecked: true });
    }
  };

  addingFavoritesSongs = (event) => {
    const { isChecked } = this.state;
    const { anyprop } = this.props;
    if (!isChecked) { this.setState({ isChecked: true }); }
    if (isChecked) { this.setState({ isChecked: false }); }
    const { value } = event.target;
    this.setState({ isLoading: true });
    console.log(value);
    addSong(anyprop)
      .then(() => this.setState((prev) => ({ favorites: [...prev.favorites, anyprop],
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
  anyprop: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
export default MusicCard;
