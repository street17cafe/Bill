import API from '../../Services/API'
import ErrorHandler from '../../Services/ErrorHandler'
import { snackbarError, snackbarInfo } from './snackbar'

const PAGE="BILLS::"

export function fetchBills(dispatch){
  dispatch(initRequest())
  API('/api/bill/today', '', '', 'GET')
    .then(res => {
      if(!res.data.success){
        throw new Error("Error fetching results")
      }
      dispatch(requestSuccess(res.data.data))
    })
    .catch(err => {
      dispatch(snackbarError(ErrorHandler(err)))
      dispatch(requestFail())
    })
}

const initRequest = () => ({
  type: PAGE+"REQUEST"
})

const requestSuccess = data => ({
  type: PAGE+"SUCCESS",
  data
})

const requestFail = () => ({
  type: PAGE+"FAIL",
})

export function fetchSpecific(dispatch, id){
  dispatch(initRequestSpecific())
  API('/api/bill/'+id, '', '', 'GET')
    .then(res => {
      if(!res.data.success){
        throw new Error("Error fetching results")
      }
      dispatch(specificBillFetched(res.data.data))
    })
    .catch(err => {
      dispatch(snackbarError(ErrorHandler(err)))
      dispatch(requestFailSpecific())
    })
}

const specificBillFetched = data => ({
  type: "BILLS::REQUEST_FOUND_BILL",
  data
})

const initRequestSpecific = () => ({
  type: "BILLS::SUCCESS_FOUND_BILL"
})

const requestFailSpecific = () => ({
  type: "BILLS::FAIL_FOUND_BILL"
})


export function deleteBill(dispatch, id, callback){
  dispatch(initBillDelete())
  API('/api/bill/'+id, '', '', 'DELETE')
    .then(res => {
      if(!res.data.success){
        throw new Error(res.data.errors.message)
      }
      dispatch(snackbarInfo("Dish pushed in cart"))
      dispatch(successBillDelete())
      callback()
      //push to cart url 
      
    })
    .catch(err => {
      dispatch(snackbarError(ErrorHandler(err)))
      dispatch(errorBillDelete())
    })
}

const initBillDelete = () => ({
  type: PAGE+"REQUEST_DELETE"
})

const successBillDelete = () => ({
  type: PAGE+"SUCCESS_DELETE"
})

const errorBillDelete = () => ({
  type: PAGE+"ERROR_DELETE"
})