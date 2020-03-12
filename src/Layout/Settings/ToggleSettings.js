import React from 'react'
import { connect }from 'react-redux'
import CustomList from 'Enhancements/CustomList'
import Menu from '@material-ui/icons/RestaurantMenu'
import Tooltip from '@material-ui/core/Tooltip'
import Switch from '@material-ui/core/Switch'
import AttachMoney from '@material-ui/icons/AttachMoney'
import ThemeSwitch from '@material-ui/icons/BrightnessMedium'
import Payment from '@material-ui/icons/Payment'
import SettingsConstants, {} from 'Store/actions/Settings'
import Image from '@material-ui/icons/Image'

function ToggleSettings(props) {
  //console.log(props.settings)
  let items = [
    {
      id: 1,
      primaryText: 'Auto Refresh Menu',
    autoRefreshMenu: false,
      secondaryIcon: <Tooltip title={'Disable for slow network'}><Switch checked={props.settings.autoRefreshMenu} onClick={() => props.toggle(SettingsConstants.AUTO_REFRESH_MENU)}/></Tooltip>,
      icon: <Menu />
    },
    {
      id: 2,
      primaryText: "Auto refresh Payment",
      secondaryIcon: <Switch checked={props.settings.autoRefreshPayment} onClick={() => props.toggle(SettingsConstants.SWITCH_REFRESH_PAYMENTS)}/>,
      icon: <AttachMoney />
    },
    {
      id: 3,
      primaryText: "Auto refresh Bills",
      secondaryIcon: <Switch checked={props.settings.autoRefreshBills} onClick={() => props.toggle(SettingsConstants.AUTO_REFRESH_BILLS)}/>,
      icon: <Payment />
    },
    {
      id: 4,
      primaryText: "Switch Theme",
      icon: <ThemeSwitch />,
      secondaryIcon: <Switch checked={props.settings.dark} onClick={() => props.toggle(SettingsConstants.SWITCH_THEME)}/>
    },
    {
      id: 5,
      primaryText: "Show images in menu",
      icon: <Image />,
      secondaryIcon: <Switch checked={props.settings.renderImages} onClick={() => props.toggle(SettingsConstants.SWITCH_RENDER_IMAGES)}/>
    }
  ]
  return <CustomList heading={'Toggle settings'} items={items} />
}

const mapStateToProps = state => ({
  settings: state.Settings
})

const mapDispatchToProps = dispatch => ({
  toggle: type => dispatch({type})
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleSettings);