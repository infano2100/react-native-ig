import React, { Component } from 'react'
import { 
  Text, 
  Image, 
  View, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import CameraRoll from "@react-native-community/cameraroll"
import { selectImage } from '../../actions/PostActions'
import Header from '../components/Header'

class AddPost extends Component {
  state = {
    image: '',
    imageSelected: false,
    images: [],
    photoPermission: {},
  }

  componentDidMount() {
    this.fetchPhotoLocal()
  }

  onSelectImage = ({ item }) => {
    this.setState({
      image: item.uri,
      imageSelected: true,
    })
  }

  fetchPhotoLocal() {
    const configParams = {
      first: 50,
      assetType: 'Photos',
      groupType: 'All',
    }
    if (this.state.lastCursor) {
      configParams.after = this.state.lastCursor
    }

    CameraRoll.getPhotos(configParams).then(value => {
      const image = value.edges.map(img => img.node.image)
      this.setState({ images: image})
    })
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity style={styles.miniImageContainer} onPress={() => this.onSelectImage({ item })}>
      <View key={item.uri}>
        <Image source={{ uri: item.uri }} style={styles.miniImage} />
      </View>
    </TouchableOpacity>
  )

  _keyExtractor = (item, index) => item.filename

  renderImage = () => {
    const { image, imageSelected } = this.state
    
    if (!imageSelected) {
      return (
        <View style={styles.mainImageContainer}>
          <Text>Select an image</Text>
        </View>
      )
    }
    
    return (
      <View style={styles.mainImageContainer}>
        <Image 
          source={{ uri: image }} 
          style={styles.mainImage}
          resizeMode="cover"
        />
      </View>
    )
  }

  onPressNext = () => {
    this.props.selectImage(this.state.image)
    Actions.configPost()
  }

  onPressCancel = () => {
    Actions.pop()
  }

  renderHeader = () => {
    if (this.state.imageSelected) {
      return <Header title="Add post" onNext={this.onPressNext} onCancel={this.onPressCancel} />
    }

    return <Header title="Add post" onCancel={this.onPressCancel} />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
          {this.renderImage()}
          <FlatList 
            data={this.state.images} 
            keyExtractor={this._keyExtractor} 
            renderItem={this._renderItem} 
            numColumns={4}
          />
      </View>
    )
  }
}

export default connect(
  null,
  { selectImage }
)(AddPost)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainImageContainer: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  miniImageContainer: {
    width: 90,
    height: 90,
    margin: 1,
  },
  miniImage: {
    width: 90,
    height: 90,
  },
})
