import React, { Component } from 'react'
import { 
  Text, 
  View, 
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import FeatherIcons from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { fetchPosts } from '../../actions/PostActions'
import { fetchProfile } from '../../actions/ProfileActions'
import Post from '../post/Post'
import Header from '../components/Header'
import Images from '../../assets/images'

class Home extends Component {
  state = {
    posts: [],
    cameraPermission: {},
  }

  componentDidMount() {
    this.props.fetchProfile()
    this.props.fetchPosts()
  }

  static getDerivedStateFromProps(nextProps) {
    if (this.props !== nextProps) {
      return {
        posts: nextProps.posts.posts,
      }
    }
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
      <TouchableOpacity onPress={Actions.camera} style={styles.margin15}>
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
