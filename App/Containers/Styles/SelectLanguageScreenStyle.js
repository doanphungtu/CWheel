import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  view_loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touch: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
    flexDirection: 'row',
    backgroundColor:'white'
  },
  viewLeft: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  viewRight: {
    width: '80%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: '5%'
  },
  txtItem: {
    fontSize: 17,
    color: 'grey',
    fontFamily: Fonts.type.setting,
  }
})
