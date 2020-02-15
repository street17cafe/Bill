import API from '../../Services/API'
import ErrorHandler from '../../Services/ErrorHandler'
import { snackbarError } from './snackbar'

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