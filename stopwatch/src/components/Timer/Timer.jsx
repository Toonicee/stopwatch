import React from 'react';
import Control from '../Control';
import './Timer.css';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      stopwatch: {
        timer: null,
        minutes: '00',
        seconds: '00',
        miliseconds: '00',
      },
      control: {
        startDisabled: false,
        stopDisabled: false,
      },
    };
  }

  start = () => {
    this.updateTime();
  };

  updateTime = () => {
    const timer = setInterval(() => {
      const {
        stopwatch: { miliseconds, seconds, minutes },
      } = this.state;
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
        stopwatch: {
          timer,
          seconds: sec.length === 1 ? `0${sec}` : sec,
          miliseconds: mil.length === 1 ? `0${mil}` : mil,
          minutes: min.length === 1 ? `0${min}` : min,
        },
      });
    }, 10);
    this.setState({
      control: {
        startDisabled: true,
        stopDisabled: false,
      },
    });
  };

  stop = () => {
    const {
      stopwatch: { timer },
    } = this.state;
    clearInterval(timer);
    this.setState({
      control: {
        startDisabled: false,
        stopDisabled: true,
      },
    });
  };

  reset = () => {
    const {
      control: { stopDisabled },
      timer,
    } = this.state;
    clearInterval(timer);
    if (stopDisabled) {
      this.setState({
        stopwatch: {
          seconds: '00',
          miliseconds: '00',
          minutes: '00',
        },
      });
    }
    this.setState({
      control: {
        startDisabled: false,
        stopDisabled: true,
      },
    });
  };

  render() {
    const {
      stopwatch: { seconds, miliseconds, minutes },
      control: { startDisabled },
    } = this.state;

    return (
      <div className="timer-container">
        <div className="timer-wrapper">
          <p className="timer-clock">
            {`${minutes}:${seconds}.`}
            <span className="timer-msec">{`${miliseconds}`}</span>
          </p>
        </div>
        <Control
          reset={this.reset}
          start={this.start}
          startDisabled={startDisabled}
          stop={this.stop}
        />
      </div>
    );
  }
}

export default Timer;
