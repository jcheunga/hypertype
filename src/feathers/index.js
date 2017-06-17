// import io from 'socket.io-client';
const io = require("socket.io-client/dist/socket.io");
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';

import { AsyncStorage } from 'react-native';

// const API_URL = 'http://192.168.20.3:3030';
// const API_URL = 'http://10.0.2.2:3030'; // ANDROID
// const API_URL = 'localhost:3030'; // IOS
const API_URL = 'http://139.59.239.177';
const options = {transports: ['websocket'], pingTimeout: 3000, pingInterval: 5000, jsonp: false};
const socket = io(API_URL, options);

const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({
    storage: AsyncStorage // To store our accessToken
  }));

export default app;