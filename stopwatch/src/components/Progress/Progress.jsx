import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

import './Progress.css';

const ProgressWrapper = ({ percent, sec, min }) => {
  return (
    <div className="progress-wrapper">
      <Progress type="circle" percent={percent} />
      <p className="progress-time">
        Left {min} minutes and {sec} seconds
      </p>
    </div>
  );
};

ProgressWrapper.defaultProps = {
  percent: 0,
  sec: 0,
  min: 0,
};

ProgressWrapper.propTypes = {
  percent: PropTypes.number,
  min: PropTypes.number,
  sec: PropTypes.number,
};

export default ProgressWrapper;
