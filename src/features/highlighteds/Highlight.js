import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

let counter = 0;

export default class Highlight extends Component {

  constructor(props){
    super(props)

    this.state = {
      image: props.data.coverPost,
      images: props.data.posts
    }
  }

  onChangeImage = () => {
    if (counter === this.state.images.length - 1) {
      counter = 0;
      Actions.pop();
    } else {
      this.setState({
        image: this.state.images[++counter]
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.onChangeImage.bind(this)} activeOpacity={1}>
          <View>
            <Image source={{ uri: this.state.image }} style={{ height: '100%' }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
