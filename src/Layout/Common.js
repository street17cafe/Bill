import API from '../Services/API'

export const groupDishes = (data) => {
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

  return processed
}

export const fetchAllDishes = (callback) => {
  API('/api/dish', '', '', 'GET')
    .then(res => callback(false, res))
    .catch(err => callback(true, err))
}