import React from 'react'
import { 
  StyleSheet,
  Platform,
  Alert,
  Linking,
} from 'react-native'
import { 
  Router,
  Stack,
  Scene,
  Tabs,
  Actions,
} from 'react-native-router-flux'
import Permissions from 'react-native-permissions'
import { PERMISSIONS, RESULTS } from 'react-native-permissions'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

import EditProfile from '../features/profile/EditProfile'
import CreateHighlight from '../features/highlighteds/CreateHighlight'
import EditHighlight from '../features/highlighteds/EditHighlight'
import Highlight from '../features/highlighteds/Highlight'

import Login from '../features/auth/Login'
import Signup from '../features/auth/Signup'
import AddPost from '../features/post/AddPost'
import ConfigPost from '../features/post/ConfigPost'
import Home from '../features/home/Home'
import Explore from '../features/explore/Explore'
import Profile from '../features/profile/Profile'
import Activity from '../features/activity/Activity'
import Direct from '../features/direct/Direct'
import Camera from '../features/camera/Camera'

const permissionPhoto = Platform.select({
  android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
})

const HomeIcon = ({focused}) =>  <IconMaterial name={focused ? "home" : "home-outline" } size={25} />
const ExploreIcon = ({focused}) => {
  return focused ? <Icon name="search" size={25} /> : <Ionicons name="md-search" size={25} />
}
const AddPostIcon = () => <Icon name="plus-square-o" size={25} />
const ProfileIcon = ({focused}) => <Icon name={focused ? "user" : "user-o" } size={25} />
const ActivityIcon = ({focused}) =>  <Icon name={focused ? "heart" : "heart-o" } size={25} />

let photoPermission
updatePermissions = () => {
  Permissions.check(permissionPhoto)
    .then((response) => {
      photoPermission = response
      this.selectCameraRoll()
    })
}

selectCameraRoll = async () => {
  let checkPermission = true
  if (Platform.OS === 'ios' && photoPermission === RESULTS.DENIED || photoPermission === RESULTS.BLOCKED) {
    return this.alertMessage()
  }

  await Permissions.request(permissionPhoto)
      .then(res => {
        if (res !== RESULTS.GRANTED) {
          photoPermission = res
          checkPermission = false
        }
      })
    .catch(e => console.warn(e))

    if (checkPermission) {
      return Actions.addpost()
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
  const textTitle = 'Would Like to Access the Your Photos'
  const textDetail = 'Enable access to your photos so you can post pics from your gallery'
  const buttons = [
    { text: 'Cancel', style: 'cancel'  },
    { text: 'Settings', onPress: this.openSettings },
  ]
  Alert.alert(
    textTitle, 
    textDetail,
    buttons,
  )
}

const RouterComponent = (props) => (
  <Router>
    <Stack key="root">
      <Stack key="auth" hideNavBar initial={props.checkLogin}>
        <Scene key="login" component={Login} />
        <Scene key="signup" component={Signup} />
      </Stack>
      <Stack key="app" hideNavBar panHandlers={null} initial={props.checkLogin}>
        <Tabs showLabel={false}>
          <Scene key="home" component={Home} icon={HomeIcon} hideNavBar />
          <Scene key="explore" component={Explore} icon={ExploreIcon} hideNavBar />
          <Scene key="addpost" component={AddPost} icon={AddPostIcon} hideNavBar hideTabBar tabBarOnPress={()=> updatePermissions()} />
          <Scene key="activity" component={Activity} icon={ActivityIcon} title="Activity" titleStyle={styles.navigationBarTitleStyle}/>
          <Scene key="profile" component={Profile} icon={ProfileIcon} hideNavBar />
        </Tabs>
        <Scene key="configPost" component={ConfigPost} />
        <Scene key="editProfile" component={EditProfile} />
        <Scene key="createHighlight" component={CreateHighlight} />
        <Scene key="editHighlight" component={EditHighlight} />
        <Scene key="highlight" component={Highlight} />
        <Scene key="direcd" component={Direct} />
        <Scene key="camera" component={Camera} />
      </Stack>
    </Stack>
  </Router>
)

export default RouterComponent

const styles = StyleSheet.create({
  navigationBarTitleStyle: {
      // centering for Android
    flex: 1,
    textAlign: 'center'
  }
})
