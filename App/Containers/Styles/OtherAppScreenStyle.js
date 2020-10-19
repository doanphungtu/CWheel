import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: '#efefef'
  },
  touchItems: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    height: 50,
    marginBottom: 1
  },
  viewItems: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtItems: {
    color: Colors.textColor,
    fontSize: 15,
    marginLeft: 15,
    fontWeight: '300'
  }
})
