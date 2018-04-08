import React from 'react';
import PropTypes from 'prop-types'
import Routes from './Routes';
import { Provider } from 'react-redux';
import './App.css';

class App extends React.Component {
  render() {     
      return (
      <Provider className="app" store={this.props.store}>
        <Routes />
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;