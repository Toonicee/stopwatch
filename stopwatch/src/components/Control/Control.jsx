import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import 'antd/dist/antd.css';
import './Control.css';

const Control = props => {
  const { start, startDisabled, reset, stop, disabled } = props;
  const func = !startDisabled ? start : stop;
  return (
    <div className="wrapper-control">
      <Button
        type={startDisabled ? 'danger' : 'primary'}
        onClick={() => func()}
        disabled={disabled}
      >
        {startDisabled ? 'Stop' : 'Start'}
      </Button>
      <Button className="btn-reset" onClick={reset}>
        Reset
      </Button>
    </div>
  );
};

Control.defaultProps = {
  start: () => {},
  startDisabled: false,
  reset: () => {},
  stop: () => {},
  disabled: false,
};

Control.propTypes = {
  start: PropTypes.func,
  startDisabled: PropTypes.bool,
  reset: PropTypes.func,
  stop: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Control;
