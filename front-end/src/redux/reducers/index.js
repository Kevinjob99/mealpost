import { combineReducers } from 'redux'

import user from './user'
import cart from './cart'
import menuModal from './menuModal'
import comboSliceModal from './comboSliceModal'
import overlaySpinner from './overSpinner'

export default combineReducers({
  user,
  cart,
  menuModal,
  comboSliceModal,
  overlaySpinner,
});
