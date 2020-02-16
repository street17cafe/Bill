const PAGE="SETTINGS::"

export const flipBillAutoRefresh = () => ({
  type: PAGE+"FLIP_BILLS_REFRESH"
})

export function flipRenderImages(){
  return ({type: PAGE+"FLIP_RENDER_IMAGES"})
  
}