import { render } from "react-dom"
import { connect } from 'react-redux'
import React, { Component, PropTypes } from "react"
import { resetResults } from '../../actions/actions.js'

import Button from '../Button'

export default connect(state => ({
  ownLikes: state.media.ownLikes,
  totalItems: state.media.totalItems,
  username: state.media.username,
  profilePicture: state.media.profilePicture
}))(
  class Results extends Component {
    static propTypes = {
      ownLikes: PropTypes.number,
      totalItems: PropTypes.number
    }

    render() {
      const { dispatch, ownLikes, totalItems, username, profilePicture } = this.props

      return (
        <div className='Results'>
          <h2><a href={ `http://www.instagram.com/${username}` } target="_blank"><img className="Results-picture" src={profilePicture}/> @{ username }</a></h2>
          <p>has liked { ownLikes } of { totalItems } own photos</p>

          { ownLikes / totalItems < 0.2 && <h3>NOT THAT VAIN 😌</h3> }
          { ownLikes / totalItems >= 0.2 && ownLikes / totalItems < 0.4 && <h3>KINDA VAIN 🙄</h3> }
          { ownLikes / totalItems >= 0.4 && ownLikes / totalItems < 0.75 && <h3>DEFINITION OF VAIN 💅</h3> }
          { ownLikes / totalItems >= 0.75 && <h3>VAINITY INSANITY 👑</h3> }
          
          <Button clickHandler={ () => dispatch(resetResults()) }>RESET.</Button>
        </div>
      )
    }
  }
)
