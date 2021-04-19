/* eslint-disable guard-for-in */
const admin = require('./node_modules/firebase-admin')
const serviceAccount = require('./humus.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://.firebaseio.com'
})

const dataGlobal = require('./fakedb.json')

// Checks if object is empty.
function isEmpty(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

/**
 * Data is a collection if
 *  - it has a odd depth
 *  - contains only objects or contains no objects.
 */
// eslint-disable-next-line no-unused-vars
function isCollection(data, path, depth) {
  if (
    typeof data !== 'object' ||
    data == null ||
    data.length === 0 ||
    isEmpty(data)
  ) {
    return false
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key in data) {
    if (typeof data[key] !== 'object' || data[key] == null) {
      // If there is at least one non-object item then it data then it cannot be collection.
      return false
    }
  }

  return true
}

async function upload(data, path) {
  return admin
    .firestore()
    .doc(path.join('/'))
    .set(data)
    .then(() => console.log(`Document ${path.join('/')} uploaded.`))
    .catch(err => {
      console.log('TCL: upload -> err', err)
      console.error(`Could not write document ${path.join('/')}.`)
    })
}

/**
 *
 */
async function resolve(data, path = []) {
  if (path.length > 0 && path.length % 2 === 0) {
    // Document's length of path is always even, however, one of keys can actually be a collection.

    // Copy an object.
    const documentData = { ...data }

    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      // Resolve each collection and remove it from document data.
      if (isCollection(data[key], [...path, key])) {
        // Remove a collection from the document data.
        delete documentData[key]
        // Resolve a colleciton.
        resolve(data[key], [...path, key])
      }
    }

    // If document is empty then it means it only consisted of collections.
    if (!isEmpty(documentData)) {
      // Upload a document free of collections.
      await upload(documentData, path)
    }
  } else {
    // Collection's length of is always odd.
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      // Resolve each collection.
      // eslint-disable-next-line no-await-in-loop
      await resolve(data[key], [...path, key])
    }
  }
}

resolve(dataGlobal)
