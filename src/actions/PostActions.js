import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'
import { 
  POST_FETCH_ALL, 
  POST_ADD, 
  POST_SELECT_IMAGE, 
  POST_DISLIKE, 
  POST_LIKE, 
  POST_ADD_COMMENT
} from './types'

export const fetchPosts = () => {
  const { currentUser } = firebase.auth()

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/`)
      .child('posts')
      .on('value', snapshot => {
        if (_.isEmpty(snapshot.val())) {
          let arrayPosts = []
          dispatch({ type: POST_FETCH_ALL, payload: arrayPosts })
        } else {
          dispatch({ type: POST_FETCH_ALL, payload: snapshot.val() })
        }
      })
  }
}

export const addPost = (image, location, description) => {
  const { currentUser } = firebase.auth()
  const date = new Date().toLocaleString()

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/`)
      .child('posts')
      .push({
        username: 'Fern',
        userpic: 'https://men.mthai.com/app/uploads/2019/03/Fern_19.jpg',
        date: date,
        image: image,
        title: description,
        likes: 0,
        comments_number: 0,
        location: location,
        liked: false
      })
      .then(() => {
        firebase
          .database()
          .ref(`/users/${currentUser.uid}/profile/posts_number`)
          .once('value', snapshot => {
            const posts = snapshot.val() + 1
            firebase
              .database()
              .ref(`/users/${currentUser.uid}/profile/`)
              .update({
                posts_number: posts
              })
          })
      })
      .then(() => {
        dispatch({ type: POST_ADD })
        Actions.reset('app')
      })
  }
}

export const selectImage = url => ({
  type: POST_SELECT_IMAGE,
  payload: url
})

export const like = (post, likes) => {
  const { currentUser } = firebase.auth()
  const newLikes = likes + 1

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/posts/${post}/`)
      .update({
        likes: newLikes,
        liked: true
      })
      .then(() => {
        dispatch({ type: POST_LIKE })
      })
  }
}

export const dislike = (post, likes) => {
  const { currentUser } = firebase.auth()
  const newLikes = likes - 1

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/posts/${post}/`)
      .update({
        likes: newLikes,
        liked: false
      })
      .then(() => {
        dispatch({ type: POST_DISLIKE })
      })
  }
}

export const sendMessage = (post, comments, newcomment) => {
  const { currentUser } = firebase.auth()
  const newcomments = comments + 1

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/posts/${post}/`)
      .update({
        comments_number: newcomments
      })
      .then(() => {
        firebase
          .database()
          .ref(`/users/${currentUser.uid}/posts/${post}/comments`)
          .push({
            username: 'Fern',
            message: newcomment
          })
      })
      .then(() => {
        dispatch({ type: POST_ADD_COMMENT })
      })
  }
}
