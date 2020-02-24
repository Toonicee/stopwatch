import React from 'react';
import { message } from 'antd';

import Control from '../Control';
import ProgressWrapper from '../Progress';
import IntegerStep from '../IntegerStep';

import './Countdown.css';

class Countdown extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      sec: 0,
      min: 0,
      oldMin: 0,
      oldSec: 0,
      progress: false,
      startDisabled: false,
      stopDisabled: false,
      allTimeInSecind: 0,
      percent: 0,
      disabled: false,
    };
  }

  changeMin = value => {
    this.setState({
      min: value,
      oldMin: value,
    });
  };

  changeSec = value => {
    this.setState({
      sec: value,
      oldSec: value,
    });
  };

  startTimer = () => {
    const { oldMin, oldSec } = this.state;
    if (oldMin === 0 && oldSec === 0) {
      const warning = () => {
        message.warning('Enter time timer!');
      };

      this.setState({ disabled: true });
      setTimeout(() => this.setState({ disabled: false }), 3500);

      return warning();
    }
    this.setState({
      progress: true,
      allTimeInSecind: Number(oldSec) + Number(oldMin) * 60,
      startDisabled: true,
      stopDisabled: false,
    });
    const timer = setInterval(() => {
      const { sec, min, allTimeInSecind } = this.state;
      let second = sec === '' ? 0 : sec - 1;
      let minuts = min === '' ? 0 : min;
      const num = allTimeInSecind - (Number(second) + Number(minuts) * 60);
      this.setState({
        percent: Math.floor((num / allTimeInSecind) * 100),
      });

      if (second === 0 && minuts === 0) {
        document.getElementById('end').play();
        clearInterval(timer);
        this.setState({
          startDisabled: false,
          stopDisabled: true,
          disabled: true,
        });
      }

      if (second === '' || (second === 0 && minuts !== 0)) {
        minuts -= 1;
        second = 60;
      }

      this.setState({
        sec: second,
        min: minuts,
        timer,
      });
    }, 1000);
    return timer;
  };

  stopTimer = () => {
    const { timer } = this.state;
    clearInterval(timer);
    this.setState({
      startDisabled: false,
      stopDisabled: true,
    });
  };

  resetTimer = () => {
    const { stopDisabled, timer } = this.state;
    clearInterval(timer);
    if (stopDisabled) {
      this.setState({
        sec: '',
        min: '',
        oldMin: 0,
        oldSec: 0,
        allTimeInSecind: 0,
        percent: 0,
        progress: false,
      });
    }
    this.setState({
      startDisabled: false,
      stopDisabled: true,
      disabled: false,
    });
  };

  render() {
    const { min, sec, progress, percent, startDisabled, disabled } = this.state;
    const inputs = (
      <>
        <div>
          <span>minuts</span>
          <IntegerStep value={min} change={this.changeMin} max={720} progress={progress} />
        </div>
        <div>
          <span>seconds</span>
          <IntegerStep value={sec} change={this.changeSec} max={60} progress={progress} />
        </div>
      </>
    );

    const progressWrapper = (
      <ProgressWrapper
        percent={percent}
        min={min}
        sec={sec}
        disabled={startDisabled}
        resetTimer={this.resetTimer}
      />
    );

    const node = progress ? progressWrapper : inputs;

    return (
      <div className="wrapper-progress">
        <div className="slide">{node}</div>
        <audio id="end">
          <source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" type="audio/mp3" />
          <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
        </audio>
        <div>
          <Control
            reset={this.resetTimer}
            start={this.startTimer}
            stop={this.stopTimer}
            startDisabled={startDisabled}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}

export default Countdown;