import React, { Component } from 'react'
import { 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import Modal, { ModalContent } from 'react-native-modals'
import firebase from '../../config/firebase'
import { fetchPosts } from '../../actions/PostActions'
import { fetchProfile } from '../../actions/ProfileActions'
import { fetchHighlights } from '../../actions/HighlightActions'
import Button from '../components/Button'
import Header from '../components/Header'
import Post from '../post/Post'
import HighlightIcon from '../highlighteds/HighlightIcon'
import Images from '../../assets/images'

class Profile extends Component {
  state = {
    show: {
      grid: true,
      full: false,
      pinned: false,
      saved: false,
    },
    name_profile: '',
    username: '',
    userpic: '',
    bio: '',
    web: '',
    posts: '',
    followers: '',
    following: '',
    all_posts: '',
    postsKeys: '',
    postsArray: '',
    highlightsArray: '',
    bottomModal: false,
  }

  componentDidMount() {
    this.props.fetchProfile()
    this.props.fetchHighlights()
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps !== prevState && nextProps.profile){
      return {
        name_profile: nextProps.profile.name_profile,
        username: nextProps.profile.username,
        userpic: nextProps.profile.userpic,
        bio: nextProps.profile.bio,
        web: nextProps.profile.web,
        posts: nextProps.profile.posts_number ? nextProps.profile.posts_number : 0,
        followers: nextProps.profile.followers ? nextProps.profile.followers : 0,
        following: nextProps.profile.following ? nextProps.profile.following : 0,
        all_posts: nextProps.posts,
        postsKeys: Object.keys(nextProps.posts),
        postsArray: Object.values(nextProps.posts),
        highlightsArray: nextProps.highlights,
      }
   }
   else return null;
 }

 
  renderImage = () => {
    return <Image style={styles.profileImg} source={ this.state.userpic ? { uri: this.state.userpic } : Images.USER }/>
  }

  showGrid = () => {
    this.setState({
      show: {
        grid: true,
        full: false,
        pinned: false,
        saved: false,
      }
    })
  }

  showFull = () => {
    this.setState({
      show: {
        grid: false,
        full: true,
        pinned: false,
        saved: false,
      }
    })
  }

  renderPosts = () => {
    if (this.state.show.grid && !this.state.show.full && !this.state.show.pinned && !this.state.show.saved) {
      if (this.state.postsArray) {
        const posts = this.state.postsArray
        const keys = this.state.postsKeys

        return posts.map((post, i) => {
          return (
            <TouchableOpacity key={keys[i]}>
              <View>
                <Image source={{ uri: post.image }} style={{ width: 122.5, height: 122.5, margin: 1 }} />
              </View>
            </TouchableOpacity>
          )
        })
      }
    }

    if (!this.state.show.grid && this.state.show.full && !this.state.show.pinned && !this.state.show.saved) {
      if (this.state.postsArray) {
        const posts = this.state.postsArray
        const keys = this.state.postsKeys

        return posts.map((post, i) => {
          return <Post {...post} key={keys[i]} postKey={keys[i]} />
        })
      }
    }
  }

  goToEdit = () => Actions.editProfile(this.props.profile)

  createNewHighlight = () => Actions.createHighlight({ data: this.state.all_posts })

  renderHighlights = () => {
    if (this.state.highlightsArray !== null && this.state.highlightsArray !== undefined) {
      let array = Object.values(this.state.highlightsArray)
      let keys = Object.keys(this.state.highlightsArray)

      return array.map((highlight, i) => {
        return <HighlightIcon key={keys[i]} {...highlight} onPress={() => Actions.highlight({ data: highlight })} />
      })
    } else {
      return <Text>Loading...</Text>
    }
  }

  redderStatusPosts = () => {
    const {posts, followers, following } = this.state
    const dataCount = [
      { name: 'posts',count: posts },
      { name: 'followers',count: followers },
      { name: 'following',count: following },
  ]
    return (
      <View style={styles.viewCountPosts}>
      { dataCount.map((val) => {
        return (
          <View key={val.name} style={styles.viewTextCount}>
            <Text style={styles.textCount}>{val.count}</Text>
            <Text style={styles.textStatusPosts}>{val.name}</Text>
          </View>
        )
      }) }
      </View>
    )
  }

  showModal = () => this.setState({ bottomModal:true })

  logout = () => {
    firebase.auth().signOut().then(response => {
      Actions.auth
      this.setState({ bottomModal :false })
    })
  }

  renderShowModal = () => {
    const listMenu = [
      // {name: 'Setting',},
      // {name: 'Archive'},
      // {name: 'Your Activity'},
      // {name: 'Nametag'},
      // {name: 'Saved'},
      // {name: 'Colse Friends'},
      // {name: 'Discover People'},
      // {name: 'Open Facebook'},
      {name: 'Logout', actions: this.logout},
    ]
    return (
      <Modal.BottomModal
          visible={this.state.bottomModal}
          onTouchOutside={() => this.setState({ bottomModal: false })}
          height={0.8}
          // modalStyle={{  }}
        >
          <ModalContent
            style={{
              backgroundColor: 'fff',
              // height: '40%',
            }}
          > 
          {listMenu.map((val) => {
            return (
              <View key={val.name} style={styles.itemMenu}>
                <TouchableOpacity onPress={val.actions}>
                  <Text> {val.name} </Text>
                </TouchableOpacity>
              </View>
            )
          })}
          
          </ModalContent>
        </Modal.BottomModal>
    )
  }

  render() {
    const { name_profile, bio, web } = this.state
    return (
      <View style={styles.container}>
        <Header 
          title={this.state.username} 
          onNext={this.showModal}
          menu
        />
       { this.renderShowModal() }
        <ScrollView contentContainerStyle={{ justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
          <View style={styles.picAndInfo}>
            {this.renderImage()}
            <View style={styles.viewStatusPosts}>
              {this.redderStatusPosts()}
            </View>
          </View>
          <View style={styles.viewButtomEdit}>
            <Text style={styles.textName}> {name_profile} </Text>
            <Text style={styles.textBio}> {bio} </Text>
            <Text style={styles.textBio}> {web} </Text>
            <Button
              styles={styles.buttonEdit}
              textButton="Edit profile"
              textStyle={{ color: 'black' }}
              onPress={this.goToEdit}
            />
            </View>
          <View style={styles.userBioAndStories}>
            <View style={styles.viewSubBio}>
              <ScrollView contentContainerStyle={{ height: 100 }} horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity style={styles.storie} onPress={this.createNewHighlight}>
                    <View>
                      <Image
                        style={{ width: 80, height: 80 }}
                        source={{
                          uri: 'https://image.ibb.co/kxRZNe/image.png'
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                {this.renderHighlights()}
              </ScrollView>
            </View>
          </View>
          <View style={styles.typeView}>
            <TouchableOpacity onPress={this.showGrid}>
              <View>
                <MaterialCommunityIcons
                  name="grid"
                  size={30}
                  color={this.state.show.grid ? '#00a8ff' : '#dcdde1'}
                  style={styles.iconSelcet}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.showFull}>
              <View>
                <MaterialCommunityIcons
                  name="account-box-outline"
                  size={35}
                  color={this.state.show.full ? '#00a8ff' : '#dcdde1'}
                  style={styles.iconSelcet}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.viewPosts}>
            {this.renderPosts()}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  posts: state.post.posts,
  highlights: state.highlight.highlights
})

export default connect(
  mapStateToProps,
  { 
    fetchProfile,
    fetchPosts, 
    fetchHighlights,
  }
)(Profile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  picAndInfo: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 15,
    marginLeft: 15
  },
  userBioAndStories: {
    flexDirection: 'column',
    margin: 10,
    marginTop: 5,
    borderBottomColor: '#dcdde1',
    borderBottomWidth: 1
  },
  typeView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  miniImage: {
    width: 125,
    height: 125,
    margin: 1,
  },
  storie: {
    width: 90,
  },
  viewCountPosts: { 
    flexDirection: 'row', 
    alignSelf: 'center',
   },
   viewTextCount: {
    flexDirection: 'column',
    margin: 10,
    marginBottom: 5,
   },
   textCount: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    alignSelf: 'center',
   },
   textStatusPosts: {
    fontSize: 12,
    color: 'grey',
   },
   buttonEdit: {
     width: '100%', 
     height: 30, 
     backgroundColor: '#fff', 
     borderColor: '#dcdde1', 
     borderWidth: 1,
    },
  viewButtomEdit: {
    flex: 1, 
    paddingRight: 20,
    marginTop: 10,
  },
  viewStatusPosts: { 
    flexDirection: 'column', 
    marginLeft: 35,
  },
  iconSelcet: { 
    marginLeft: 35, 
    marginRight: 35, 
    marginTop: 5, 
    marginBottom: 5,
  },
  viewPosts: { 
    width: '100%', 
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },
  textName: { 
    fontSize: 16,
    paddingLeft: 20,
  },
  textBio: {
    fontSize: 14,
    paddingLeft: 20,
  },
  viewSubBio: {
    flexDirection: 'row', 
    marginTop: 10, 
    marginBottom: 30,
  },
  profileImg: { 
    width: 100, 
    height: 100, 
    borderRadius: 50,
  },
  itemMenu: { 
    margin: 10, 
    width: '100%', 
    height: 35, 
    borderBottomColor: '#dcdde1', 
    borderBottomWidth: 1,
  },
})