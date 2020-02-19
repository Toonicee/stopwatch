import React from 'react';
import PropTypes from 'prop-types';

import Progress from '../Progress';
import Control from '../Control';
import Tabs from '../Tabs';
import Timer from '../Timer';
import Countdown from '../Countdown';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameWidget: 'time',
    }
  }

  selectWidget = (target) => {
    this.setState({nameWidget: target.name})
  }

  renderWidget = () => {
    const { nameWidget } = this.state;

    switch (nameWidget) {
      case 'time':
        return <Timer />
      case 'countdown': 
        return <Countdown />
    }
  }

  render() {
    const { nameWidget } = this.state;
    return (
      <div className="main-container">
        <div>
          <Tabs 
            selectWidget={this.selectWidget}
            name={nameWidget} />
        </div>
        {this.renderWidget()}
        <Progress />
        <Control />
      </div>
    )
  }
}

export default App;
