import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../../../../components/Button'
import Cart from '../../../../components/Cart'
import SettingsDropdown from './components/SettingsDropdown'

import './styles.css'

import imgLogo from '../../../../assets/images/logo.svg'
import imgFlow from '../../../../assets/images/login_flow.svg'
import imgMinimizedFlow from '../../../../assets/images/login_flow_min.svg'

import { logoutUser } from '../../../../redux/actions/user'

class Header extends Component {

  onClickLogo = () => {
    this.props.history.push('/home')
  }

  onSignUp = () => {
    this.props.history.push('/auth/signup')
  }

  onLogin = () => {
    this.props.history.push('/auth/login')
  }

  onEditProfile = () => {
    this.props.history.push('/settings/edit_profile')
  }

  onOrderHistory = () => {
    this.props.history.push('/settings/order_history')
  }

  onPaymentMethod = () => {
    this.props.history.push('/settings/payment_method')
  }

  onWeeklyMenu = () => {
    this.props.history.push('/menus')
  }

  onMealPreferences = () => {
    this.props.history.push('/settings/meal_preference')
  }

  onRedeem = () => {
    this.props.history.push('/settings/redeem_credit')
  }

  onHelp = () => {
    this.props.history.push('/help-center')
  }

  onPricing = () => {
    this.props.history.push('/how-it-works')
  }

  onGifts = () => {
    this.props.history.push('/gift-cards')
  }

  onLogout = () => {
    this.props.dispatch(logoutUser())
    this.props.history.replace('/home')
  }

  render () {
    let { pathName, user, history, sideBar } = this.props
    
    return (
      <div className={classNames('app-header', {'app-header-squizzed': false})}>
        <div className='container'>

        { 
          !pathName.includes('auth/signup') &&
          <img className='img-logo clickable' src={imgLogo} alt='logo' onClick={this.onClickLogo}/>
        }

        { pathName.includes('auth/signup') && <img className='img-flow' src={imgFlow} alt='flow'/> }
        { pathName.includes('auth/signup') && <img className='img-min-flow' src={imgMinimizedFlow} alt='flow'/> }

        { 
          !pathName.includes('auth/signup') && !pathName.includes('help-center') && !pathName.includes('terms-of-service') &&
          <div className='div-links'>
            <Link to='/menus'><span className={classNames('clickable', {'div-link-selected': pathName.includes('menus')})}>ON THE MENU</span></Link>
            <Link to='/how-it-works'><span className={classNames('clickable', {'div-link-selected': pathName.includes('how-it-works')})}>PRICING</span></Link>
            <Link to='/gift-cards'><span className={classNames('clickable', {'div-link-selected': pathName.includes('gift-cards')})}>GIFTS</span></Link>
          </div>
        }

        { pathName.includes('help-center') && 
          <div className='div-help-center-banner'>
            <div className='div-help-center-title'>Help Center</div>
          </div>
        }

        { pathName.includes('terms-of-service') && 
          <div className='div-help-center-banner'>
            <div className='div-help-center-title'>Legal</div>
          </div>
        }
        
        { !pathName.includes('auth') && !pathName.includes('how-it-works') &&
          <div className='div-buttons'>
            <SettingsDropdown
              onEditProfile={ this.onEditProfile }
              onPaymentMethod={ this.onPaymentMethod }
              onOrderHistory={ this.onOrderHistory }
              onWeeklyMenu={ this.onWeeklyMenu }
              onMealPreferences={ this.onMealPreferences }
              onRedeem={ this.onRedeem }
              onLogout={ this.onLogout }
              onLogIn={ this.onLogin }
              onSignUp={ this.onSignUp }
              onHelp={ this.onHelp }
              onGifts={ this.onGifts }
              onPricing={ this.onPricing }
              loggedIn={ user.loggedIn }
            />
            <div class='desktop-buttons'>
              { !user.loggedIn && <div className='div-login clickable' onClick={this.onLogin}>Log In</div> }
              { !user.loggedIn && <Button onClick={this.onSignUp}>SIGN UP</Button> }
            </div>
            { pathName.includes('menus') && !sideBar.visible &&
              <Cart
                highlighted={ false }
                history={ history }
              />
            }
          </div>
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    sideBar: state.sideBar,
  }
}

export default connect(mapStateToProps)(Header)
