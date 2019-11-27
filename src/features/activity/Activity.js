import React, { Component } from 'react'
import { 
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native'
import Images from '../../assets/images'

export default class Activity extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentCenter}>
          <Image source={Images.HEART_WITH_CIRCLE} style={styles.img} />
          <Text style={styles.fontTitle} > Activity On Your Posts</Text>
          <Text style={styles.fontSub} > When someone likes or comments on one of</Text>
          <Text style={styles.font16} > you posts, you'll see it here.</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 100,
  },
  contentCenter: {
    alignItems: 'center',
  },
  fontTitle: {
    fontSize: 20, 
    paddingTop: 25,
  },
  fontSub: {
    fontSize: 16,
    paddingTop:15,
  },
  font16: {
    fontSize: 16
  },
})