import { render } from "react-dom"
import { connect } from 'react-redux'
import React, { Component, PropTypes } from "react"
import { fetchMedia } from '../../actions/actions.js'

import Button from '../Button'

export default connect(state => ({
  error: state.media.error,
}))(
  class Search extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username: '',
        invalid: false
      }
    }

    setUsername = (e) => {
      this.setState({ 
        username: e.target.value.charAt(0) == "@" ? e.target.value.substring(1) : e.target.value
      })
    }

    getMedia = () => {
      const { username } = this.state
      const { dispatch } = this.props
      this.setState({ invalid: false })

      if (username) {
        dispatch(fetchMedia(username))
      } else {
        this.setState({ invalid: true })
      }
    }

    render() {
      const { invalid, username } = this.state
      const { error } = this.props

      return (
        <div className="Search">
          <h2>Not anymore 😈</h2>
          <input className="Search-input" type="text" value={ username ? `@${username}` : '' } placeholder="Feed me an Instagram handle" name="username" onChange={ this.setUsername }/>
          { invalid && <span className="error-text">A valid handle, please.</span> }
          { error && <span className="error-text">No user found. Please try another handle.</span> }
          <Button clickHandler={ () => this.getMedia() }>CHECK IT.</Button>
        </div>
      )
    }
  }
)
