import { Actions } from 'react-native-router-flux'
import firebase from '../config/firebase'
import {
  AUTH_CREATE_USER,
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS,
} from './types'

export const createUser = (email, password) => {
  return dispatch => {
    dispatch({ type: AUTH_CREATE_USER })

    const tmpString = email.split('@')
    const username = tmpString[0]

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => createUserSuccess(dispatch, user))
      .then(() => {
        const { currentUser } = firebase.auth()
        try {
          firebase
            .database()
            .ref(`/users/${currentUser.uid}/`)
            .set({
              profile: {
                name_profile: username,
                email,
                username,
                password,
                userpic: 'https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png',
                posts_number: 0,
                followers: 0,
                following: 0,
                bio: null,
                sex: null,
              }
            })
        } catch (error) {
          alert(error)
        }
      })
      .catch((error) => createUserFail(dispatch,error))
  }
}

const createUserFail = (dispatch, error) => {
  dispatch({ 
    type: AUTH_CREATE_USER_FAIL,
    payload: error.message
   })
}

const createUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_CREATE_USER_SUCCESS,
    payload: user,
  })

  Actions.app()
}

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch({ type: AUTH_LOGIN_USER })

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => loginUserFail(dispatch,error))
  }
}

const loginUserFail = (dispatch, error) => {
  dispatch({ 
    type: AUTH_LOGIN_USER_FAIL,
    payload: error.message
   })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_LOGIN_USER_SUCCESS,
    payload: user,
  })

  Actions.app()
}
