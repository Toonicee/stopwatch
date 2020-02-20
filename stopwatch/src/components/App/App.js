import React from 'react';
import PropTypes from 'prop-types';

import Progress from '../Progress';
import Control from '../Control';
import Tab from '../Tabs';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameWidget: 'time',
    }
  }


  render() {
    const { nameWidget } = this.state;
    return (
      <div className="main-container">
        <div>
          <Tab />
        </div>
      </div>
    )
  }
}

export default App;
