export function addToCart(items, showSidebar = true){
  return function(dispatch) {
    dispatch({ type: 'ADD_TO_CART', payload: { items: items }})
    showSidebar && dispatch({ type: 'SHOW_SIDEBAR' })
  }
}

export function removeFromCart(item){
  return function(dispatch) {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { item: item }})
  }
}

export function removeAllFromCart(item) {
  return function(dispatch) {
    dispatch({ type: 'REMOVE_ALL_FROM_CART', payload: { item: item }})
  }
}

export function emptyCart() {
  return function(dispatch) {
    dispatch({ type: 'EMPTY_CART' })
  }
}
