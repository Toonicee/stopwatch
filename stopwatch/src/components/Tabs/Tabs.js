import React from 'react';

class Tabs extends React.Component {

  render() {
    const { selectWidget, name } = this.props;
    return (
      <div>
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a onClick={({target}) => selectWidget(target)} name="time" className={`nav-link ${name === 'time' ? 'active' : '' }`} href="#">Time</a>
          </li>
          <li className="nav-item">
            <a onClick={({target}) => selectWidget(target)} name="countdown" className={`nav-link ${name === 'countdown' ? 'active' : '' }`} href="#">Countdown</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Tabs;