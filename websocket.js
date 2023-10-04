import VueNativeSock from 'vue-native-websocket';

export default ({ app }) => {
  Vue.use(VueNativeSock, 'ws://localhost:8765', {
    format: 'json',
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
  });

  // Now you can use the app parameter in your logic if needed
  console.log(app);
};