import React, { Component } from 'react'
import './App.css'
import TimerMachine from "react-timer-machine"

import moment from "moment"
import momentDurationFormatSetup from "moment-duration-format"
import sizeMe from 'react-sizeme'
import Confetti from 'react-confetti'
import PropTypes from 'prop-types'

momentDurationFormatSetup(moment)

const App = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(class ConfettiComponent extends Component {
  static propTypes = {
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }

  constructor(props) {
    super(props)

    this.state = {
      timerUp: false
    }
  }

  timerUpCallback = () => {
    this.setState({
      timerUp: true
    })
  }

  render() {
    var children = []
    if (this.state.timerUp) {
      children = [
        <Confetti {...this.props.size} key='2'/>,
        <section className="timerMachine" key='3'>
          <h1>
            Just a note to say..<br />
            As you move into a new venture...<br />
            May luck and success always be with you!<br />
          </h1>
          <h6>For more heartfelt farewell messages like this, <a href="https://www.dgreetings.com/atwork_cards/farewell/messages.html" target="_">Click here</a></h6>
        </section>
      ]
    } else {
      children = [
        <TimerComponent key='1' timerUpCallback={this.timerUpCallback}/>
      ]
    }

    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {children.map(component => component)}
      </div>
    )
  }
})

class TimerComponent extends Component {

  constructor(props) {
    super(props)
    
    var doomsDay = moment('2019-02-27')
    doomsDay.set({
      h: 17,
    })

    var diff = moment.duration(doomsDay.diff(moment())).asMilliseconds()
    console.log(diff)

    this.state = {
      paused: false,
      started: false,
      countdown: true,
      diff: diff < 0? 0 : diff
    }
  }

  componentDidMount = () => {
    if (this.state.diff <= 0) {
      this.props.timerUpCallback()
    }

    this.setState({
      started: this.state.diff > 0,
      paused: this.state.diff < 0,
      countdown: true,
      diff: this.state.diff < 0? 0 : this.state.diff
    })
  }

  render() {
    
    const { started, paused, countdown, diff } = this.state

    return (
      <section className="timerMachine">
        
        <h1>Time till Ashzabin <a target="_" href="https://en.wikipedia.org/wiki/Apu_Nahasapeemapetilon">Apu</a> leaves</h1>
        
        <span className="timer">
          <TimerMachine
            timeStart={diff}
            started={started}
            paused={paused}
            countdown={countdown}
            interval={1000}
            formatTimer={(time, ms) =>
              moment.duration(ms, "milliseconds").format("h:mm:ss")
            }
            onComplete={time =>{
                if (this.state.diff > 0) {
                  this.setState({...this.state, diff: 0, started: false})
                }
                this.props.timerUpCallback()
                console.info(`Timer completed: ${JSON.stringify(time)}`)
              }
            }
          />
        </span>
      </section>
    )
  }
}

export default App