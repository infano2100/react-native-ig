import React, { PureComponent } from 'react'
import { 
  View,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  AppState,
  Alert,
  Linking,
} from 'react-native'
import Permissions from 'react-native-permissions'
import { PERMISSIONS, RESULTS } from 'react-native-permissions'
import { RNCamera } from 'react-native-camera'
import { Actions } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons'


const permissionCamera = Platform.select({
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS.IOS.CAMERA,
})

export default class Camera extends PureComponent {

  state = {
    cameraPermission: {},
  }

  componentDidMount() {
    this.updatePermissions()
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = appState => {
    if (appState === 'active') {
      this.updatePermissions()
    }
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      console.log(data)
    }
  }

  updatePermissions = () => {
    Permissions.check(permissionCamera)
      .then((response) => {
        this.setState({
          cameraPermission: response
        })
      })
  }
  
  checkCamera = async () => {
    const { cameraPermission } = this.state
    let checkPermissionCamera = true
    if (Platform.OS === 'ios' && cameraPermission === RESULTS.DENIED || cameraPermission === RESULTS.BLOCKED) {
      return this.alertMessage()
    }
  
    await Permissions.request(permissionCamera)
        .then(res => {
          if (res !== RESULTS.GRANTED) {
            this.setState({
              cameraPermission: res
            })
            checkPermissionCamera = false
          }
        })
      .catch(e => console.warn(e))
  
      if (checkPermissionCamera) {
        this.takePicture()
      }
  }
  
  openSettings = () => {
    const schemeAppSetting = Platform.select({
      ios: 'app-settings:',
      android: 'android-app://com.android.settings',
    })
    return Linking.openURL(schemeAppSetting)
  }
  
  alertMessage = () => {
    const textTitle = 'Would like to Access Your Camera'
    const textDetail = 'Enable camera access so you can post pics directly from your camera'
    const buttons = [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Settings', onPress: this.openSettings },
    ]
    Alert.alert(
      textTitle, 
      textDetail,
      buttons,
    )
  }

  renderTakePicture = () => {
    const generateSquareSize = size => ({
      width: size,
      height: size,
    })
    const squareSize = generateSquareSize(60)
    const innerButtonSize = generateSquareSize(60 - 10)
    const buttonBody = (
      <View style={[styles.takePhotoButtonContainer,squareSize]}>
        <View style={[styles.takePhotoButtonInsideSection,innerButtonSize]} />
      </View>
    )
    return (
      <TouchableHighlight
        hitSlop={{
          top: 16,
          bottom: 16,
          left: 16,
          right: 16,
        }}
        onPress={this.checkCamera}
        useForeground
        activeOpacity={0.84}
      >
        {buttonBody}
      </TouchableHighlight>
    )
  }
 
  rendlerCloseHeader = () => (
    <View style={styles.closeHeaderContainer}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={Actions.home}>
          <Ionicons name="md-close" size={25} color="#fff"/>
        </TouchableOpacity>
      </View>
    </View>
  )

  render() {
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', bottom: 'always' }}
      >
        <View style={styles.cameraHeaderLayout}>
            <View style={styles.cameraHeaderMenu}>
              {this.rendlerCloseHeader()}
            <View style={styles.cameraHeaderRightMenu} />
          </View>
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes)
          }}
        />
        <View style={styles.viewTakePhoto}>
          {this.renderTakePicture()}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  takePhotoButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePhotoButtonInsideSection: {
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 2,
  },
  viewTakePhoto: { 
    flex: 0, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 20,
  },
  closeHeaderContainer: {
    height: 69,
    marginTop: Platform.OS === 'ios' ? 10 : -20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Platform.OS === 'ios' ? 15 : 5,
  },
  closeButtonContainer: {
    alignSelf: 'flex-end',
  },
  cameraHeaderLayout: {
    flexDirection: 'row',
  },
  cameraHeaderMenu: {
    paddingHorizontal: 8,
    paddingTop: 2,
    alignItems: 'flex-start',
    backgroundColor: '#000',
  },
  cameraHeaderRightMenu: {
    alignItems: 'flex-end',
    backgroundColor: '#000',
  },
})