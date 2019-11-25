import React, { Component } from 'react'
import firebase from 'firebase'
import Main from './src/config/Main'

export default class App extends Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyCnbNC7ujyuz7wGKQl0VsNXPO9_831IhPM",
      authDomain: "react-native-ig.firebaseapp.com",
      databaseURL: "https://react-native-ig.firebaseio.com",
      projectId: "react-native-ig",
      storageBucket: "react-native-ig.appspot.com",
      messagingSenderId: "553856547909",
      appId: "1:553856547909:web:68ef394bf7fb0be32ab72c",
      measurementId: "G-15G3V97GN2"
    };
    firebase.initializeApp(config);
  }
  render() {
    return <Main />
  }
}
