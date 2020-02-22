import React from 'react';
import { Slider, InputNumber, Row, Col, Button } from 'antd';

const IntegerStep = (props) => {
  const { value, change, max, progress } = props;
  return (
    <Row>
      <Col span={16}>
        <Slider
          min={0}
          max={max}
          disabled={progress}
          value={typeof value === 'number' ? value : 0}
          onChange={(value) => change(value)} />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={max}
          disabled={progress}
          style={{ marginLeft: 16 }}
          value={typeof value === 'number' ? value : 0}
          onChange={(value) => change(value)} />
      </Col>
    </Row>
  );
}

export default IntegerStep;