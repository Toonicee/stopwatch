import React from 'react';
import { Button } from "antd";

import 'antd/dist/antd.css';
import './Control.css';

const Control = (props) => {
  const { start, startDisabled, reset, stop } = props;
  
  const btnStop = (
    <Button 
      type="danger" 
      onClick={stop} 
      disabled={!startDisabled}>
        Stop
    </Button>
  )
<<<<<<< HEAD:stopwatch/src/components/Control/Control.jsx
  const btnStart = (   
=======
  const btnStart = (
>>>>>>> 544484ceadcbdbee769e01dcade538db71eebf93:stopwatch/src/components/Control/Control.jsx
    <Button 
      type="primary"
      onClick={start}
      disabled={props.disabled}>
        Start
    </Button>
  )

  return (
    <div className="wrapper-control">
      {startDisabled ? btnStop : btnStart}
      <Button className={'btn-reset'}
        onClick={reset}>
        Reset
      </Button>
    </div>
  )
}

export default Control;
