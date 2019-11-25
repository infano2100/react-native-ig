import { Platform } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


export const onUploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    let uploadBlob = null
    const { currentUser } = firebase.auth()

    const imageRef = firebase
      .storage()
      .ref(`/images/${currentUser.uid}`)
      .child('profile_pic')

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime}BASE64` })
      })
      .then(blob => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then(url => {
        resolve(url)
      })
      .catch(error => {
        reject(error)
      })
  })
}