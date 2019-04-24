import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// #region test firebase
// (async () => {
//   // Read, create not allowed when not login
//   try {
//     await auth.loggout();
//     await firestore.getDocument('dragons', 'Smaug');
//   } catch (error) {
//     console.info('Login to read document');
//   }
//   try {
//     await auth.loggout();
//     await firestore.createDocument('dragons', { name: 'Smaug' });
//   } catch (error) {
//     console.info('Login to create document');
//   }

//   // Read allowed when login
//   await auth.signInWithEmailAndPassword('crustyrat271@gmail.com', '139Razer!');
//   await firestore.getDocument('dragons', 'Smaug');
//   console.info('Read allowed when login');
//   // Create allowed when login
//   const createdId = await firestore.createDocument('dragons', {
//     name: 'Smaug',
//     rider: auth.currentUser.uid,
//   });

//   // Update, delete not allowed when if UID not matches
//   try {
//     await firestore.updateDocument('dragons', 'Scatha', { name: 'Merlin' });
//   } catch (error) {
//     console.info('Update fail: UID not matches');
//   }
//   try {
//     await firestore.deleteDocument('dragons', 'Scatha');
//   } catch (error) {
//     console.info('Delete fail: UID not matches');
//   }

//   // Update & delete allowed when UID matches
//   console.info('Update allowed when UID matches');
//   await firestore.updateDocument('dragons', createdId, { name: 'Smaug' });
//   console.info('Delete allowed when UID matches');
//   await firestore.deleteDocument('dragons', createdId);
// })();
// #endregion

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
