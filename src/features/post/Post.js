import React, { Component } from 'react'
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import { 
  like, 
  dislike, 
  sendMessage
} from '../../actions/PostActions'
import Input from '../components/Input'
import Images from '../../assets/images'

class Post extends Component {

  constructor(props){
    super(props)


    this.delay = 500
    this.lastTap = null
  }

  state = {
    message: '',
    showMessages: false,
    showLike: false,
  }

  componentWillUnmount() {
    this.lastTap = null
  }

  like = () => {
    this.props.like(this.props.postKey, this.props.likes)
    this.lastTap = null
  }

  dislike = () => {
    this.props.dislike(this.props.postKey, this.props.likes)
  }

  onWriteComment = text => {
    this.setState({
      message: text,
    })
  }

  onSendComment = () => {
    this.props.sendMessage(this.props.postKey, this.props.comments_number, this.state.message)
    this.setState({
      message: '',
    })
  }

  handleDoubleTap = () => {
    const now = Date.now()
    if (this.lastTap && (now - this.lastTap) < this.delay) {
      this.setState({showLike: true})
      if(this.props.likes <= 0){
        this.like()
      }
    } else {
      this.lastTap = now
    }
    setTimeout(()=> {
      this.setState({showLike: false})
    },500)
  }

  renderHeart = () => {
    if (this.props.liked) {
      return (
        <TouchableOpacity onPress={this.dislike}>
          <View>
            <Image source={Images.HEART_COLOR} style={styles.iconHeart} />
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={this.like}>
          <View>
            <Image source={Images.HEART} style={styles.iconHeart} />
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderImage = () => {
    return (
      <TouchableWithoutFeedback onPress={this.handleDoubleTap}>
        <View>
          <ImageBackground source={{ uri: this.props.image }} style={styles.image}>
            { this.state.showLike ?  <Image source={Images.HEART_IG_LIKE} style={styles.iconHeartShowLike} /> : null}
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderSendMessage = () => {
    if (this.state.message.length > 0) {
      return (
        <TouchableOpacity style={styles.touchableSendMessage} onPress={this.onSendComment}>
          <View>
            <Text style={styles.textSend}>Send</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderShowMessages = () => {
    if (!this.state.showMessages) {
      return (
        <TouchableOpacity onPress={this.showMessages} style={styles.marginLeft15}>
          <View>
            <Text style={styles.textSeeComments}>See the {this.props.comments_number} comments</Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={this.showMessages} style={styles.marginLeft15}>
          <View>
            <Text style={styles.textSeeComments}>Close comments</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  showMessages = () => {
    this.setState({
      showMessages: !this.state.showMessages,
    })
  }

  renderMessages = () => {
    if (!_.isEmpty(this.props.comments)) {
      const arrayMessages = Object.values(this.props.comments)
      const arrayKeys = Object.keys(this.props.comments)
      if (this.state.showMessages) {
        return arrayMessages.map((message, i) => {
          return (
            <View style={styles.messages} key={arrayKeys[i]}>
              <Text style={[styles.username, { fontSize: 13 }]}>{message.username}</Text>
              <Text style={[styles.text, { fontSize: 13 }]}>{message.message}</Text>
            </View>
          )
        })
      }
    }
  }

  render() {
    return (
      <View>
        <View style={styles.rowCenter}>
          <Image source={{ uri: this.props.userpic }} style={styles.userPic} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.usernameTop}>{this.props.username}</Text>
            <Text style={styles.location}>{this.props.location}</Text>
          </View>
        </View>
        {this.renderImage()}
        <View style={styles.viewHeart}>
          {this.renderHeart()}
        </View>
        <Text style={styles.likes}>{this.props.likes} likes</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.username}>{this.props.username}</Text>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
        <View style={styles.rowCenter}>
          <Input
            onChange={this.onWriteComment}
            styles={styles.writeComment}
            value={this.state.message}
            placeholder="Write a message..."
          />
          {this.renderSendMessage()}
        </View>
        <View style={{ alignContent: 'center' }}>{this.renderShowMessages()}</View>
        <View style={styles.seeComments}>{this.renderMessages()}</View>
      </View>
    )
  }
}

export default connect(
  null,
  { like, dislike, sendMessage }
)(Post)

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 300,
    margin: 15,
    marginBottom: 1,
    marginTop: 1,
  },
  likes: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 1,
    marginTop: 1,
    marginLeft: 15
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 15,
    marginTop: 1,
    marginRight: 5,
    marginBottom: 1,
  },
  text: {
    fontSize: 15,
    margin: 15,
    marginTop: 1,
    marginLeft: 5,
    marginBottom: 1,
  },
  seeComments: {
    margin: 15,
    marginTop: 1,
    marginLeft: 15,
  },
  textSeeComments: {
    fontSize: 15,
    color: 'grey',
  },
  usernameTop: {
    margin: 15,
    marginLeft: 5,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  userPic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 15,
    marginLeft: 15,
    marginBottom: 3,
    marginRight: 2,
  },
  location: {
    marginLeft: 5,
    marginBottom: 3,
    color: 'grey',
  },
  writeComment: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    flex: 0.8,
  },
  messages: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 3,
  },
  iconHeart: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
  iconHeartShowLike: {
    width: 75,
    height: 75,
    alignSelf: 'center',
    marginTop: 100,
  },
  rowCenter: {
    flexDirection: 'row',
    alignContent: 'center',
  },
 viewHeart: { 
    flexDirection: 'row', 
    marginLeft: 15, 
    marginTop: 1, 
    marginBottom: 1,
   },
   marginLeft15: {
    marginLeft: 15,
   },
   touchableSendMessage: {
    flex: 0.2, 
    marginTop: 27,
   },
   textSend: {
     color: '#0984e3',
   },
})
