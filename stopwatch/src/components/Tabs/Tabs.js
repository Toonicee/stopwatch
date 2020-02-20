import React from 'react';
import { Tabs } from 'antd';

import Timer from '../Timer'
import Countdown from '../Countdown'

import 'antd/dist/antd.css';

class Tab extends React.Component {

  render() {
    const { TabPane } = Tabs;
    function callback(key) {
      console.log(key);
    }
    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Timer" key="1">
          <Timer />
        </TabPane>
        <TabPane tab="Countdown" key="2">
          <Countdown />
        </TabPane>
      </Tabs>
    )
  }
}

export default Tab;