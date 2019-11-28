import React from 'react'
import PropTypes from 'prop-types'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Platform,
} from 'react-native'

const Header = props => {
  return (
    <View style={styles.container}>

      {/* left */}
      <View style={styles.viewTextCancel}>
      { props.iconLeft ? props.iconLeft  :
        props.onCancel ? (
            <TouchableOpacity onPress={props.onCancel} style={styles.margin15}>
              <View>
                <Text>{props.textCancel}</Text>
              </View>
            </TouchableOpacity>
        ) : <View/>
        }
      </View>
      {/* left */}

      {/* center */}
        { props.titleCustom ? props.titleCustom :
          <Text style={styles.textTitel}>
            {props.title}
          </Text>  
        }
      {/* center */}

      {/* rigth */}
        <View style={styles.viewTextDone}>
        { props.iconRigth ? props.iconRigth :
          props.onNext ? (
              <TouchableOpacity onPress={props.onNext} style={styles.margin15}>
                <View>
                  <Text style={styles.colorBlue}>{props.textNext}</Text>
                </View>
              </TouchableOpacity>
          ) : <View/>
        }
        </View>
      {/* rigth */}

    </View>
  )
}

Header.propTypes = {
  textNext: PropTypes.string,
  textCancel: PropTypes.string,
  onCancel: PropTypes.func,
  onNext: PropTypes.func,
  showOnAction: PropTypes.bool,
  iconLeft: PropTypes.any,
  iconRigth: PropTypes.any,
  titleCustom: PropTypes.any,
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
    marginTop: Platform.OS === 'ios' ? 20 : 0,
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
