import React from 'react';
import { message } from 'antd';

import Control from '../Control';
import ProgressWrapper from '../Progress';
import IntegerStep from '../IntegerStep';

import './Countdown.css';

const initialState = {
  sec: 0,
  min: 0,
  oldMin: 0,
  oldSec: 0,
  allTimeInSecind: 0,
  percent: 0,
  progress: false,
};

let timerId = null;
class Countdown extends React.Component {
  constructor() {
    super();
    this.state = {
      ...initialState,
      startDisabled: false,
      disabled: false,
    };
  }

  changeMin = value => {
    this.setState({
      min: Number(value),
      oldMin: Number(value),
    });
  };

  changeSec = value => {
    this.setState({
      sec: Number(value),
      oldSec: Number(value),
    });
  };

  startTimer = () => {
    const { oldMin, oldSec } = this.state;
    if (oldMin === 0 && oldSec === 0) {
      const warning = () => {
        message.warning('Enter time timer!');
      };
      return warning();
    }
    this.setState({
      progress: true,
      allTimeInSecind: oldSec + oldMin * 60,
      startDisabled: true,
    });
    return this.timeRanges();
  };

  timeRanges = () => {
    timerId = setTimeout(() => {
      const { sec, min, allTimeInSecind } = this.state;
      console.log(sec, min);
      let second = sec - 1;
      let minuts = min;
      const num = allTimeInSecind - (second + minuts * 60);
      this.setState({
        percent: Math.floor((num / allTimeInSecind) * 100),
      });

      if (second === '' || (second === 0 && minuts !== 0)) {
        minuts -= 1;
        second = 59;
      }

      this.setState({
        sec: second,
        min: minuts,
      });
      this.timeRanges();
    }, 1000);
    const { sec, min } = this.state;
    if (sec === 0 && min === 0) {
      document.getElementById('end').play();
      clearTimeout(timerId);
      this.setState({
        startDisabled: false,
        disabled: true,
      });
    }
  };

  stopTimer = () => {
    clearTimeout(timerId);
    this.setState({
      startDisabled: false,
    });
  };

  resetTimer = () => {
    const { startDisabled } = this.state;
    clearTimeout(timerId);
    if (!startDisabled) {
      this.setState({
        ...initialState,
      });
    }
    this.setState({
      startDisabled: false,
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
          <IntegerStep
            value={sec}
            change={this.changeSec}
            max={min === 720 ? 0 : 60}
            progress={progress}
          />
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
