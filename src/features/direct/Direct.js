import React, { Component } from 'react'
import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { ListItem } from 'react-native-elements'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Header from '../components/Header'
import { listMessages, listSuggestions } from './List'

export default class Direct extends Component {

  state = {
    search: '',
  }

  updateSearch = search => {
    this.setState({ search })
  }

  renderIconLeft = () => {
    return (
      <TouchableOpacity onPress={Actions.pop} style={styles.margin15} >
        <View>
          <FontAwesomeIcons name="angle-left" size={25}/>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { search } = this.state
    return (
      <View style={styles.container}>
        <Header 
          title="Direct"
          iconLeft={this.renderIconLeft()}
          iconRigth={<View style={styles.margin15}/>}
        />
        <View style={styles.marginTop5}>
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

          <View style={styles.marginTop15}>
            <View style={styles.marginLeft18}>
              <Text style={styles.textMessage}>Messages</Text>
            </View>
            {
              listMessages.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: { uri: l.avatar_url } }}
                  title={l.name}
                  subtitle={l.subtitle}
                  bottomDivider
                  rightTitle={<SimpleLineIcons name="camera" size={20}/>}
                />
              ))
            }
          </View>

          <View style={styles.marginTop20}>
            <View style={styles.marginLeft18}>
              <Text style={styles.textMessage}>Suggestions</Text>
            </View>
            {
              listSuggestions.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: { uri: l.avatar_url } }}
                  title={l.name}
                  subtitle={l.subtitle}
                  bottomDivider
                  rightTitle={<SimpleLineIcons name="camera" size={20}/>}
                />
              ))
            }
          </View>

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
  margin15: {
    margin:15,
  },
  marginTop5: {
    marginTop: 5,
  },
  marginTop15: {
    marginTop: 15,
  },
  marginTop20: {
    marginTop: 20,
  },
  textMessages: {
    paddingLeft: 15,
  },
  marginLeft18: {
    marginLeft: 18,
  },
  textMessage: {
    fontWeight:'600',
  },
})