import React, { Component } from 'react';
import Header from './compoents/Header';

class Album extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album" />

      </>

    );
  }
}

export default Album;
