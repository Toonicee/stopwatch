import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber, Row, Col } from 'antd';

const IntegerStep = ({ value, change, max, progress }) => {
  return (
    <Row>
      <Col span={16}>
        <Slider
          min={0}
          max={max}
          disabled={progress}
          value={typeof value === 'number' ? value : 0}
          onChange={sec => change(sec)}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={max}
          disabled={progress}
          style={{ marginLeft: 16 }}
          value={typeof value === 'number' ? value : 0}
          onChange={min => change(min)}
        />
      </Col>
    </Row>
  );
};

IntegerStep.defaultProps = {
  value: 0,
  max: 720,
  change: () => {},
  progress: false,
};

IntegerStep.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  change: PropTypes.func,
  progress: PropTypes.bool,
};

export default IntegerStep;

// можно ставить больше 720 минут
// секунды становятся равны 60, после того как прошла минута +++++++
// объединить startDisabled и stopDisabled
// использовать рекурсивный setTimeout ++++++++
// обновлять реже, чем каждую миллисекунду
// хранить в стейте number
// не хранить id таймера в стейте ++++++
// вынести начальное состояние в переменную
// объединить кнопку в один компонент
// изменить это поведение в компоненте Countdown
// this.setState({ disabled: true });
// setTimeout(() => this.setState({ disabled: false }), 3500);
