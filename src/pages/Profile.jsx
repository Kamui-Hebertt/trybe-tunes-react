import React, { Component } from 'react';
import Header from './compoents/Header';

class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile" />
      </>
    );
  }
}

export default Profile;
