import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyCIvZiGm20qVLs223voQvP-IwkOpE2aLlQ',
  authDomain: 'vue-fb-407b9.firebaseapp.com',
  databaseURL: 'https://vue-fb-407b9.firebaseio.com',
  projectId: 'vue-fb-407b9',
  storageBucket: 'vue-fb-407b9.appspot.com',
  messagingSenderId: '1047805086645',
});

const firestore = {
  buildQuery(collection, field, comparison, value) {
    return firebase.firestore()
      .collection(collection)
      .where(field, comparison, value);
  },
  async listCollection(collection) {
    const docs = [];
    const collectionRef = firebase.firestore().collection(collection);
    await collectionRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    });
    return docs;
  },
  async getDocument(collection, documentId) {
    const collectionRef = firebase.firestore().collection(collection);
    return collectionRef.doc(documentId)
      .get()
      .then(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  },
  async createDocument(collection, data) {
    return firebase.firestore()
      .collection(collection)
      .add(data)
      .then(docRef => docRef.id);
  },
  async updateDocument(collection, documentId, updateNotation) {
    return firebase.firestore()
      .collection(collection)
      .doc(documentId)
      .update(updateNotation);
  },
  async deleteDocument(collection, documentId) {
    return firebase.firestore()
      .collection(collection)
      .doc(documentId)
      .delete();
  },
  async getObserveredDocuments(query) {
    const docs = [];

    query.onSnapshot(snapshot => snapshot
      .docChanges()
      .forEach((change) => {
        const changeIndex = docs.findIndex(doc => doc.id === change.doc.id);

        switch (change.type) {
          case 'added':
            docs.push({ id: change.doc.id, ...change.doc.data() });
            break;
          case 'modified':
            docs.splice(changeIndex, 1, { id: change.doc.id, ...change.doc.data() });
            break;
          case 'removed':
            docs.splice(changeIndex, 1);
            break;
          default:
        }
      }));

    return docs;
  },
};

const auth = {
  get currentUser() { return firebase.auth().currentUser; },
  async createUserWithEmailAndPassword(email, password) {
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => firebase.auth().currentUser)
      .catch((error) => {
        throw error;
      });
  },
  async signInWithEmailAndPassword(email, password) {
    if (!email || typeof email !== 'string') throw new Error('Invalid email');
    if (!password || typeof password !== 'string') throw new Error('Invalid password');

    return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => firebase.auth().currentUser);
  },
  async loggout() { return firebase.auth().signOut(); },
};

const storage = {
  async uploadFile(path, file) { // TODO: Add progress callback
    return firebase.storage()
      .ref()
      .child(path).put(file)
      .then(snapshot => snapshot.ref.getDownloadURL());
  },
};

export default firebase;
export { firestore, auth, storage };
