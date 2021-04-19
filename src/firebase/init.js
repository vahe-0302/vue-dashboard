import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyAwYk7mb9kVTyVOLnVqgl1OmTH4zBTKlv0',
  authDomain: 'humus-b434e.firebaseapp.com',
  databaseURL: 'https://humus-b434e.firebaseio.com',
  projectId: 'humus-b434e',
  storageBucket: 'humus-b434e.appspot.com',
  messagingSenderId: '487552650911'
}

firebase.initializeApp(config)
