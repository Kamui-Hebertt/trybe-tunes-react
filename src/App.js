import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileEdit from './pages/ProfileEdit';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Album from './pages/Album';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

class App extends React.Component {
  render() {
    return (
      <>

        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/profile" component={ Profile } />

          <Route exact path="/favorites" component={ Favorites } />

          <Route exact path="/album/:id" component={ Album } />

          <Route exact path="/search" component={ Search } />

          <Route exact path="/profile/edit" component={ ProfileEdit } />

          <Route exact path="*" component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
