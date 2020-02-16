import { initialState } from './index'

const SettingsReducer = (state = initialState.Settings, action) => {
  switch(action.type){
    case "SETTINGS::FLIP_BILLS_REFRESH":
      return {
        ...state,
        autoRefreshBills: !state.autoRefreshBills
      }
    case "SETTINGS::FLIP_RENDER_IMAGES":
      return {
        ...state,
        renderImages: !state.renderImages
      }
    default:
      return state;
  }
}

export default SettingsReducer;