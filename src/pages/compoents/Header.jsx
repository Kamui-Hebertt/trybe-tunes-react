import React, { Component } from 'react';
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
      </header>

    );
  }
}

export default Header;
