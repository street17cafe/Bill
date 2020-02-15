import { initialState } from './index'

const DishReducer = (state = initialState.Dish, action) => {
    switch(action.type){
      case "DISH::REQUEST":
        return {
          ...state,
          isFetching: true,
          error: false
        }
      case "DISH::SUCCESS":
        return {
          ...state,
          isFetching: false,
          error: false,
          data: action.data
        }
      case "DISH::FAIL":
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state;
    }
}

export default DishReducer;