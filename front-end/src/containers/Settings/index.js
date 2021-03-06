import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import routes from './routes'
import SettingsMenu from './components/SettingsMenu'
import './styles.css'

import { hideSidebar } from '../../redux/actions/sideBar'
import { showModal, ModalType } from '../../redux/actions/modal';

class Settings extends Component {

  componentDidMount () {
    this.props.dispatch(hideSidebar())
  }

  onContactUs = (e) => {
    e.preventDefault()

    this.props.dispatch(showModal(ModalType.contactUsModal))
  }

  render () {
    const { location, history, user } = this.props

    return (
      user.loggedIn ?
      <div className='div-settings-container'>
        {/* Main Area */}
        <div className='div-settings-body container'>
          {/* Menu */}
          <div className='div-settings-menu'>
            <SettingsMenu
              location={ location }
              history={ history }
            />
          </div>
  
          {/* Page Area */}
          <div className='div-settings-page'>
            { routes }
          </div>
        </div>
      </div>
      :
      <Redirect to='/auth/login'/>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Settings)
