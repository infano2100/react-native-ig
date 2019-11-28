import React, { Component } from 'react'
import { 
  Text, 
  View, 
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Linking,
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import Permissions from 'react-native-permissions'
import { PERMISSIONS, RESULTS } from 'react-native-permissions'
import FeatherIcons from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { fetchPosts } from '../../actions/PostActions'
import { fetchProfile } from '../../actions/ProfileActions'
import Post from '../post/Post'
import Header from '../components/Header'
import Images from '../../assets/images'

const permissionCamera = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA

class Home extends Component {
  state = {
    posts: [],
    cameraPermission: {},

  }

  componentDidMount() {
    this.props.fetchProfile()
    this.props.fetchPosts()
    this.updatePermissions()
  }


  static getDerivedStateFromProps(nextProps) {
    if (this.props !== nextProps) {
      return {
        posts: nextProps.posts.posts,
      }
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

selectCamera = async () => {
  const { cameraPermission } = this.state
  let checkPermission = true
  if (Platform.OS === 'ios' && cameraPermission === RESULTS.DENIED || cameraPermission === RESULTS.BLOCKED) {
    return this.alertMessage()
  }

  await Permissions.request(permissionCamera)
      .then(res => {
        if (res !== RESULTS.GRANTED) {
          this.setState({
            cameraPermission: res
          })
          checkPermission = false
        }
      })
    .catch(e => console.warn(e))

    if (checkPermission) {
      return Actions.camera()
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
    { text: 'Cancel', style: 'cancel'  },
    { text: 'Settings', onPress: this.openSettings },
  ]
  Alert.alert(
    textTitle, 
    textDetail,
    buttons,
  )
}

  renderPosts() {
    const { posts } = this.state
    if (_.isEmpty(posts)) {
      return (
        <View>
           <Text>You don't have any post here, may you want to add one?</Text>
        </View>
      )
    } else {
      const arrayPosts = Object.values(this.state.posts)
      const keysPosts = Object.keys(this.state.posts)

      return arrayPosts.map((post, i) => {
        return <Post 
          userProfile={this.props.userProfile} 
          {...post} 
          key={keysPosts[i]} 
          postKey={keysPosts[i]}
        />
      })
    }
  }

  renderIconLeft = () => {
    return (
      <TouchableOpacity onPress={this.selectCamera} style={styles.margin15}>
        <View>
          <SimpleLineIcons name="camera" size={20}/>
        </View>
      </TouchableOpacity>
    )
  }

  renderIconRigth = () => {
    return (
      <TouchableOpacity onPress={Actions.direcd} style={styles.margin15}>
        <View>
          <FeatherIcons name="send" size={20}/>
        </View>
      </TouchableOpacity>
    )
  }

  renderTitle = () => {
    return (
      <View style={styles.margin7}>
        <Image source={Images.TEXT_IG} style={styles.imgTitle} resizeMode="contain" />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header 
          titleCustom={this.renderTitle()}
          iconLeft={this.renderIconLeft()}
          iconRigth={this.renderIconRigth()}
        />
        <ScrollView contentContainerStyle={styles.ScrollContainer}>
          {this.renderPosts()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.post,
  userProfile: state.profile.profile,
})

export default connect(
  mapStateToProps,
  { 
    fetchPosts,
    fetchProfile,
  }
)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  margin7: {
    margin: 7,
  },
  margin15: {
    margin: 15,
  },
  imgTitle: {
    width: 90,
    height: 40,
  },
})
