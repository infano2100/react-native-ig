import React, { Component } from 'react'
import { 
  View, 
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import RouterComponent from '../config/Router'
import reducer from '../reducers'
import firebase from '../config/firebase'

export default class Main extends Component {

  state = {
    isLogin: false,
    isLoad: true,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ isLogin: true, isLoad: false })
      }else{
        this.setState({ isLogin: false, isLoad: false })
      }
    })
  }

  render() {
    const { isLoad, isLogin } = this.state
    return (
      <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
      { isLoad ? 
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#8a8a8a" />
        </View>
       : 
        <RouterComponent checkLogin={isLogin} /> }
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex:1, 
    justifyContent:'center', 
  }
})