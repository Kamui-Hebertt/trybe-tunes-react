import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../../services/userAPI';

import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      mainUser: '',

    };
  }

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = async () => {
    const response = await getUser();
    this.setState({ mainUser: response.name, isLoading: false });
  };

  render() {
    const { isLoading, mainUser } = this.state;
    return (

      <header data-testid="header-component">
        {isLoading ? <Loading /> : (

          <div data-testid="header-user-name">
            {mainUser}
          </div>

        )}
        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/header" data-testid="link-to-header">
          Header
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>

      </header>

    );
  }
}

export default Header;
