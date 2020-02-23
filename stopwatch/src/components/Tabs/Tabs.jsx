import React from 'react';
import { Tabs } from 'antd';

import Timer from '../Timer'
import Countdown from '../Countdown'

import 'antd/dist/antd.css';

const Tab = () => {

  const { TabPane } = Tabs;
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Timer" key="1">
          <Timer />
        </TabPane>
        <TabPane tab="Countdown" key="2">
          <Countdown />
        </TabPane>
      </Tabs>
    )
}

export default Tab;