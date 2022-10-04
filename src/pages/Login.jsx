import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

import Loading from './compoents/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isDisable: true,
      isLoading: false,
    };
  }

  handletyping = (event) => {
    // const { inputName } = this.state;
    const { value } = event.target;

    this.setState({ inputName: value }, this.checkBtn);
  };

  checkBtn = () => {
    const { inputName } = this.state;
    const three = 3;
    if (
      inputName.length >= three) {
      this.setState(
        { isDisable: false },
      );
    } else {
      this.setState({ isDisable: true });
    }
  };

  realRequest = async () => {
    const { inputName } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: inputName });
    history.push('/search');
    this.setState({ isLoading: false });
  };

  render() {
    const { inputName, isDisable, isLoading } = this.state;
    // const { createUser } = this.props;
    return (

      <div data-testid="page-login">
        {isLoading ? <Loading /> : (
          <form>
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.handletyping }
              value={ inputName }
              name="inputName"
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isDisable }
              onClick={ this.realRequest }
            >
              Entrar
            </button>

          </form>
        )}

      </div>
    );
  }
}

Login.propTypes = {

  history: PropTypes.shape({

    push: PropTypes.func,

  }).isRequired,
};

export default Login;
