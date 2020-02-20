import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

import Control from '../Control';
import ProgressWrapper from '../Progress';

import './Countdown.css';

class Countdown extends React.Component {
  constructor() {
    super()
    this.state = {
      timer: null,
      sec: '',
      min: '',
      oldMin: 0,
      oldSec: 0,
      progress: false,
      startDisabled: false,
      stopDisabled: false,
      allTimeInSecind: 0,
      percent: 0,
    }
  }
  changeMin = (value) => {
    this.setState({
      min: value,
      oldMin: value,  
    })
  }

  changeSec = (value) => {
    this.setState({
      sec: value,
      oldSec: value,
    })
  }

  startTimer = () => {
    const { oldMin, oldSec } = this.state;
    this.setState({
      progress: true,
      allTimeInSecind: (Number(oldSec) + Number(oldMin) * 60 ),
    })
    let timer = setInterval(() => {
      const { sec, min, allTimeInSecind } = this.state;
      let second = sec === '' ? 0 : sec - 1;
      let minuts = min === '' ? 0 : min;
      let num = allTimeInSecind - (Number(second) + Number(minuts) * 60);
      this.setState({
        percent: Math.floor(num/allTimeInSecind * 100),
        startDisabled: true,
        stopDisabled: false,
      })

      if (second === 0 && minuts === 0) {
        clearInterval(timer);
        this.setState({progress: false})
      }

      if (second === '' || second === 0 && minuts !== 0) {
        minuts -= 1;
        second = 60;
      }

      this.setState({
        sec: second,
        min: minuts,
        timer: timer,
      })
    },1000)
  }

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      startDisabled: false,
      stopDisabled: true,  
    })
  }

  resetTimer = () => {
    const { stopDisabled } = this.state;
    clearInterval(this.state.timer);
    if (stopDisabled) {
      this.setState({
        sec: '',
        min: '',
        oldMin: 0,
        oldSec: 0,
        allTimeInSecind: 0,
        percent: 0,
        progress: false,
      })
    }
    this.setState({
      startDisabled: false,
      stopDisabled: true,
    })
  }


  render() {
    const { min, sec, progress, percent, startDisabled } = this.state;
    
    const inputs = (        <div><div>
      <span>minuts</span>
      <IntegerStep value={min} change={this.changeMin} max={720} progress={progress} />
    </div>
    <div>
      <span>seconds</span>
      <IntegerStep value={sec} change={this.changeSec} max={60} progress={progress} />
    </div></div>)

    const prog = ( <div className="inner-progress">
      <ProgressWrapper percent={percent} /><p className="progress-time">Left {min} minuts and {sec} seconds </p></div>)
    
    const node = progress ? prog : inputs;

    return (
      <div className="wrapper-progress">
        <div className="slide">
          {node}
        </div>
        <div>
          <Control 
            reset={this.resetTimer}
            start={this.startTimer}
            stop={this.stopTimer}
            startDisabled={startDisabled}
          />
        </div>
        </div>
    )
  }
}

export default Countdown;



class IntegerStep extends React.Component {
  render() {
    const { value, change, max, progress } = this.props;
    console.log(this.props)
    return (
      <Row>
        <Col span={12}>
          <Slider
            min={0}
            max={max}
            disabled={progress}
            value={typeof value === 'number' ? value : 0}
            onChange={(value) => change(value)}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={max}
            disabled={progress}
            style={{ marginLeft: 16 }}
            value={typeof value === 'number' ? value : 0}
            onChange={(value) => change(value)}
          />
        </Col>
      </Row>
    );
  }
}