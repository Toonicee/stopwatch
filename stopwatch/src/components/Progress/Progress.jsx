import React from 'react';
import PropTypes from 'prop-types';
import { Progress, Button } from 'antd';

import './Progress.css';

const ProgressWrapper = ({ percent, sec, min, disabled, resetTimer }) => {
  return (
    <div className="progress-wrapper">
      <Progress type="circle" percent={percent} />
      <Button disabled={disabled} onClick={() => resetTimer()} className="btn-progress">
        Exit
      </Button>
      <p className="progress-time">
        Left {min} minuts and {sec} seconds{' '}
      </p>
    </div>
  );
};

ProgressWrapper.defaultProps = {
  percent: 0,
  sec: 0,
  min: 0,
  disabled: null,
  resetTimer: () => {},
};

var r = 10;


ProgressWrapper.propTypes = {
  percent: PropTypes.number,
  min: PropTypes.number,
  resetTimer: PropTypes.func,
  sec: PropTypes.number,
  disabled: PropTypes.bool,
};

export default ProgressWrapper;
