import React from 'react';

import Control from '../Control';
import Tables from '../TimerResult';

import './Timer.css';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      minutes: '00',
      seconds: '00',
      miliseconds: '00',
      startDisabled: false,
      stopDisabled: false,
      allTims: [],
    }
  }

start = () => {
  this.updateTime();
}

updateTime = () => {
  let timer = setInterval(() => {
    const { miliseconds, seconds, minutes } = this.state;
    let mil = (Number(miliseconds) + 1).toString();
    let sec = seconds;
    let min = minutes;
  
    if (Number(miliseconds) === 99) {
      sec = (Number(seconds) + 1).toString();
      mil = '00';
    }
  
    if (Number(seconds) === 60) {
      min = (Number(minutes) + 1).toString();
      sec = '00';
    }
  
    this.setState({
      seconds: sec.length === 1 ? '0' + sec : sec,
      miliseconds: mil.length === 1 ? '0' + mil : mil,
      minutes: min.length === 1 ? '0' + min : min,    
    });
  }, 10);
  this.setState({ 
    timer: timer, 
    startDisabled: true,
    stopDisabled: false,
  });
}

stop = () => {
  clearInterval(this.state.timer);
  this.setState({
    startDisabled: false,
    stopDisabled: true,
  })
}

reset = () => {
  const { stopDisabled } = this.state;
  clearInterval(this.state.timer);
  if (stopDisabled) {
    this.setState({
      seconds: '00',
      miliseconds: '00',
      minutes: '00',
    })
  }
  this.setState({
    startDisabled: false,
    stopDisabled: true,
  })
}

  render() {
    const { seconds, miliseconds, minutes, startDisabled } = this.state;
    return (
      <div className="timer-container">
        <div className="timer-wrapper">
          <p className="timer-clock">{`${minutes}:${seconds}.`}<span className="timer-msec">{`${miliseconds}`}</span></p>
          </div>
        <Control
          reset={this.reset}
          start={this.start}
          startDisabled={startDisabled}
          stop={this.stop}
          />
      </div>
    )
  }
}

export default Timer;