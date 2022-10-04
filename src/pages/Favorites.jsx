import React, { Component } from 'react';
import Header from './compoents/Header';

class Favorite extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites" />
      </>
    );
  }
}
export default Favorite;
