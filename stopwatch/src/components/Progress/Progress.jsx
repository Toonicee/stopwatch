import React from 'react';
import { Progress, Button } from 'antd';

import './Progress.css';

const ProgressWrapper = (props) => {
  return (
    <div className="progress-wrapper">
      <Progress type="circle" percent={props.percent} />
      <Button disabled={props.disabled} onClick={() => props.resetTimer()} className="btn-progress" >Exit</Button>
        <p className="progress-time">Left {props.min} minuts and {props.sec} seconds </p>
    </div>
  )
}

export default ProgressWrapper;