import React from 'react'
import PropTypes from 'prop-types'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet
} from 'react-native'

const Header = props => {
  return (
    <View style={styles.container}>
      {props.onCancel ? (
        <View style={styles.viewTextCancel}>
          <TouchableOpacity onPress={props.onCancel} style={styles.margin15}>
            <View>
              <Text>{props.textCancel}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <Text style={styles.textTitel}>
        {props.title}
      </Text>
      {props.onNext ? (
        <View style={styles.viewTextDone}>
          <TouchableOpacity onPress={props.onNext} style={styles.margin15}>
            <View>
              <Text style={styles.colorBlue}>{props.textNext}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  )
}

Header.propTypes = {
  textNext: PropTypes.string,
  textCancel: PropTypes.string,
  onCancel: PropTypes.func,
  onNext: PropTypes.func,
  showOnAction: PropTypes.bool,
}

Header.defaultProps = {
  textNext: 'Next',
  textCancel: 'Cancel',
  showOnAction: true,
}


export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  viewTextDone: {
    flex:1,
    alignItems:'flex-end',
  },
  viewTextCancel: {
    flex:1,
  },
  margin15: {
    margin: 15,
  },
  textTitel: { 
    margin: 15, 
    fontWeight: 'bold',
  },
  colorBlue: { 
    color: '#00a8ff'
  },
})
