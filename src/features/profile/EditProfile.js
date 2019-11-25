import React, { Component } from 'react'
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  StyleSheet
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { onSaveChanges } from '../../actions/ProfileActions'
import { onUploadImage } from '../../commons/utils'
import Images from '../../assets/images'


class EditProfile extends Component {

  constructor(props){
    super(props)

    this.state = {
      userpic: props.userpic,
      name: props.name_profile,
      username: props.username,
      web: props.web,
      bio: props.bio,
      phone: props.phone,
      sex: props.sex,
    }

  }

  cancelEdit = () => Actions.pop()
  onChangeName = (text) => this.setState({ name: text })
  onChangeUsername = (text) => this.setState({ username: text})
  onChangePhone = (text) => this.setState({ phone: text })
  onChangeSex = (text) => this.setState({ sex: text })
  onChangeBio = (text) => this.setState({ bio: text })
  onChangeWeb = (text) => this.setState({ web: text})

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        onUploadImage(response.uri).then(url => {
          this.setState({
            userpic: url
          })
        })
      }
    })
  }

  onSaveChanges = () => {
    this.props.onSaveChanges(
      this.state.userpic,
      this.state.name,
      this.state.username,
      this.state.web,
      this.state.bio,
      this.state.phone,
      this.state.sex,
    )
  }

  renderInputPublicInfo = () => {
    const { name, username, web, bio } = this.state
    const groupInput = [
      { name: 'Name', value: name, onChange: this.onChangeName },
      { name: 'Username', value: username, onChange: this.onChangeUsername },
      { name: 'Website', value: web, onChange: this.onChangeWeb },
      { name: 'Bio', value: bio, onChange: this.onChangeBio },
    ]
    return groupInput.map((val) => {
      return (
        <View key={val.name} style={styles.flexRow}>
          <Text style={styles.textLabelInput}> {val.name} </Text>
          <TextInput
            style={styles.inputStyle}
            value={val.value}
            onChangeText={val.onChange}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={val.value}
          />
      </View>
      )
    })
  }

  renderInputPrivateInfo = () => {
    const { email, phone, sex } = this.state
    const groupInput = [
      { name: 'Email', value: email, onChange: this.onChangeEmail },
      { name: 'Phone', value: phone, onChange: this.onChangePhone },
      { name: 'Gender', value: sex, onChange: this.onChangeSex },
    ]
    return groupInput.map((val) => {
      return (
        <View key={val.name} style={styles.flexRow}>
          <Text style={styles.textLabelInput}> {val.name} </Text>
          <TextInput
            style={styles.inputStyle}
            value={val.value}
            onChangeText={val.onChange}
            autoCapitalize="none"
            autoCorrect={false}
            />
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header 
          title="Edit profile" 
          onNext={this.onSaveChanges} 
          onCancel={this.cancelEdit}
          textNext="Done"
        />
        <ScrollView>
          <View style={styles.pic}>
            <Image source={ this.state.userpic ? { uri: this.state.userpic } : Images.USER } style={styles.imgStyle} />
            <TouchableOpacity style={{ margin: 5 }} onPress={this.selectPhotoTapped}>
              <View>
                <Text style={styles.textChangePic}>
                  Change profile pic
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.publicInfo}>
            { this.renderInputPublicInfo() }
          </View>
          <View style={styles.privateInfo}>
            <Text style={styles.textInfoStyle}>
              Private information
            </Text>
            { this.renderInputPrivateInfo() }
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  null,
  { onSaveChanges }
)(EditProfile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pic: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomColor: '#dcdde1',
    borderBottomWidth: 1,
  },
  publicInfo: {
    width: '100%',
    padding: 15,
    borderBottomColor: '#dcdde1',
    borderBottomWidth: 1,
  },
  privateInfo: {
    width: '100%',
    padding: 15,
  },
  textLabelInput: { 
    marginTop: 10, 
    marginRight: 5, 
    width: 80, 
    height: 40, 
    fontSize: 15,
  },
  inputStyle: { 
    margin: 5, 
    width: 250, 
    height: 40, 
    borderBottomColor: '#dcdde1', 
    borderBottomWidth: 1,
  },
  textInfoStyle: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    marginTop: 5, 
    marginBottom: 15, 
    marginLeft: 5,
  },
  flexRow: {
    flexDirection: 'row',
  },
  textChangePic: { 
    fontSize: 15, 
    color: '#00a8ff',
  },
  imgStyle: { 
    width: 100,
    height: 100, 
    borderRadius: 50,
  },
})
