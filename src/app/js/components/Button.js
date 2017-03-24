import { render } from "react-dom"
import React, { Component, PropTypes } from "react"

class Home extends Component {
  static propTypes = {
    type: PropTypes.string,
    clickHandler: PropTypes.func
  }

  render() {
    const { type, clickHandler } = this.props

    return (
      <button onClick={ clickHandler } className={ `Button btn btn-${type}` }>
        { this.props.children }
      </button>
  )}
}

export default Home