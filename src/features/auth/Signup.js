import React, { Component } from 'react'
import { 
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Button from '../components/Button'
import Input from '../components/Input'
import Title from '../components/Title'
import { createUser } from '../../actions/AuthActions'

class Signup extends Component {

  state = {
    user: '',
    password: '',
  }

  onChangeUser = text => {
    this.setState({
      user: text,
    })
  }

  onChangePassword = text => {
    this.setState({
      password: text,
    })
  }

  onPressSignUp = () => {
    this.props.createUser(this.state.user, this.state.password)
  }

  onGoBack = () => {
    Actions.pop()
  }

  renderButtons() {
    if (this.props.auth.loading) {
      return <ActivityIndicator />
    } else {
      return <Button textButton="Signup" onPress={this.onPressSignUp} />
    }
  }

  render() {
    const { user, password } = this.state
    return (
      <View style={styles.container}>
        <Title title="Instagram" />
        <Input placeholder="email@gmail.com" onChange={this.onChangeUser} value={user} />
        <Input
          placeholder="password"
          secureTextEntry
          onChange={this.onChangePassword}
          value={password}
        />
        <Text style={styles.textErrorCreating}>
          {this.props.auth.errorCreating}
        </Text>
        {this.renderButtons()}
        <TouchableOpacity onPress={this.onGoBack}>
          <View>
            <Text style={styles.textBack}>
              Already got an account, take me back!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { createUser }
)(Signup)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textBack: {
    color: '#3897f0',
    fontSize: 15
  },
  textErrorCreating: {
    color: 'red',
  },
})
