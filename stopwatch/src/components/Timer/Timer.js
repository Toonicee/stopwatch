import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      minutes: '00',
      seconds: '00',
      miliseconds: '00',
      startDisabled: false,
      stopDisabled: false
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
      <div>
        <h1>{`прошло ${minutes} минут ${seconds} секунд ${miliseconds} милисекунд`}</h1>
        <button onClick={this.start} disabled={startDisabled}>start/pause</button>
        <button onClick={this.reset}>reset</button>
      </div>
    )
  }
}

export default Timer;