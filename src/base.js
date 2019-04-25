import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAZg2N2rYHjUZyQjiPFFzPCydtuyz3jbI0",
  authDomain: "catch-of-the-day-dmytro-lesyk.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-dmytro-lesyk.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }
export default base