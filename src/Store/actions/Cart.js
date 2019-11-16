const PAGE = "CART::"

export const addItem = data => ({
  type: PAGE+"ADD",
  data
})

export const removeItem = id => ({
  type: PAGE+"REMOVE",
  id
})

export const emptyCart = () => ({
  type: PAGE+"EMPTY"
})