import React from 'react';
import Control from '../Control';
import './Timer.css';

const initialState = {
  minutes: 0,
  seconds: 0,
  miliseconds: 0,
};

let timerId = null;
class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      stopwatch: {
        ...initialState,
      },
      control: {
        startDisabled: false,
      },
    };
  }

  start = () => {
    this.updateTime();
  };

  updateTime = () => {
    timerId = setTimeout(() => {
      const {
        stopwatch: { miliseconds, seconds, minutes },
      } = this.state;
      let mil = Math.floor(miliseconds + 6.4);
      let sec = seconds;
      let min = minutes;

      if (miliseconds >= 90) {
        sec = seconds + 1;
        mil = 0;
      }

      if (seconds === 60) {
        min = minutes + 1;
        sec = 0;
      }
      this.setState({
        stopwatch: {
          seconds: sec,
          miliseconds: mil,
          minutes: min,
        },
      });
      this.updateTime();
    }, 55);
    this.setState({
      control: {
        startDisabled: true,
      },
    });
  };

  stop = () => {
    clearTimeout(timerId);
    this.setState({
      control: {
        startDisabled: false,
      },
    });
  };

  reset = () => {
    const {
      control: { startDisabled },
    } = this.state;
    clearTimeout(timerId);
    if (!startDisabled) {
      this.setState({
        stopwatch: {
          ...initialState,
        },
      });
    }
    this.setState({
      control: {
        startDisabled: false,
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
            {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}.`}
            <span className="timer-msec">{`${
              miliseconds < 10 ? `0${miliseconds}` : miliseconds
            }`}</span>
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
