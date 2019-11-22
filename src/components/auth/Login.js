import React, { Component } from 'react'
import { 
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Button from '../common/Button'
import Input from '../common/Input'
import Title from '../common/Title'
import { loginUser } from '../../actions/AuthActions'

class Login extends Component {

  state = {
    user: 'admin@gmail.com',
    password: 'admin1234',
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

  onPressLogin = () => {
    this.props.loginUser(this.state.user, this.state.password)
  }

  onPressSignUp = () => {
    Actions.signup()
  }

  renderButtons() {
    if (this.props.auth.loading) {
      return <ActivityIndicator />
    } else {
      return (
        <View>
          <Button textButton="Login" onPress={this.onPressLogin} />
          <View style={[styles.setCenter,styles.setTop]}>
            <Text> OR </Text>
          </View>
          <View style={[
            styles.setCenter,
            styles.setTop,
            styles.viewSingup]
          }>
              <Text> Don't have an account? </Text>
              <TouchableOpacity onPress={this.onPressSignUp}>
                <Text style={styles.textSingUp}> Sign Up.</Text>
              </TouchableOpacity>
          </View>
        </View>
      )
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
        <Text style={styles.textErrorLoging}>
          {this.props.auth.errorLoging}
        </Text>
        {this.renderButtons()}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textErrorLoging: {
    color: 'red',
  },
  setCenter: {
    textAlign: 'center',
    alignItems: 'center'
  },
  textSingUp: {
    color: '#3897f0',
  },
  setTop: {
    marginTop: 20,
  },
  viewSingup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
})
