import { render } from "react-dom"
import { connect } from 'react-redux'
import React, { Component, PropTypes } from "react"
import { Link } from 'react-router'
import { resetResults } from '../actions/actions.js'

import Button from '../components/Button'
import Search from '../components/home/Search'
import Loading from '../components/home/Loading'
import Results from '../components/home/Results'

export default connect(state => ({
  isFetching: state.media.isFetching,
  hasResults: state.media.hasResults,
}))(
  class Home extends Component {
    static propTypes = {
      isFetching: PropTypes.bool,
      hasResults: PropTypes.bool,
    }

    render() {
      const { dispatch, isFetching, hasResults } = this.props

      return (
        <div className='Home'>
          <div className="Home-header">
            <span className="Home-emoji">💁</span>
            <h1 className="Home-title" onClick={ () => dispatch(resetResults()) }>R U VAIN?</h1>
            <p>Thought you could get away with liking your own Instagram photos?</p>
          </div>
          
          <div className="Home-main">
            { !isFetching && !hasResults && <Search/> }

            { isFetching && <Loading/> }
            
            { hasResults && <Results/> }
          </div>

          <div className="Home-footer">
            <span>By <a href="http://juliamitchelmore.com" target="_blank">J</a> 💋</span>
          </div>
        </div>
      )
    }
  }
)
