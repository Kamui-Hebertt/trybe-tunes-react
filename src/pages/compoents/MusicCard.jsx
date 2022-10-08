import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Loading from './Loading';
// import getFavoriteSongs, ;
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

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
    // console.log(checkTheLocalStorageToVerify);
    if (checkTheLocalStorageToVerify) {
      this.setState({ isChecked: true });
    }
  };

  addingFavoritesSongs = () => {
    const { isChecked, favorites } = this.state;
    const { anyprop } = this.props;
    if (!isChecked) { this.setState({ isChecked: true }); }
    if (isChecked) { this.setState({ isChecked: false }); }
    this.setState({ isLoading: true });

    if (isChecked) {
      const remove = favorites.filter((s) => s.trackId !== anyprop.trackId);
      removeSong(anyprop)
        .then(() => this.setState({ favorites: [remove], isLoading: false }));
    }

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
  trackName: PropTypes.string,
  anyprop: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;
export default MusicCard;
