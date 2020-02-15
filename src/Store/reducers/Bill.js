import { initialState } from './index'

const BillsReducer = (state = initialState.Bills, action) => {
  switch(action.type){
    case "BILLS::REQUEST":
      return {
        ...state,
        isFetching: true,
        error: false
      }

    case "BILLS::SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data
      }
    
    case "BILLS::FAIL":
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state;
  }
}

export default BillsReducer