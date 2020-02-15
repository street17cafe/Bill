import API from '../../Services/API'
import { snackbarError } from './snackbar'
import ErrorHandler from '../../Services/ErrorHandler'

const page = "DISH::"

export const fetchDishes = (dispatch, data) => {
  dispatch(initDishFetch())
  API('/api/dish', '', '', 'GET')
    .then(res => {
      //console.log(res)
      dispatch(requestSuccess(res.data))
    })
    .catch(err => {
      console.log(err.response, err)
      dispatch(snackbarError(ErrorHandler(err)))
      dispatch(requestFailure())
    })
}

const groupDishes = (data) => {
  console.log(data)
  if(data === undefined)
    return
  let items = {};
  for(let i = 0; i < data.length; i++){
    if(items[data[i].category_id] === undefined){
      items[data[i].category_id] = []
    }
    items[data[i].category_id].push(data[i])
  }

  let processed = []
  for(let item in items){
    processed.push({
      heading: item,
      items: items[item]
    })
  }

  return processed
}

const initDishFetch = () => ({
  type: page+"REQUEST"
})

const requestSuccess = (res) => ({
  type: page+"SUCCESS",
  data: groupDishes(res.data)
})

const requestFailure = () => ({
  type: page+"FAIL"
})