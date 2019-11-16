import { initialState } from './index'

const CartReducer = (state = initialState.Cart, action) => {
    switch(action.type){
      case "CART::ADD":
        return {
          ...state,
          items: [
            ...state.items,
            action.data
          ]
        }

      case "CART::REMOVE":
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.id)
        }
      
      case "CART::EMPTY":
        return {
          ...state,
          items: []
        }

      default:
        return state
    }
}

export default CartReducer