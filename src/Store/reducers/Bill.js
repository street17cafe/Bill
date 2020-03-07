import { initialState } from './index'

const BillsReducer = (state = initialState.Bills, action) => {
  switch(action.type){
    case "BILLS::REQUEST":
      return {
        ...state,
        isFetching: true,
        error: false,
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
    
    case "BILLS::REQUEST_FIND_BILL":
      return {
        ...state,
        isFetchingSpecific: true,
        error: false,
      }
    case "BILLS::SUCCESS_FIND_BILL":
      return {
        ...state,
        isFetchingSpecific: false,
        error: false,
        billItems: action.data.items
      }
    case "BILLS::FAIL_FIND_BILL":
      return {
        ...state,
        isFetchingSpecific: false,
        error: true,
        billItems: []
      }
    case "BILLS::REQUEST_DELETE":
      return {
        ...state,
        deleteRequest: true,
        errorDeleting: false
      }
    case "BILLS::SUCCESS_DELETE":
      return {
        ...state,
        deleteRequest: false,
        successDeleting: true,
        errorDeleting: false,
      }
    case "BILLS::ERROR_DELETE":
      return {
        ...state,
        deleteRequest: false,
        successDeleting: false,
        errorDeleting: true,
      }
    default:
      return state;
  }
}

export default BillsReducer