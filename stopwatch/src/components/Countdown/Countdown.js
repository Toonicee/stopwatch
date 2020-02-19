import React from 'react';

class Countdown extends React.Component {
  constructor() {
    super()
    this.state = {
      time: '',
    }
  }
  
  onChangeTime = ({ target }) => {
    this.setState({time: target.value});
  }

  click = () => {
    const timeId =  setInterval(() => {
      const newTime = this.state.time - 1;
      if (newTime === 0) {
        clearInterval(timeId)
      }
      this.setState({ time: newTime})
    }, 10)
  }

  render() {
    const { time } = this.state
    console.log(this.state)
    return (
      <>
      <div>
        <input onChange={this.onChangeTime} type="text" value={time} />
      </div>
      <div>
        <span>{time}</span>
        <button onClick={this.click}>start</button>
      </div>
      </>
    )
  }
}

export default Countdown;