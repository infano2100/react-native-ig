import React, { Component } from 'react'
import { 
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { PhotoGrid } from '../components/PhotoGrid'
import { photos } from './Photos'

export default class Explore extends Component {

  state = {
    search: '',
  }

  updateSearch = search => {
    this.setState({ search })
  }

  render() {
    const { search } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.marginTop30}>
          <SearchBar
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={search}
            lightTheme
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
          />
        </View>
        <ScrollView>
          <PhotoGrid PhotosList={photos} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 0, 
    borderBottomWidth: 0,
  },
  searchInputContainer: {
    backgroundColor: '#F8F8F8',
  },
  marginTop30: {
    marginTop: Platform.OS === 'ios' ? 30 : 0,
  },
})