import React from 'react';
import { Progress } from 'antd';


const ProgressWrapper = ({percent}) => {
  return (
    <div>
      <Progress type="circle" percent={percent} />
    </div>
  )
}

export default ProgressWrapper;