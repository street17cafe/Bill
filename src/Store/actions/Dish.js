import API from '../../Services/API'
import { snackbarError } from './snackbar'
import ErrorHandler from '../../Services/ErrorHandler'

const page = "DISH::"

export const fetchDishes = (dispatch, data) => {
  dispatch(initDishFetch())
  API('/api/dish', '', '', 'GET')
    .then(res => {
      //console.log(res)
      if(!res.data.success){
        throw new Error("Unable to fetch dishes")
      }
      let data = groupDishes(res.data.data)
      dispatch(requestSuccess(data))
    })
    .catch(err => {
      console.log(err.response, err)
      dispatch(snackbarError(ErrorHandler(err)))
      dispatch(requestFailure())
    })
}

const groupDishes = (data) => {
  //console.log(data)
  if(data === undefined)
    return
  let items = {};
  for(let i = 0; i < data.length; i++){
    if(items[data[i].category] === undefined){
      items[data[i].category] = []
    }
    items[data[i].category].push(data[i])
  }

  let processed = []
  for(let item in items){
    processed.push({
      heading: item,
      items: items[item]
    })
  }
  //console.log(processed)
  return processed
}

const initDishFetch = () => ({
  type: page+"REQUEST"
})

const requestSuccess = (data) => ({
  type: page+"SUCCESS",
  data: data
})

const requestFailure = () => ({
  type: page+"FAIL"
})

export const emptyMenu = () => ({
  type: page+"EMPTY"
})