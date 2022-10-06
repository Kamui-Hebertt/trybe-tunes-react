import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Header from './compoents/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './compoents/MusicCard';
import Loading from './compoents/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      music: [],
      dataInfoAlbum: [],
      isLoading: false,

    };
  }

  componentDidMount() {
    this.getMusicsById();
  }

  getMusicsById = async () => {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ isLoading: true });
    const musicsResponse = await getMusics(id);
    const onlyRealTracks = musicsResponse.filter((ElementTracks) => ElementTracks.kind
    === 'song');
    console.log(onlyRealTracks);
    const onlyTrackId = onlyRealTracks.map((elementTrack) => elementTrack.trackId);
    console.log(onlyTrackId);
    this.setState({ music: onlyRealTracks,
      dataInfoAlbum: musicsResponse[0],
      isLoading: false,
    });
  };

  render() {
    const { music, isLoading, dataInfoAlbum } = this.state;
    return (
      <div data-testid="page-album">

        <Header />

        {isLoading && <Loading />}
        {
          isLoading || (

            <>
              <div data-testid="artist-name">{dataInfoAlbum.artistName}</div>

              <div data-testid="album-name">{dataInfoAlbum.collectionName}</div>
              <div className="songsList">
                {music.map((elementTracks, index) => (

                  <MusicCard
                    trackName={ elementTracks.trackName }
                    key={ index }
                    previewUrl={ elementTracks.previewUrl }
                    trackId={ elementTracks.trackId }
                  />
                ))}
              </div>
            </>

          )
        }

      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string }),
  }).isRequired,
};

export default Album;
