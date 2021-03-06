import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  MapContainer,
  Login,
  Signup,
  MyProfile,
  LocationScreen,
  MyReservations,
  EditProfile,
  TimeLine
} from './components'
import {me, loadReservation, getAllLocations} from './store'
import VideoComponent from './components/videoComponent'
import BgImage from './components/backgroundImage'

/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()

    this.props.loadLocationData()

    this.props.loadReservation()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}

        <Route exact path="/location" component={LocationScreen} />

        <Route path="/login" component={Login} />
        <Route path="/test" component={BgImage} />
        <Route path="/signup" component={Signup} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {/* <Route path="/home" component={UserHome} /> */}
            <Route exact path="/location" component={LocationScreen} />
            <Route path="/home" component={MapContainer} />
            <Route path="/myreservations" component={MyReservations} />
            <Route path="/profile" component={MyProfile} />
            <Route path="/edit" component={EditProfile} />
            <Route path="/timeline/:reservationId" component={TimeLine} />
            <Route component={MapContainer} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    allLocations: state.location.allLocations
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadReservation() {
      dispatch(loadReservation())
    },
    loadLocationData() {
      dispatch(getAllLocations())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
