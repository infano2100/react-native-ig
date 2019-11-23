import React, { Component } from 'react'
import { 
  Text, 
  View, 
  ScrollView, 
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchPosts } from '../../actions/PostActions'
import Post from '../post/Post'

class Home extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
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
    const { posts, isLoad } = this.state
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
        return <Post {...post} key={keysPosts[i]} postKey={keysPosts[i]} />
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.ScrollContainer}>{this.renderPosts()}</ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.post
})

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})
