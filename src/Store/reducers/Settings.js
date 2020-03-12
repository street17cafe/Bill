import { initialState } from './index'

const SettingsReducer = (state = initialState.Settings, action) => {
  switch(action.type){
    case "SETTINGS::AUTO_REFRESH_PAYMENTS":
      return {
        ...state,
        autoRefreshPayments: !state.autoRefreshPayments
      }
    case "SETTINGS::SWITCH_RENDER_IMAGES":
      return {
        ...state,
        renderImages: !state.renderImages
      }
    case "SETTINGS::TOGGLE_THEME":
      return {
        ...state,
        dark: !state.dark
      }
    case "SETTINGS::AUTO_REFRESH_MENU":
      return {
        ...state,
        autoRefreshMenu: !state.autoRefreshMenu
      }
    case "SETTINGS::AUTO_REFRESH_BILLS":
      return {
        ...state,
        autoRefreshBills: !state.autoRefreshBills
      }
    default:
      return state;
  }
}

export default SettingsReducer;