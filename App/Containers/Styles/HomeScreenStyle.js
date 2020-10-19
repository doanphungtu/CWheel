import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import { Header } from 'react-navigation-stack';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  content: {
    flex: 1,
    paddingTop: 50
  },
  touchSetting: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 56 / 2,
    backgroundColor: Colors.main,
    position: 'absolute',
    bottom: 28,
    left: 28
  },
  viewTouchNext: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  viewItem: {
    backgroundColor: Colors.main,
    borderRadius: 10,
    height: 250,
    alignItems: 'center'
  },
  titleItem: {
    fontSize: 20,
    color: 'white',
    fontFamily: Fonts.type.title_carousel
  },
  touchNext: {
    height: 50,
    width: 160,
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewBottom: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50
  },
  luck: {
    color: Colors.main,
    fontSize: 17,
    marginBottom: 30,
    fontFamily: Fonts.type.title_carousel
  },
  imgBottom: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleCarousel: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: .5,
    width: '90%'
  },
  contentCarousel: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  imgItems: {
    width: '100%',
    height: '79%',
    justifyContent: 'center',
    alignContent: 'flex-start',
    position: 'relative',
    paddingRight: 55
  },
  viewBtnRightCarousel: {
    // width: 50,
    marginRight: 15,
    height: '79%',
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnCarousel: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  //Modal
  modalContainer: {
    width: '80%',
    height: 200,
    borderRadius: 8,
    backgroundColor: 'white',
    position: 'absolute',
    top: height / 2 - 125,
    left: width / 2 - 0.4 * width,
    margin: 0
  },
  viewTitle: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  txtTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: Fonts.type.title_carousel
  },
  viewContent: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtContent: {
    fontSize: 15,
    width: '90%',
    fontFamily: Fonts.type.title_carousel
  },
  viewBtnNext: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  view_loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  //wheel
  container_Wheel: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  header: {
    width: '100%',
    height: Header.HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main
  },
  txtHeader: {
    fontSize: 20,
    color: 'white',
    fontFamily: Fonts.type.title_navigation
  }
})
